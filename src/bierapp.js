function Bierapp(args) {
    _.extend(this, Backbone.Events);

    var _this = this;
    this.id = Utils.genId("Bierapp");

    //set default args
    this.suiteId = 6;
    this.title = '<span>BierApp<img src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg" height="35px"></span> ';
    this.description = '';
    this.version = '1.0.2';
    this.tools = ["variant"];
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

        console.log("Initializing Variant");
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

        this.contentDiv = $('<div id="content" style="height: 100%;"></div>')[0];
        $(this.wrapDiv).append(this.contentDiv);

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
            console.info('Variant is not rendered yet');
            return;
        }

        /* Header Widget */
        this.headerWidget = this._createHeaderWidget($(this.headerWidgetDiv).attr('id'));

        /* Header Widget */
        this.menu = this._createMenu($(this.menuDiv).attr('id'));

        /* check height */
        var topOffset = $(this.headerWidgetDiv).height() + $(this.menuDiv).height();
        $(this.wrapDiv).css({height: 'calc(100% - ' + topOffset + 'px)'});

        /* Wrap Panel */
        this.panel = this._createPanel($(this.contentDiv).attr('id'));

        /* Job List Widget */
        this.jobListWidget = this._createJobListWidget($(this.sidePanelDiv).attr('id'));

        this.variantIndexForm = new VariantIndexForm(this);
        this.variantIndexForm.draw({title: "Load VCF", tabpanel: this.panel});


        /*check login*/
        if ($.cookie('bioinfo_sid') != null) {
            this.sessionInitiated();
        } else {
            this.sessionFinished();
        }

        var myButton = Ext.get('loadFormA');
        myButton.on('click', function () {
            _this.showIndexForm();
        });


    },
    _createHeaderWidget: function (targetId) {
        var _this = this;
        var headerWidget = new HeaderWidget({
            targetId: targetId,
            autoRender: true,
            appname: this.title,
            description: this.description,
            version: this.version,
            //suiteId: this.suiteId,
            suiteId: 85,
            accountData: this.accountData,
            handlers: {
                'login': function (event) {
                    Ext.example.msg('Welcome', 'You logged in');
                    _this.sessionInitiated();
                },
                'logout': function (event) {
                    Ext.example.msg('Good bye', 'You logged out');
                    _this.sessionFinished();

                },
                'account:change': function (event) {
                    _this.setAccountData(event.response);

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
            cls: 'gm-navigation-bar',
            region: "north",
            width: '100%',
            border: false,
            items: [
                {
                    id: this.id + "btnIndex",
                    text: 'Load VCF',
                    handler: function () {
                        _this.showIndexForm();
                    }
                },

                '->'
                ,
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
    _createPanel: function (targetId) {
        var _this = this;

        var homeP = '<div style=" width: 100%; height: 800px;">'
            + '<div style="float:right; width: 400px">'
            + '<h2>Supported by:</h2>'
            + '<span align="justify">' +
            '<img width="25%" src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg"> <br><br>' +
            '<img width="70%" src="http://www.ciberer.es/templates/ja_pyrite/images/logo.jpg"><br><br>' +
            '<img width="15%" src="http://bioinfo.cipf.es/babeltrac/chrome/site/babeltitle200.gif"/><br><br>' +
            '<img width="21%" src="http://www.cipf.es/CIPF_THEME/CIPF_THEME/images/logo_cipf.png">' +
            '</span>'
            + '</div>'
            + '<div style="overflow: hidden">'
            + '<h2>Overview</h2>'
            + '<span>Welcome to the gene/variant prioritization tool of the BIER (the Team of BioInformatic for Rare Diseases). This interactive tool allows finding genes  affected by deleterious variants that segregate along family pedigrees , case-controls or sporadic samples .</span>'
            + '<h2><a href="https://github.com/babelomics/bierapp/wiki/1000-Genomes-example">Try an Example</a></h2>'
            + '<span>Here you can try all the filtering options and discover the gene affected in a test family.</span>'
            + '<h2><a href="#" id="loadFormA">Analyze your own families or case-control data</a></h2>'
            + '<span>Here you can upload your VCF file containing the exomes to be analyzed. Define the thresholds of allele frequencies, pathogenicity, conservation; the type of variants sought; and define the type of inheritance and the segregation schema along the family.</span>'
            + '<p align="justify"><h2>Note</h2>This web application makes an intensive use of new web technologies and standards like HTML5, so browsers that are fully supported for this site are: Chrome 14+, Firefox 7+, Safari 5+ and Opera 11+. Older browser like Chrome13-, Firefox 5- or Internet Explorer 9 may rise some errors. Internet Explorer 6 and 7 are no supported at all.</p>'
            + '</div>'
            + '</div>';

//    +'</div>'+

        homePanel = Ext.create('Ext.panel.Panel', {
//            padding: 30,
//            margin: "10 0 0 0",
            title: 'Home',
//            html: suiteInfo,
            border: 0,
//			layout: {
//		        type: 'vbox',
//		        align: 'stretch'
//		    },
            items: [
                {
                    xtype: 'panel',
//                    title:'Home',
                    padding: 30,
                    border: false,
                    autoScroll: true,
                    html: homeP,
                    bodyPadding: 30,
                    flex: 1
                }
            ]
        });

        var panel = Ext.create('Ext.tab.Panel', {
            renderTo: targetId,
            width: '100%',
            height: '100%',
            border: 0,
            cls: 'ocb-border-top-lightgrey',
            activeTab: 0,
            items: [homePanel]
        });
        return panel;
    },


    _createJobListWidget: function (targetId) {
        var _this = this;

        var jobListWidget = new JobListWidget({
            'timeout': 4000,
            'suiteId': this.suiteId,
            'tools': this.tools,
            'pagedViewList': {
                'title': 'Jobs',
                'pageSize': 7,
                'targetId': targetId,
                'order': 0,
                'width': 280,
                'height': 625,
                border: true,
                'mode': 'view'
            }
        });

        /**Atach events i listen**/
        jobListWidget.pagedListViewWidget.on('item:click', function (data) {
            _this.jobItemClick(data.item);
        });
        jobListWidget.draw();

        return jobListWidget;
    },
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

    this.jobListWidget.clean();
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
    this.jobId = record.data.id;
    if (record.data.visites >= 0) {

        Ext.getCmp(this.id + 'jobsButton').toggle(false);

        var toolName = record.raw.toolName;
        if (toolName == 'variant') {
            record.raw.command = Utils.parseJobCommand(record.raw);
            var bierappWidget = new BierappWidget({
                targetId: this.panel,
                title: record.raw.name,
                job: record.raw,
                autoRender: true
            });
            bierappWidget.draw();

        } else {
            var resultWidget = new ResultWidget({
                targetId: this.panel.getId(),
                application: 'variant',
                app: this,
                layoutName: record.raw.toolName
            });
            resultWidget.draw($.cookie('bioinfo_sid'), record);

            /* result widget parses the commandLine on record and adds the command key */
            var command = resultWidget.job.command.data;
        }

    }
};

Bierapp.prototype._checkLogin = function (showForm) {
    if (!$.cookie('bioinfo_sid')) {
        this.headerWidget.on('login', function (event) {
            showForm();
        });
        this.headerWidget.loginWidget.anonymousSign();
    } else {
        showForm();
    }
};

Bierapp.prototype.showEffectForm = function () {
    var _this = this;
    var showForm = function () {
        if (!_this.panel.contains(_this.variantEffectForm.panel)) {
            _this.panel.add(_this.variantEffectForm.panel);
        }
        _this.panel.setActiveTab(_this.variantEffectForm.panel);
    };
    this._checkLogin(showForm);
};
Bierapp.prototype.showIndexForm = function () {
    var _this = this;
    var showForm = function () {
        if (!_this.panel.contains(_this.variantIndexForm.panel)) {
            _this.panel.add(_this.variantIndexForm.panel);
        }
        _this.panel.setActiveTab(_this.variantIndexForm.panel);
    };
    this._checkLogin(showForm);
};

Bierapp.prototype.dataItemClick = function (record) {
//	console.log(record.data.name);
//	_this.adapter.-------(record.data.DATAID, "js", $.cookie('bioinfo_sid'));
};


Bierapp.prototype.showVCFtools = function () {
    var _this = this;
    vcfToolsJobFormPanel = new VCFToolsJobFormPanel({suiteId: this.suiteId});
    if (Ext.getCmp(vcfToolsJobFormPanel.panelId) == null) {
        vcfToolsJobFormPanel.draw();
        Ext.getCmp(this.centerPanelId).add(vcfToolsJobFormPanel.panel);
        vcfToolsJobFormPanel.onRun.addEventListener(function (sender, data) {
            Ext.getCmp(_this.eastPanelId).expand();
        });
    }
    Ext.getCmp(this.centerPanelId).setActiveTab(Ext.getCmp(vcfToolsJobFormPanel.panelId));
};

Bierapp.prototype.showVCFviewer = function () {
    var _this = this;
    this.vcfViewer = Ext.getCmp(this.id + "_vcfViewer");
    if (this.vcfViewer == null) {
        //Collapse to calculate width for genomeMaps
        pan = 26;
        if (!Ext.getCmp(this.eastPanelId).isHidden() || Ext.getCmp(this.eastPanelId).collapsed) {
            Ext.getCmp(this.eastPanelId).collapse();
            pan = 0;
        }
        var genomeMapsContainer = Ext.create('Ext.container.Container', {
            id: this.id + 'contVCFViewer'
        });

        this.vcfViewer = Ext.create('Ext.panel.Panel', {
            id: this.id + "_vcfViewer",
            border: false,
            title: "VCF Viewer",
            closable: true,
            items: genomeMapsContainer
//		    autoScroll:true
        });

        Ext.getCmp(this.centerPanelId).add(this.vcfViewer);

        //Once actived, the div element is visible, and genomeMaps can be rendered
        Ext.getCmp(this.centerPanelId).setActiveTab(this.vcfViewer);
//				
//		console.log(this.vcfViewer.getWidth());
//		console.log(this.vcfViewer.getHeight());


        //Parse query params to get location.... Also in AVAILABLE_SPECIES, an example location is set.
        var url = $.url();
        var location = url.param('location');
        if (location != null) {
            var position = location.split(":")[1];
            var chromosome = location.split(":")[0];
        }

        this.genomeViewer = new GenomeViewer(this.id + "contVCFViewer", DEFAULT_SPECIES, {
            availableSpecies: AVAILABLE_SPECIES,
            sidePanelCollapsed: true,
            width: this.vcfViewer.getWidth(),
            height: this.vcfViewer.getHeight()
        });

        //var toolbarMenu = Ext.create('Ext.toolbar.Toolbar', {
        //cls:'bio-menubar',
        //height:27,
        //padding:'0 0 0 10',
        //margins : '0 0 0 5',
        //items : [
        //{
        //text : 'Add track from VCF file',
        //handler : function() {
        //var vcfFileWidget = new VCFFileWidget({viewer:_this.genomeViewer});
        //vcfFileWidget.draw();
        //vcfFileWidget.onOk.addEventListener(function(sender, event) {
        //console.log(event.fileName);
        //var vcfTrack = new TrackData(event.fileName,{
        //adapter: event.adapter
        //});
        //_this.genomeViewer.addTrack(vcfTrack,{
        //id:event.fileName,
        //featuresRender:"MultiFeatureRender",
        //histogramZoom:80,
        //height:150,
        //visibleRange:{start:0,end:100},
        //featureTypes:FEATURE_TYPES
        //});
        //});
        //}
        //}
        //]
        //});
        //this.genomeViewer.setMenuBar(toolbarMenu);
        //this.genomeViewer.afterRender.addEventListener(function(sender,event){
        //_this.setTracks(_this.genomeViewer);
        //});
        this.genomeViewer.afterRender.addEventListener(function (sender, event) {
            _this.setTracks(_this.genomeViewer);
            _this.genomeViewer.addSidePanelItems(_this.getGMSidePanelItems());
        });
        this.genomeViewer.draw();
    } else {
        Ext.getCmp(this.centerPanelId).setActiveTab(this.vcfViewer);
    }
};

Bierapp.prototype.setTracks = function (genomeViewer) {
    var geneTrack = new TrackData("gene", {
        adapter: new CellBaseAdapter({
            category: "genomic",
            subCategory: "region",
            resource: "gene",
            species: genomeViewer.species,
            featureCache: {
                gzip: true,
                chunkSize: 50000
            }
        })
    });
    genomeViewer.trackSvgLayoutOverview.addTrack(geneTrack, {
        id: "gene",
        type: "gene",
        featuresRender: "MultiFeatureRender",
        histogramZoom: 10,
        labelZoom: 20,
        height: 150,
        visibleRange: {start: 0, end: 100},
        titleVisibility: 'hidden',
        featureTypes: FEATURE_TYPES
    });
    //end region track


    var seqtrack = new TrackData("Sequence", {
        adapter: new SequenceAdapter({
            category: "genomic",
            subCategory: "region",
            resource: "sequence",
            species: genomeViewer.species,
            featureCache: {
                gzip: true,
                chunkSize: 1000
            }
        })
    });
    genomeViewer.addTrack(seqtrack, {
        id: "1",
        type: "Sequence",
        title: "Sequenece",
        featuresRender: "SequenceRender",
        height: 30,
        visibleRange: {start: 100, end: 100}
    });

    var geneTrack = new TrackData("Gene/Transcript", {
        adapter: new CellBaseAdapter({
            category: "genomic",
            subCategory: "region",
            resource: "gene",
            species: genomeViewer.species,
            featureCache: {
                gzip: true,
                chunkSize: 50000
            }
        })
    });
    genomeViewer.addTrack(geneTrack, {
        id: "2",
        type: "Gene/Transcript",
        title: "Gene/Transcript",
        featuresRender: "GeneTranscriptRender",
        histogramZoom: 20,
        transcriptZoom: 50,
        height: 24,
        visibleRange: {start: 0, end: 100},
        featureTypes: FEATURE_TYPES
    });
};

Bierapp.prototype.addFileTrack = function (text) {
    var _this = this;
    var fileWidget = null;
    switch (text) {
        case "VCF":
            fileWidget = new VCFFileWidget({viewer: _this.genomeViewer});
            break;
    }
    if (fileWidget != null) {
        fileWidget.draw();
        if (_this.wum) {
            _this.headerWidget.onLogin.addEventListener(function (sender) {
                fileWidget.sessionInitiated();
            });
            _this.headerWidget.onLogout.addEventListener(function (sender) {
                fileWidget.sessionFinished();
            });
        }
        fileWidget.onOk.addEventListener(function (sender, event) {
            var fileTrack = new TrackData(event.fileName, {
                adapter: event.adapter
            });

            var id = Math.round(Math.random() * 10000);
            var type = text;

            _this.genomeViewer.addTrack(fileTrack, {
                id: id,
                title: event.fileName,
                type: type,
                featuresRender: "MultiFeatureRender",
                //					histogramZoom:80,
                height: 150,
                visibleRange: {start: 0, end: 100},
                featureTypes: FEATURE_TYPES
            });

            var title = event.fileName + '-' + id;
            //updateActiveTracksPanel(type, title, id, true);
        });
    }
};

Bierapp.prototype.getGMSidePanelItems = function () {
    var _this = this;
    var st = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: "VCF", iconCls: "icon-blue-box", leaf: true}
            ]
        }
    });
    return [
        {
            xtype: "treepanel",
            id: this.id + "availableTracksTree",
            title: "Add VCF track",
            bodyPadding: "10 0 0 0",
            useArrows: true,
            rootVisible: false,
            hideHeaders: true,
            store: st,
            listeners: {
                itemclick: function (este, record, item, index, e, eOpts) {
                    if (record.isLeaf()) {
                        _this.addFileTrack("VCF");
                    }
                }
            }
        },

    ];
}
