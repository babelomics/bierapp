function Bierapp(args) {
    _.extend(this, Backbone.Events);

    var _this = this;
    this.id = Utils.genId("Bierapp");

    //set default args
    this.suiteId = 6;
    this.title = '<span>BierApp<img src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg" height="35px"></span> ';
    this.description = '';
    this.version = '1.1.0';

    this.tools = {
        "variant-mongo": true
    };
    this.border = true;
    this.autoRender = true;
    this.target;
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
    render: function () {
        var _this = this;

        //HTML skel
        this.div = $('<div id="bierapp"></div>')[0];
        $(this.div).css({
            position: 'absolute',
            height: '100%',
            width: '100%'
        });
        this.headerWidgetDiv = $('<div id="header-widget"></div>')[0];
        $(this.div).append(this.headerWidgetDiv);

        this.wrapDiv = $('<div id="wrap"></div>')[0];
        $(this.wrapDiv).css({
            position: 'absolute',
            height: '100%',
            width: '100%'
        });
        $(this.div).append(this.wrapDiv);

        this.rightDiv = $('<div id="right-side-panel"></div>')[0];
        $(this.rightDiv).css({
            position: 'absolute',
            'z-index': '10000',
            right: '0px'
        });
        $(this.wrapDiv).append(this.rightDiv);

        this.contentDiv = $('<div id="content"></div>')[0];
        $(this.contentDiv).css({
            position: 'absolute',
            height: '100%',
            width: '100%'
        });

        $(this.wrapDiv).append(this.contentDiv);

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

        //
        //  Children initalization
        //
        this.menuEl = this._createMenuEl();

        /* Header Widget */
        this.headerWidget = this._createHeaderWidget(this.headerWidgetDiv);
        /* check height */
        var topOffset = $(this.headerWidgetDiv).height();
        $(this.wrapDiv).css({height: 'calc(100% - ' + topOffset + 'px)'});
        this.container = Ext.create('Ext.container.Container', {
            border: 0,
            width: '100%',
            height: '100%',
            layout: 'fit'
        });

        this.homePanel = this._createHomePanel();

        this.resultPanel = this._createResultPanel();

        /* Job List Widget */
        this.jobListWidget = this._createJobListWidget(this.rightDiv);


        // FORMS
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


        this.rendered = true;
    },
    draw: function () {
        this.targetDiv = (this.target instanceof HTMLElement ) ? this.target : document.querySelector('#' + this.target);
        if (!this.targetDiv) {
            console.log('target not found');
            return;
        }
        this.targetDiv.appendChild(this.div);

        this.container.render(this.contentDiv)
        this.container.add(this.homePanel);


        this.headerWidget.draw();
        this.jobListWidget.draw();
        this.jobListWidget.hide();


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
            applicationMenuEl: this.menuEl,
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
        return headerWidget;
    },
    _createMenuEl: function () {
        var _this = this;


//                {html: "Data", cls: 'header'},
//                {html: "Upload", cls: 'data'},
//            ]

        var menuHtml = '' +
            '   <ul class="ocb-app-menu unselectable">' +
            '       <li id="home" class="active">Home</li>' +
//            '       <li id="data" class="title">Data</li>' +
//            '       <li id="upload" class="preprocess">Upload</li>' +
            '       <li id="analysis" class="title">Analysis</li>' +
            '       <li id="analyze" class="analysis">Analyze</li>' +
            '       <li id="results" class="analysis">Results</li>' +
            '       <li id="example" class="title">Try an Example</li>' +
            '       <li id="thousandg" class="visualization">1000g</li>' +
            '   </ul>'
        '';

        var ul = $(menuHtml)[0];

        var els = $(ul).children();
        var domEls = {};
        for (var i = 0; i < els.length; i++) {
            var elid = els[i].getAttribute('id');
            if (elid) {
                domEls[elid] = els[i];
            }
        }
        $(ul).click(function (e) {
            if (!$(e.target).hasClass('title')) {
                $(ul).children().each(function (index, el) {
                    $(el).removeClass('active');
                });
                $(e.target).addClass('active');
                var text = $(e.target).text();
                _this.headerWidget.setDescription(text);
                switch (text) {
                    case "Home":
                        _this.jobListWidget.hide();
                        _this.container.removeAll(false);
                        _this.container.add(_this.homePanel);
                        _this.headerWidget.toogleAppMenu(false);
                        break;
                    case "Results":
                        _this.jobListWidget.show();
                        _this.container.removeAll(false);
                        _this.container.add(_this.resultPanel);
                        _this.headerWidget.toogleAppMenu(false);
                        break;
                    case "Analyze":
                        _this.jobListWidget.show();
                        _this.container.removeAll(false);
                        _this.container.add(_this.variantIndexForm.panel);
                        break;
                    case "1000g":
                        _this.jobListWidget.show();
                        _this.container.removeAll(false);
                        _this.container.add();
                        break;
                }

            }
        });
        return ul;
    },
    _createHomePanel: function () {
        var homePanel = Ext.create('Ext.panel.Panel', {
            bodyStyle: {
                fontSize: '22px',
                lineHeight: '30px',
                fontWeight: '300',
                color: '#ccc',
                background: '#314559',
                padding: '20px 0 0 200px'
            },
            border: 0,
            html: SUITE_INFO
        });
        return homePanel;
    },
    _createResultPanel: function () {
        var panel = Ext.create('Ext.tab.Panel', {
//            tabBar: {
//                baseCls: 'visualization-header',
//                height: 33,
//                padding: '12 0 0 5'
//            },
            width: '100%',
            height: '100%',
//            plain:true,
//            padding: '0 0 0 200px',
            border: 0,
//            activeTab: 0,
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

        return jobListWidget;
    }

}
Bierapp.prototype.sessionInitiated = function () {

};

Bierapp.prototype.sessionFinished = function () {
    this.jobListWidget.hide();
    this.accountData = null;

    this.resultPanel.items.each(function (child) {
        if (child.title != 'Home') {
            child.destroy();
        }
    })

    this.container.removeAll(false);
    this.container.add(this.homePanel);
    this.headerWidget.toogleAppMenu(false);
};


Bierapp.prototype.setAccountData = function (response) {
    this.accountData = response;
    this.jobListWidget.setAccountData(this.accountData);
};

Bierapp.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    this.headerWidget.setWidth(width);
    this.resultPanel.setWidth($(this.contentDiv).width());
};

Bierapp.prototype.jobItemClick = function (record) {
    var _this = this;

    this.container.removeAll(false);
    this.container.add(this.panel);

//    this.variantMenu.items.each(function (item) {
//        if (item.getEl().getHtml() == 'Results') {
//            item.addCls('active');
//        } else {
//            item.removeCls('active');
//        }
//    });


    this.jobId = record.data.id;
    if (record.data.visites >= 0) {
        this.container.removeAll(false);
        this.container.add(this.resultPanel);

        var toolName = record.data.toolName;


        //Use result widget if error
        if (record.data.status == "execution_error" || record.data.status == "queue_error") {
            var resultWidget = new ResultWidget({
                targetId: this.resultPanel.getId(),
                application: 'bierapp',
                app: this,
                layoutName: record.data.toolName
            });
            resultWidget.draw($.cookie('bioinfo_sid'), record);

            /* result widget parses the commandLine on record and adds the command key */
            var command = resultWidget.job.command.data;
        }
        else if (toolName == 'variant-mongo') {

            this._createVariantResult(record);

        } else {
            var resultWidget = new ResultWidget({
                targetId: this.resultPanel.getId(),
                application: 'bierapp',
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
Bierapp.prototype._createVariantResult = function (record) {
    var _this = this;
    var jobId = record.data.id;
    record.data.command = Utils.parseJobCommand(record.data);

    var tab = this.resultPanel.down('[id=' + jobId + ']');
    if (tab == null) {

        var div = document.createElement('div');
        var variantWidgetDiv = document.createElement('div');
        $(variantWidgetDiv).addClass('ba-variantWidgetDiv');
        var filterDiv = document.createElement('div');
        $(filterDiv).addClass('ba-filterFormDiv');
        div.appendChild(filterDiv);
        div.appendChild(variantWidgetDiv);


        var tab = Ext.create("Ext.panel.Panel", {
            id: jobId,
            border: false,
            title: record.data.name,
            closable: true,
            contentEl: div
        });
        this.resultPanel.add(tab);
        this.resultPanel.setActiveTab(tab);

        var variantWidget = new VariantWidget({
            target: variantWidgetDiv,
            title: record.data.name,
            headerConfig: {
                baseCls: 'ba-title-1'
            },
            width: $(variantWidgetDiv).width(),
            border: true,
            browserGridConfig: {
                title: 'Variant Browser',
                border: true
            },
            toolPanelConfig: {
                title: 'Variant Data'
            },
            filters: {},
            defaultToolConfig: {effect: false, stats: false},
            columns: bierappColumns,
            attributes: bierappAttributes,
            responseRoot: 'response.result',
            responseTotal: 'response.numResults',
            startParam: 'start',
            responseParser: function (response) {
                var res = [];
                try {
                    res = response.response.result;
                } catch (e) {
                    console.log(e);
                }
                return  res;
            },
            dataParser: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var v = data[i], aux;
                    for (var key in v.sampleGenotypes) {
                        aux = v.sampleGenotypes[key];
                        aux = aux.replace(/-1/g, ".");
                        aux = aux.replace("|", "/");
                        v[key] = aux;
                    }
                    v["genes"] = v.genes.join(",");
                }
            }
        });
        variantWidget.draw();


        var positionFilter = new PositionFilterFormPanel({
//            border: true,
//            testRegion: '1:14000-20000',
            headerConfig: {
                baseCls: 'ba-title-2'
            }
        });
        var conseqType = new ConsequenceTypeFilterFormPanel({
//            border: true,
            headerConfig: {
                baseCls: 'ba-title-2'
            }
        });

        var sampleNames = [];
//        var url = BierappManager.get({
//            host: 'http://aaleman:8080/bierapp/rest',
//            resource: 'studies',
//            action: 'info',
//            async: false,
//            params: {
//                //TODO
//                study: 'FILE'
//            },
//            success: function (data) {
//                try {
//                    sampleNames = Object.keys(data.response[0].result[0].samplesPositon);
//                } catch (e) {
//                    console.log(e);
//                }
//            }
//        });
        var url = OpencgaManager.variantInfoMongo({
            accountId: $.cookie("bioinfo_account"),
            sessionId: $.cookie("bioinfo_sid"),
            jobId: jobId,
            async: false,
            success: function (data, textStatus, jqXHR) {
                try {
                    sampleNames = data.response.result[0].samples;
                } catch (e) {
                    console.log(e);
                }
            }
        });

        var segType = new SegregationFilterFormPanel({
//            border: true,
            headerConfig: {
                baseCls: 'ba-title-2'
            },
            samples: sampleNames
        });
        var mafType = new MafFilterFormPanel({
//            border: true,
            headerConfig: {
                baseCls: 'ba-title-2'
            }
        });

        var formPanel = new FormPanel({
            title: 'Filter',
            headerConfig: {
                baseCls: 'ba-title-1'
            },
            mode: 'accordion',
            target: filterDiv,
            submitButtonText: 'Submit',
            filters: [segType, mafType, positionFilter, conseqType],
            width: $(filterDiv).width(),
//            height: 1043,
            border: false,
            handlers: {
                'submit': function (e) {
                    console.log(e.values);
                    variantWidget.setLoading(true);

                    //POSITION CHECK
                    if (typeof e.values.region !== 'undefined') {
                        var regions = [];
                        if (e.values.region !== "") {
                            regions = e.values.region.split(",");
                        }
                        delete  e.values.region;
                    }

                    if (typeof e.values.gene !== 'undefined') {
                        CellBaseManager.get({
                            species: 'hsapiens',
                            category: 'feature',
                            subCategory: 'gene',
                            query: e.values.gene,
                            resource: "info",
                            async: false,
                            params: {
                                include: 'chromosome,start,end'
                            },
                            success: function (data) {
                                for (var i = 0; i < data.response.length; i++) {
                                    var queryResult = data.response[i];
                                    var region = new Region(queryResult.result[0]);
                                    regions.push(region.toString());
                                }
                            }
                        });
                        delete  e.values.gene;
                    }

                    if (typeof e.values.snp !== 'undefined') {
                        CellBaseManager.get({
                            species: 'hsapiens',
                            category: 'feature',
                            subCategory: 'snp',
                            query: e.values.snp,
                            resource: "info",
                            async: false,
                            params: {
                                include: 'chromosome,start,end'
                            },
                            success: function (data) {
                                for (var i = 0; i < data.response.length; i++) {
                                    var queryResult = data.response[i];
                                    var region = new Region(queryResult.result[0]);
                                    regions.push(region.toString());
                                }
                            }
                        });
                        delete  e.values.snp;
                    }


                    //CONSEQUENCE TYPES CHECK
                    if (typeof e.values.ct !== 'undefined') {
                        if (e.values.ct instanceof Array) {
                            e.values.ct = e.values.ct.join(",");
                        }
                    }

//                    var url = BierappManager.url({
//                        host: 'http://aaleman:8080/bierapp/rest',
//                        resource: 'variants',
//                        action: 'get',
//                        params: {
//                            region: regions
//                        }
//                    });
                    var url = OpencgaManager.variantsUrl({
                        accountId: $.cookie("bioinfo_account"),
                        sessionId: $.cookie("bioinfo_sid"),
                        jobId: jobId
                    });
                    variantWidget.retrieveData(url, e.values)
                }
            }
        });
        formPanel.draw();

    } else {
        this.resultPanel.setActiveTab(tab);
    }

};