function Bierapp(args) {
    _.extend(this, Backbone.Events);

    var _this = this;
    this.id = Utils.genId("Bierapp");

    //set default args
    this.suiteId = 6;
    this.title = '<span>BierApp<img src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg" height="35px"></span> ';
    this.description = '';
    this.version = '1.1.0';
//    this.tools = ["variant", "variant-mongo"];
    this.tools = {
        "variant-mongo": true
    };
    this.border = true;
    this.targetId;
    this.width;
    this.height;


    //set instantiation args, must be last
    _.extend(this, args);

    this.accountData = null;

    this.resizing = false;


    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
}


Bierapp.prototype = {
    render: function (targetId) {
        var _this = this;
        this.targetId = (targetId) ? targetId : this.targetId;
        if ($('#' + this.targetId).length < 1) {
            console.log('targetId notf found in DOM');
            return;
        }

        console.log("Initializing BierApp");
        this.targetDiv = $('#' + this.targetId)[0];
        this.div = $('<div id="variant" style="height:100%;position:relative;"></div>')[0];
        $(this.targetDiv).append(this.div);

        this.headerWidgetDiv = $('<div id="header-widget"></div>')[0];
        $(this.div).append(this.headerWidgetDiv);
        this.menuDiv = $('<div id="menu"></div>')[0];
        $(this.div).append(this.menuDiv);
        this.wrapDiv = $('<div id="wrap" style="height:100%;position:relative;"></div>')[0];
        $(this.div).append(this.wrapDiv);


        this.sidePanelDiv = $('<div id="right-side-panel" style="position:absolute; z-index:50;right:0px;"></div>')[0];
        $(this.wrapDiv).append(this.sidePanelDiv);


        var leftDivWidth = 150;
        this.leftDiv = $('<div id="left"></div>')[0];
        $(this.leftDiv).css({
            position: 'absolute',
            height: '100%',
            width: leftDivWidth + 'px'
        });

        this.contentDiv = $('<div id="content"></div>')[0];
        $(this.contentDiv).css({
            position: 'absolute',
            height: '100%',
            left: leftDivWidth + 'px',
            width: 'calc( 100% - ' + leftDivWidth + 'px)'
        });

        $(this.wrapDiv).append(this.leftDiv);
        $(this.wrapDiv).append(this.contentDiv);


        //this.contentDiv = $('<div id="content" style="height: 100%;"></div>')[0];
        //$(this.wrapDiv).append(this.contentDiv);

        this.width = ($(this.div).width());
        this.height = ($(this.div).height());

        if (this.border) {
            var border = (_.isString(this.border)) ? this.border : '1px solid lightgray';
            $(this.div).css({border: border});
        }

        $(window).resize(function (event) {
            if (event.target == window) {
                if (!_this.resizing) {//avoid multiple resize events
                    _this.resizing = true;
                    _this.setSize($(_this.div).width(), $(_this.div).height());
                    setTimeout(function () {
                        _this.resizing = false;
                    }, 400);
                }
            }
        });

        this.rendered = true;
    },
    draw: function () {
        var _this = this;
        if (!this.rendered) {
            console.info('BierApp is not rendered yet');
            return;
        }

        /* Header Widget */
        this.headerWidget = this._createHeaderWidget(this.headerWidgetDiv);

        /* Header Widget */
        this.menu = this._createMenu($(this.menuDiv).attr('id'));

        this.variantMenu = this._createVariantMenu($(this.leftDiv).attr('id'));

        /* check height */
        var topOffset = $(this.headerWidgetDiv).height() + $(this.menuDiv).height();
        $(this.wrapDiv).css({height: 'calc(100% - ' + topOffset + 'px)'});

        this.homePanel = this._createHomePanel();

        this.container = Ext.create('Ext.panel.Panel', {
            renderTo: $(this.contentDiv).attr('id'),
            border: 0,
            width: '100%',
            height: '100%',
            layout: 'fit'
        });

        /* Wrap Panel */
        this.panel = this._createPanel(this.container);

        this.container.add(this.homePanel);

        /* Job List Widget */
        this.jobListWidget = this._createJobListWidget(this.sidePanelDiv);

        this.variantIndexForm = new VariantIndexForm({
            webapp: this,
            closable: false,
            width: 600,
            testing: false,
            formBorder: false,
            border: false,
            style: {
                borderTop: '1px solid #d1d9e3'
            },
            bodyPadding: '20 0 0 200',
            headerFormConfig: {
                baseCls: 'header-form'
            }
        });

        this.variantIndexForm.draw();


        /*check login*/
        if ($.cookie('bioinfo_sid') != null) {
            this.sessionInitiated();
        } else {
            this.sessionFinished();
        }

    },
    _createHeaderWidget: function (target) {
        var _this = this;
        var headerWidget = new HeaderWidget({
            target: target,
            autoRender: true,
            appname: this.title,
            description: this.description,
            version: this.version,
            suiteId: this.suiteId,
            accountData: this.accountData,
            homeLink: "http://bierapp.babelomics.org",
            helpLink: "http://bierapp.babelomics.org",
            tutorialLink: "http://bierapp.babelomics.org",
            aboutText: '',
            applicationMenuEl: this.variantMenuEl,
            handlers: {
                'login': function (event) {
                    Utils.msg('Welcome', 'You logged in');
                    _this.sessionInitiated();
                },
                'logout': function (event) {
                    Utils.msg('Good bye', 'You logged out');
                    _this.sessionFinished();

                },
                'account:change': function (event) {
                    _this.setAccountData(event.response);

                },
                'jobs:click': function () {
                    _this.jobListWidget.toggle();
                },
                'about:click': function () {
                    _this.jobListWidget.toggle(false);
//                    _this.headerWidget.
                }

            }
        });
        headerWidget.draw();

        return headerWidget;
    },
    _createMenu: function (targetId) {
        var _this = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            id: this.id + "navToolbar",
            renderTo: targetId,
            cls: 'jso-white-background whiteborder bootstrap',
            region: "north",
            width: '100%',
            border: false,
            items: [
                '->',
                {
                    id: this.id + 'jobsButton',
                    tooltip: 'Show Jobs',
                    text: '<span class="emph"> Hide jobs </span>',
                    enableToggle: true,
                    pressed: true,
                    toggleHandler: function () {
                        if (this.pressed) {
                            this.setText('<span class="emph"> Hide jobs </span>');
                            _this.jobListWidget.show();
                        } else {
                            this.setText('<span class="emph"> Show jobs </span>');
                            _this.jobListWidget.hide();
                        }
                    }
                }
            ]
        });
        return toolbar;
    },

    _createVariantMenu: function (targetId) {
        var _this = this;

        var toolbar = Ext.create('Ext.container.Container', {
            renderTo: targetId,
            cls: 'variant-menu',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            height: '100%',
            defaults: {
                xtype: 'box',
                listeners: {
                    afterrender: function (box) {
                        var el = this.getEl();
                        el.on('click', function () {
                            if (!box.hasCls('header') && !box.hasCls('data')) {
                                var cont = box.up('container');
                                cont.items.each(function (item) {
                                    item.removeCls('active');
                                });
                                box.addCls('active');

                            }
                            var text = el.getHtml();
                            switch (text) {
                                case "Home":
                                    _this.container.removeAll(false);
                                    _this.container.add(_this.homePanel);
                                    break;
                                case "Results":
                                    _this.container.removeAll(false);
                                    _this.container.add(_this.panel);
                                    break;
                                case "Upload":
                                    _this.headerWidget.opencgaBrowserWidget.show({mode: 'manager'});
                                    break;
                                case "Analyze":
                                    _this.showIndexForm();
                                    //_this.container.removeAll(false);
                                    //_this.container.add(_this.variantIndexForm.panel);
                                    _this.variantIndexForm.clearForm();
                                    break;
                                case "1000G":
                                    //_this.container.removeAll(false);
                                    //_this.container.add(_this.variantIndexForm.panel);
                                    _this.showIndexFormEx1();
                                    //_this.variantIndexForm.loadExample1();

                                    break;


                            }
                        });
                    }
                }
            },
            items: [
                {html: "Home", cls: 'home active'},

                {html: "Data", cls: 'header'},
                {html: "Upload", cls: 'data'},

                {html: "Analysis", cls: 'header'},
                {html: "Analyze", cls: 'visualization'},
                {html: "Results", cls: 'visualization'},

                {html: "Try an Example", cls: 'header'},
                {html: "1000G", cls: 'visualization'}
            ]
        });
        return toolbar;
    },
    _createHomePanel: function () {
        var homePanel = Ext.create('Ext.panel.Panel', {
            border: 0,
            header: {
                baseCls: 'home-header'
            },
            items: [
                {
                    xtype: 'container',
                    style: {fontSize: '15px', color: 'dimgray'},
                    html: SUITE_INFO,
                    margin: '30 0 0 30',
                    autoScroll: true
                }
            ]
        });
        return homePanel;
    },

    _createPanel: function (targetId) {

        var panel = Ext.create('Ext.tab.Panel', {
            width: '100%',
            height: '100%',
//            tabBar: {
//                baseCls: 'visualization-header',
//                height: 33,
//                padding: '12 0 0 5'
//            },
            border: 0,
            activeTab: 0,
            items: []
        });
        return panel;
    },

    _createJobListWidget: function (target) {
        var _this = this;

        var jobListWidget = new JobListWidget({
            target: target,
            timeout: 4000,
            width: 280,
            height: 625,
            tools: this.tools,
            handlers: {
                'item:click': function (data) {
                    _this.jobItemClick(data.item);
                }
            }
        });

        jobListWidget.draw();

        return jobListWidget;
    }

}
Bierapp.prototype.sessionInitiated = function () {
    Ext.getCmp(this.id + 'jobsButton').enable();
    Ext.getCmp(this.id + 'jobsButton').toggle(true);
    //this.jobListWidget.draw();
    //this.dataListWidget.draw();
};

Bierapp.prototype.sessionFinished = function () {
    Ext.getCmp(this.id + 'jobsButton').disable();
    Ext.getCmp(this.id + 'jobsButton').toggle(false);

    this.jobListWidget.hide();
    this.accountData = null;

    this.panel.items.each(function (child) {
        if (child.title != 'Home') {
            child.destroy();
        }
    })
};


Bierapp.prototype.setAccountData = function (response) {
    this.accountData = response;
    this.jobListWidget.setAccountData(this.accountData);
};

Bierapp.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    this.headerWidget.setWidth(width);
    this.menu.setWidth($(this.menuDiv).width());
    this.panel.setWidth($(this.contentDiv).width());
};

Bierapp.prototype.jobItemClick = function (record) {
    var _this = this;

    this.container.removeAll(false);
    this.container.add(this.panel);

    this.variantMenu.items.each(function (item) {
        if (item.getEl().getHtml() == 'Results') {
            item.addCls('active');
        } else {
            item.removeCls('active');
        }
    });


    this.jobId = record.data.id;
    if (record.data.visites >= 0) {

        Ext.getCmp(this.id + 'jobsButton').toggle(false);

        var toolName = record.data.toolName;
        console.log(toolName);

        if (record.data.status == "execution_error" || record.data.status == "queue_error") {
            var resultWidget = new ResultWidget({
                targetId: this.panel.getId(),
                application: 'variant',
                app: this,
                //layoutName: record.raw.toolName
                layoutName: 'variant'
            });
            resultWidget.draw($.cookie('bioinfo_sid'), record);

            /* result widget parses the commandLine on record and adds the command key */
            var command = resultWidget.job.command.data;
        }
        else if (toolName == 'variant-mongo') {
            record.data.command = Utils.parseJobCommand(record.data);

            var url = OpencgaManager.getJobAnalysisUrl($.cookie("bioinfo_account"), record.data.id) + '/variantsMongo';

            if (!this.panel.contains(Ext.getCmp("VariantWidget_" + this.jobId))) {

                this.variantWidget = new VariantWidget({
                    target: this.panel,
                    title: record.data.name,
                    job: record.data,
                    url: url,
                    border: false,
                    filters: {},
                    tools: {
                        //variantEffect:false
                    }
                });
                this.variantWidget.draw();
            } else {
                this.panel.setActiveTab("VariantWidget_" + this.jobId);
            }


        } else {
            var resultWidget = new ResultWidget({
                targetId: this.panel.getId(),
                application: 'variant',
                app: this,
                //layoutName: record.raw.toolName
                layoutName: 'variant' // TODO aaleman: Quitar esta línea cuando cambiemos el toolName a "variant"
            });
            resultWidget.draw($.cookie('bioinfo_sid'), record);

            /* result widget parses the commandLine on record and adds the command key */
            var command = resultWidget.job.command.data;
        }

    }
};
