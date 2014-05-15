function VariantWidget(args) {
    var _this = this;
    _.extend(this, Backbone.Events);

    this.id = Utils.genId("VariantWidget");

    //set default args
    this.border = true;
    this.autoRender = false;
    this.targetId;
    this.width;
    this.height = '100%';
    this.closable = false;

    //set instantiation args, must be last
    _.extend(this, args);

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
}

VariantWidget.prototype = {
    render: function (targetId) {
        var _this = this;
        this.targetId = (targetId) ? targetId : this.targetId;

        this.rendered = true;

    },
    draw: function () {
        var _this = this;
        OpencgaManager.variantInfoMongo({
            accountId: $.cookie("bioinfo_account"),
            sessionId: $.cookie("bioinfo_sid"),
            filename: this.dbName,
            jobId: this.job.id,
            success: function (data, textStatus, jqXHR) {
                _this.variantInfo = data.response.result[0];
                _this._draw();
            }
        });
    },
    _draw: function () {
        this.optValues = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "<", "name": "<"},
                {"value": "<=", "name": "<="},
                {"value": ">", "name": ">"},
                {"value": ">=", "name": ">="},
                {"value": "=", "name": "="},
                {"value": "!=", "name": "!="}
            ],
            pageSize: 20
        });

        /* main panel */
        this.panel = this._createPanel(this.targetId);

        this.summaryPanel = this._createSummaryPanel(this.variantInfo);
        this.panel.add(this.summaryPanel);

        this.variantPanel = this._createVariantPanel();
        //this.panel.add(this.variantPanel);

        this.genomeViewerPanel = this._createGenomeViewerPanel();

        this._updateInfo();
        /* form */
    },
    _createPanel: function (targetId) {
        var _this = this;
        var panel = Ext.create('Ext.panel.Panel', {
            title: this.title,
            width: '100%',
            height: this.height,
            border: this.border,
            layout: 'hbox',
            closable: this.closable,
            cls: 'ocb-border-top-lightgrey',
            tbar: {items: [
                {
                    text: 'Summary',
                    enableToggle: true,
                    pressed: true,
                    toggleGroup: 'options',
                    handler: function () {
                        _this.panel.removeAll(false);
                        _this.panel.add(_this.summaryPanel);
                    }
                },
                {
                    text: 'Variants and effect',
                    enableToggle: true,
                    pressed: false,
                    toggleGroup: 'options',
                    handler: function () {
                        _this.panel.removeAll(false);
                        _this.panel.add(_this.variantPanel);
                    }
                },
                {
                    text: 'Genome Viewer',
                    enableToggle: true,
                    pressed: false,
                    toggleGroup: 'options',
                    handler: function () {
                        // TODO aaleman: Check this code

                        if (_this.grid.getStore().count() == 0) {
                            Ext.example.msg('Genove Viewer', 'You must apply some filters first!!')
                        } else {
                            _this.panel.removeAll(false);
                            _this.panel.add(_this.genomeViewerPanel);

                            var row = {};
                            var selection = _this.grid.getView().getSelectionModel().getSelection();

                            if (selection.length > 0) {
                                row = selection[0];
                                var region = new Region({
                                    chromosome: row.get("chromosome"),
                                    start: row.get("position"),
                                    end: row.get("position")
                                });


                                if (!_.isUndefined(_this.gv)) {
                                    _this.gv.setRegion(region);
                                }
                            } else {
                                Ext.example.msg('Genove Viewer', 'You must select one variant first!!')
                            }
                        }
                    }
                }
            ]},
            items: []
        });
        targetId.add(panel);
        targetId.setActiveTab(panel);
        return panel;
    },
    _createVariantPanel: function () {

        this.form = this._createForm();
        this.grid = this._createGrid();
        this.colSelector = this._createColumnSelector();
        this.gridEffect = this._createEffectGrid();

        var panel = Ext.create('Ext.panel.Panel', {
            // title: 'variants',
            width: '100%',
            height: '100%',
            bodyPadding: 20,
            border: 0,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            cls: 'ocb-border-top-lightgrey',
            items: [
                {
                    xtype: 'container',
                    width: 220,
                    layout: 'fit',
                    margin: '0 20 20 0',
                    items: [
                        this.form
                    ]
                },
                {
                    xtype: 'container',
                    flex: 7,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 20 0',
                        flex: 1
                    },
                    items: [
                        this.grid,
                        this.gridEffect
                    ]
                }
            ]
        });

        return panel;
    },
    _updateInfo: function () {
        var _this = this;
        _this.panel.setLoading(true);

        if (_this.sampleNames != null) {

            _this.grid.getStore().removeAll();
            _this.gridEffect.getStore().removeAll();

            for (var i = 0; i < _this.sampleNames.length; i++) {
                _this._removeSampleColumn(_this.sampleNames[i]);
            }

            _this.grid.reconfigure(null, _this.columnsGrid);
        }

        _this.sampleNames = [];

        var sampleTableElems = [];
        sampleTableElems.push({html: ''});
        sampleTableElems.push({html: '0/0'});
        sampleTableElems.push({html: '0/1'});
        sampleTableElems.push({html: '1/1'});

        var fcItems = [];
        for (var i in this.variantInfo.samples) {
            var sName = this.variantInfo.samples[i];
            _this.sampleNames.push(sName);
            _this._addSampleColumn(sName);

            sampleTableElems.push({
                html: sName
            });

            sampleTableElems.push({
                xtype: 'checkbox',
                //boxLabel: '0/0',
                name: "sampleGT_" + sName,
                inputValue: '0/0,0|0'
            });
            sampleTableElems.push({
                xtype: 'checkbox',
                //boxLabel: '0/1',
                name: "sampleGT_" + sName,
                inputValue: '0/1,1/0, 0|1,1|0'
            });
            sampleTableElems.push({
                xtype: 'checkbox',
                //boxLabel: '1/1',
                name: "sampleGT_" + sName,
                inputValue: '1/1,1|1'
            });
        }

        _this.grid.reconfigure(null, _this.columnsGrid);

        var ctForm = Ext.getCmp(this.id + "conseq_type_panel");
        ctForm.removeAll();
        ctForm.add([
            {
                xtype: 'tbtext', text: '<span class="info">Select one or multiple conseq. type</span>'
            },
            _this._createDynCombobox("conseq_type", "Consequence Type", this.variantInfo.consequenceTypes, "non_synonymous_codon")
        ]);

        var biotypeForm = Ext.getCmp(this.id + "biotype_panel");

        var samples = Ext.getCmp(this.id + "samples_form_panel");
        samples.removeAll();

        samples.add(sampleTableElems);

        _this.panel.setLoading(false);

    },
    _addSampleColumn: function (sampleName) {

        var _this = this;

        for (var i = 0; i < _this.attributes.length; i++) {
            if (_this.attributes[i].name == sampleName) {
                return false;
            }
        }

        _this.attributes.push({
            "name": sampleName,
            "type": "string"
        });

        for (var i = 0; i < _this.columnsGrid.length; i++) {
            var col = _this.columnsGrid[i];

            if (col['text'] == "Samples") {
                col["columns"].push({
                    "text": sampleName,
                    "dataIndex": sampleName,
                    "flex": 1,
                    "sortable": false
                });
            }
        }
        _this.model.setFields(_this.attributes);
    },
    _removeSampleColumn: function (sampleName) {

        var _this = this;
        for (var i = 0; i < _this.attributes.length; i++) {
            if (_this.attributes[i].name == sampleName) {
                _this.attributes.splice(i, 1);
                _this.model.setFields(_this.attributes);
            }
        }

        for (var i = 0; i < _this.columnsGrid.length; i++) {
            var col = _this.columnsGrid[i];
            if (col['text'] == "Samples") {
                var colSamples = col["columns"];
                for (var j = 0; j < colSamples.length; j++) {
                    if (colSamples[j].text == sampleName) {
                        colSamples.splice(j, 1);
                    }
                }
            }
        }
    },
    _createColumnSelector: function () {
        var _this = this;
        var items = [];

        for (var i = 0; i < this.columnsGrid.length; i++) {
            var col = this.columnsGrid[i];
            var elem = {
                xtype: 'checkbox',
                fieldLabel: col["text"],
                inputValue: col["text"],
                checked: !col["hidden"],
                cls: "checkbox",

                handler: function (field, value) {
                    var colName = field.inputValue;
                    for (var i = 0; i < _this.grid.headerCt.items.items.length; i++) {
                        if (_this.grid.headerCt.items.items[i].text == colName) {
                            _this.grid.headerCt.items.items[i].setVisible(value);
                        }
                    }
                }
            };
            items.push(elem);

        }
        var panel = Ext.create('Ext.container.Container', {
                cls: "bootstrap",
                items: items
            }
        );

        return panel;
    },
    _createSummaryPanel: function (data) {
        var _this = this;

        var cts = [];
        var ss = [];

        for (var key in data.consequenceTypes) {
            cts.push({
                name: Utils.formatText(key, "_"),
                count: data.consequenceTypes[key]
            });
        }

        for (var key in data.sampleStats) {
            ss.push({
                sampleName: key,
                homozygotesNumber: data.sampleStats[key].homozygotesNumber,
                mendelianErrors: data.sampleStats[key].mendelianErrors,
                missingGenotypes: data.sampleStats[key].missingGenotypes
            });
        }

        _this.ctStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'count'],
            data: cts

        });

        _this.ssStore = Ext.create('Ext.data.Store', {
            fields: ['sampleName', 'homozygotesNumber', 'mendelianErrors', 'missingGenotypes'],
            data: ss
        });

        var chartCT = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            width: 700,
            height: 700,
            store: _this.ctStore,
            animate: true,
            shadow: true,
            legend: {
                position: 'right'
            },
            theme: 'Base:gradients',
            insetPadding: 60,
            series: [
                {
                    type: 'pie',
                    field: 'count',
                    showInLegend: true,
                    tips: {
                        trackMouse: true,
                        width: 200,
                        height: 28,
                        renderer: function (storeItem, item) {
                            //calculate percentage.
                            var total = 0;
                            _this.ctStore.each(function (rec) {
                                total += rec.get('count');
                            });
                            var name = Utils.formatText(storeItem.get('name'), "_");
                            this.setTitle(name + ': ' + Math.round(storeItem.get('count') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },

                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '10px Arial'
                    }

                }
            ]
        });
        var chartSS = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            width: 700,
            height: 500,
            animate: true,
            shadow: true,
            store: _this.ssStore,
            legend: {
                position: 'right'
            },
            axes: [
                {
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['homozygotesNumber', 'mendelianErrors', 'missingGenotypes'],
                    title: false,
                    grid: true,
                    label: {
                        renderer: function (v) {
                            return String(v).replace(/000000$/, 'M');
                        }
                    },
                    roundToDecimal: false
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['sampleName'],
                    title: false
                }
            ],
            series: [
                {
                    type: 'bar',
                    axis: 'bottom',
                    gutter: 80,
                    xField: 'sampleName',
                    yField: ['homozygotesNumber', 'mendelianErrors', 'missingGenotypes'],
                    tips: {
                        trackMouse: true,
                        width: 100,
                        height: 28,
                        renderer: function (storeItem, item) {
                            this.setTitle(String(item.value[1]));
                        }
                    }
                }
            ]
        });

        var itemTplSamples = new Ext.XTemplate(
            '<table cellspacing="0" style="max-width:400px;border-collapse: collapse;border:1px solid #ccc;"><thead>',
            '<th style="min-width:50px;border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">Samples</th>',
            '</thead><tbody>',
            '<tpl for="samples">',
            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">{.}</td>',
            '</tr>',
            '</tpl>',
            '</tbody></table>'
        );

        var globalStats = new Ext.XTemplate(
            '<table cellspacing="0" style="max-width:400px;border-collapse: collapse;border:1px solid #ccc;"><thead>',
            '<th colspan="2" style="min-width:50px;border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">Global Stats</th>',
            '</thead><tbody>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num variants</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{variantsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num samples</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{samplesCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num indels</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{indelCount}</td>',
            '</tr>',

            //'<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            //'<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num snps</td>',
            //'<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{snpCount}</td>',
            //'</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num biallelic</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{biallelicsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num multiallelic</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{multiallelicsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num transitions</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{transitionsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num transversions</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{transversionsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">% PASS</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.pass(values)]}%</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Ti/Tv Ratio</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.titv(values)]}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Avg. Quality</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.avgq(values)]}</td>',
            '</tr>',

            {

                pass: function (values) {
                    var res = values.passCount / values.variantsCount;
                    return res.toFixed(2);
                },
                titv: function (values) {
                    var res = values.transitionsCount / values.transversionsCount;
                    return res.toFixed(2);
                },
                avgq: function (values) {
                    var res = values.accumulatedQuality / values.variantsCount;
                    return res.toFixed(2);
                }
            }
        );


        var items = [
            {
                xtype: 'container',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'box',
                        flex: 1,
                        margin: 10,
                        data: data,
                        tpl: itemTplSamples
                    },
                    {
                        xtype: 'box',
                        flex: 1,
                        margin: 10,
                        data: data.globalStats,
                        tpl: globalStats
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                flex: 3,
                items: [
                    {
                        xtype: 'box',
                        width: 700,
                        html: '<div style="border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;font-weight: bold;">Consequence type</div>'

                    },
                    chartCT
                ]
            }
        ];


        var panel = Ext.create('Ext.panel.Panel', {
//            title: 'summary',
            width: '100%',
            height: '100%',
            border: 0,
            layout: 'hbox',
            bodyPadding: 60,
            autoScroll: true,
            cls: 'ocb-border-top-lightgrey',
            items: items
        });

        return panel;
    },
    _createEffectPanel: function () {

        var _this = this;

        var panel = Ext.create('Ext.panel.Panel', {
            // title: 'Effect',
            width: '100%',
            height: '100%',
            border: 0,
            layout: 'hbox',
            cls: 'ocb-border-top-lightgrey',
            items: []
        });
        return panel;
    },
    _createGenomeViewer: function () {
        var _this = this;

        var rendered = true;

        var gvpanel = Ext.create('Ext.panel.Panel', {
            title: 'Genome Viewer',
            flex: 8,
            height: '100%',
            border: 1,
            html: '<div id="' + this.id + 'genomeViewer" style="width:1200px;height:1500;position:relative;"></div>',
            listeners: {
                afterlayout: {
                    fn: function () {
                        //prevent fires multiple times
                        if (!rendered) {
                            return;
                        }
                        rendered = false;
                        var w = this.getWidth();
                        $('#' + _this.id + 'genomeViewer').width(w);

                        var region = new Region({
                            chromosome: "13",
                            start: 32889611,
                            end: 32889611
                        });


                        var genomeViewer = new GenomeViewer({
                            sidePanel: false,
                            targetId: _this.id + 'genomeViewer',
                            autoRender: true,
                            border: false,
                            resizable: true,
                            region: region,
                            trackListTitle: '',
                            drawNavigationBar: true,
                            drawKaryotypePanel: false,
                            drawChromosomePanel: false,
                            drawRegionOverviewPanel: true,
                            overviewZoomMultiplier: 50
                        }); //the div must exist

                        genomeViewer.draw();


                        this.sequence = new SequenceTrack({
                            targetId: null,
                            id: 1,
                            title: 'Sequence',
                            height: 30,
                            visibleRegionSize: 200,
                            histogramZoom: 20,
                            transcriptZoom: 50,


                            renderer: new SequenceRenderer(),

                            dataAdapter: new SequenceAdapter({
                                category: "genomic",
                                subCategory: "region",
                                resource: "sequence",
                                species: genomeViewer.species
                            })
                        });


                        this.gene = new GeneTrack({
                            targetId: null,
                            id: 2,
                            title: 'Gene',
                            height: 140,
                            minHistogramRegionSize: 20000000,
                            maxLabelRegionSize: 10000000,
                            minTranscriptRegionSize: 200000,
                            //featureTypes: FEATURE_TYPES,

                            renderer: new GeneRenderer(),

                            dataAdapter: new CellBaseAdapter({
                                category: "genomic",
                                subCategory: "region",
                                resource: "gene",
                                species: genomeViewer.species,
                                params: {
                                    exclude: 'transcripts.tfbs,transcripts.xrefs,transcripts.exons.sequence'
                                },
                                cacheConfig: {
                                    chunkSize: 50000
                                },
                                filters: {},
                                options: {},
                                featureConfig: FEATURE_CONFIG.gene
                            })
                        });

                        this.snp = new FeatureTrack({
                            targetId: null,
                            id: 4,
                            title: 'SNP',
                            minHistogramRegionSize: 12000,
                            maxLabelRegionSize: 3000,
                            height: 100,
                            //featureTypes: FEATURE_TYPES,

                            //renderer: new FeatureRenderer('snp'),
                            renderer: new FeatureRenderer(FEATURE_TYPES.snp),


                            dataAdapter: new CellBaseAdapter({
                                category: "genomic",
                                subCategory: "region",
                                resource: "snp",
                                params: {
                                    exclude: 'transcriptVariations,xrefs,samples'
                                },
                                species: genomeViewer.species,
                                cacheConfig: {
                                    chunkSize: 10000
                                },
                                filters: {},
                                options: {},
                                featureConfig: FEATURE_CONFIG.snp
                            })
                        });


                        var renderer = new FeatureRenderer(FEATURE_TYPES.gene);
                        renderer.on({
                            'feature:click': function (event) {
                            }
                        });


                        var gene = new FeatureTrack({
                            targetId: null,
                            id: 2,
//        title: 'Gene',
                            minHistogramRegionSize: 20000000,
                            maxLabelRegionSize: 10000000,
                            height: 100,

                            renderer: renderer,

                            dataAdapter: new CellBaseAdapter({
                                category: "genomic",
                                subCategory: "region",
                                resource: "gene",
                                params: {
                                    exclude: 'transcripts'
                                },
                                species: genomeViewer.species,
                                cacheConfig: {
                                    chunkSize: 100000
                                }
                            })
                        });
                        genomeViewer.addOverviewTrack(gene);


                        genomeViewer.addTrack(this.sequence);
                        genomeViewer.addTrack(this.gene);
                        genomeViewer.addTrack(this.snp);

                        _this.gv = genomeViewer;

                        $(_this.gv.navigationBar.restoreDefaultRegionButton).hide();
                        $(_this.gv.navigationBar.regionHistoryButton).hide();
                        $(_this.gv.navigationBar.speciesButton).hide();
                        $(_this.gv.navigationBar.chromosomesButton).hide();
                        $(_this.gv.navigationBar.karyotypeButton).hide();
                        $(_this.gv.navigationBar.chromosomeButton).hide();
                        $(_this.gv.navigationBar.regionButton).hide();
                        $(_this.gv.navigationBar.windowSizeField).parent().hide();
                        //$(_this.gv.navigationBar.regionField).parent().hide();
                        //$(_this.gv.navigationBar.goButton).parent().hide();
                        //$(_this.gv.navigationBar.searchField).parent().hide();
                        //$(_this.gv.navigationBar.quickSearchButton).parent().hide();
                        $(_this.gv.navigationBar.autoheightButton).parent().hide();
                        $(_this.gv.navigationBar.compactButton).parent().hide();

                    }
                }
            }
        });
        return gvpanel;
    },
    _createGenomeViewerPanel: function () {
        var _this = this;
        this.genomeViewer = this._createGenomeViewer();
        this.variantGridMini = this._createVariantGridAux();

        var panel = Ext.create('Ext.panel.Panel', {
            // title: 'Effect',
            width: '100%',
            height: '100%',
            border: 0,
            layout: 'hbox',
            bodyPadding: 20,
            cls: 'ocb-border-top-lightgrey',
            items: [
                this.variantGridMini,
                this.genomeViewer
            ]
        });
        return panel;
    },
    _createVariantGridAux: function () {
        var _this = this;
        _this.stMini = Ext.create('Ext.data.Store', {
            //model: _this.model,
            fields: ['chr', 'pos', 'ref', 'alt'],
            data: [],
            autoLoad: false,
            proxy: {type: 'memory'},
            pageSize: 5

        });

        var grid = Ext.create('Ext.grid.Panel', {
                title: 'Variant',
                flex: 1,
                height: '100%',
                store: _this.stMini,
                loadMask: true,
                border: 0,
                margin: '0 20 0 0',
                hideHeaders: true,
                border: 1,
                columns: [
                    {
                        text: 'Variant',
                        flex: 1,
                        xtype: "templatecolumn",
                        tpl: '{chr}:{pos} {ref}>{alt}'
                    }
                ]}
        );

        grid.getSelectionModel().on('selectionchange', function (sm, selectedRecord) {

            if (selectedRecord.length) {

                var row = selectedRecord[0].data;
                var chr = row.chr;
                var pos = row.pos;

                var region = new Region({
                    chromosome: chr,
                    start: pos,
                    end: pos
                });

                if (!_.isUndefined(_this.gv)) {
                    _this.gv.setRegion(region);
                }

            }
        });

        return grid;
    },
    _createForm: function () {

        var _this = this;

        var accordion = Ext.create('Ext.form.Panel', {
            border: 1,
            flex: 1,
            height: "100%",
            title: "Filters",
            width: "100%",
            layout: {
                type: 'accordion',
                titleCollapse: true,
                fill: false,
                multi: true
            },
            tbar: {
                width: '100%',
                items: [
                    {
                        xtype: 'button',
                        flex: 1,
                        text: '<span style="font-weight:bold">Reload</span>',
                        tooltip: 'Reload',
                        handler: function () {
                            Ext.example.msg('Reload', 'Sucessfully')
                            _this._reloadForm();
                        }
                    } ,
                    {
                        xtype: 'button',
                        //width:'100%',
                        flex: 1,
                        text: '<span style="font-weight:bold">Clear</span>',
                        tooltip: 'Clear',
                        handler: function () {
                            Ext.example.msg('Clear', 'Sucessfully');
                            _this._clearForm();
                            Ext.getCmp(_this.id + "region_list").setValue("");
                            Ext.getCmp(_this.id + "genes").setValue("");
                        }
                    },
                    '->',
                    {
                        xtype: 'button',
                        //width:'100%',
                        flex: 1,
                        text: '<span style="font-weight:bold">Search</span>',
                        tooltip: 'Search',
                        handler: function () {

                            if (_this._checkForm()) {
                                _this._getResult();
                            }
                        }
                    }
                ]
            }
        });

        var regionItems = [
            this._getRegionList()
        ];

        var geneItems = [
            this._getGenes()
            //this._getBioTypes()
        ];

        var region = Ext.create('Ext.panel.Panel', {
            title: "Region",
            items: regionItems
        });

        var genes = Ext.create('Ext.panel.Panel', {
            title: "Gene",
            items: geneItems
        });

        var statsItems = [
            this._getMAF(),
            this._getMissing(),
            this._getMendelError(),
//            this._getIsIndel(),
            this._getInheritance()
        ];

        var stats = Ext.create('Ext.panel.Panel', {
            title: "Stats",
            items: statsItems
        });

        var samplesInfo = [];

        var samples = Ext.create('Ext.panel.Panel', {
            width: '100%',
            height: 300,
            title: 'Segregation',
            autoScroll: true
            //items: samplesInfo,
            //border:0
        });

        var sampleContainer = Ext.create('Ext.container.Container', {
            width: '100%',
            layout: {
                type: 'table',
                columns: 4
            },
            defaults: {
                border: false,
                padding: 4
            },
            id: this.id + "samples_form_panel"
        });
        samples.add(sampleContainer);
        samples.add(this._getMissing());


        //samples.add(this._getMissing());

        var controlsItems = [
            this._getControls()
        ];

        var controls = Ext.create('Ext.panel.Panel', {
            title: "MAF",
            items: controlsItems
        });

        var effectItems = [
            this._getConsequenceType()
//            this._getIsIndel(),
        ];

        var effect = Ext.create('Ext.panel.Panel', {
            title: "Effect",
            items: effectItems
        });

        accordion.add(samples);
        accordion.add(controls);
        accordion.add(effect);
        accordion.add(region);
        accordion.add(genes);

        controls.collapsed = true;
        effect.collapsed = true;
        region.collapsed = true;
        genes.collapsed = true;

        return accordion;
    },
    _createEffectGrid: function () {

        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{groupField}: {groupValue} ({rows.length} Effect{[values.rows.length > 1 ? "s" : ""]})'
        });

        var xtmplPoly = new Ext.XTemplate(
            '<tpl if="aminoacidChange">{[this.parseEffect(values)]}<tpl else>.</tpl>  ',
            {
                parseEffect: function (value) {

                    if (value.polyphenScore == 0 && value.polyphenEffect == 0) {
                        return ".";
                    }

                    var score = value.polyphenScore;
                    var effect = "";
                    switch (value.polyphenEffect) {
                        case 0:
                            effect = "probably damaging";
                            break;
                        case 1:
                            effect = "possibly damaging";
                            break;
                        case 2:
                            effect = "benign";
                            break;
                        case 3:
                            effect = "unknown";
                            break;

                        default:
                            return ".";

                    }
                    return(score + " - (" + effect + ")");
                }
            }
        );
        var xtmplSift = new Ext.XTemplate(
            '<tpl if="aminoacidChange">{[this.parseEffect(values)]}<tpl else>.</tpl>  ',
            {
                parseEffect: function (value) {

                    if (value.siftScore == 0 && value.siftEffect == 0) {
                        return ".";
                    }

                    var score = value.siftScore;
                    var effect = "";
                    switch (value.siftEffect) {
                        case 0:
                            effect = "tolerated";
                            break;
                        case 1:
                            effect = "deleterious";
                            break;
                        default:
                            return ".";

                    }
                    return(score + " - (" + effect + ")");
                }
            }
        );
        this.stEffect = Ext.create("Ext.data.Store", {
            groupField: 'featureId',
            fields: [
                {name: "featureId", type: "String"},
                {name: "featureName", type: "String"},
                {name: "featureType", type: "String"},
                {name: "featureBiotype", type: "String"},
                {name: "featureChromosome", type: "String"},
                {name: "featureStart", type: "int"},
                {name: "featureEnd", type: "int"},
                {name: "featureStrand", type: "String"},
                {name: "snpId", type: "String"},
                {name: "ancestral", type: "String"},
                {name: "alternative", type: "String"},
                {name: "geneId", type: "String"},
                {name: "transcriptId", type: "String"},
                {name: "geneName", type: "String"},
                {name: "consequenceType", type: "String"},
                {name: "consequenceTypeObo", type: "String"},
                {name: "consequenceTypeDesc", type: "String"},
                {name: "consequenceTypeType", type: "String"},
                {name: "aaPosition", type: "int"},
                {name: "aminoacidChange", type: "String"},
                {name: "codonChange", type: "String"},
                {name: "polyphenScore", type: "float"},
                {name: "polyphenEffect", type: "float"},
                {name: "siftScore", type: "float"},
                {name: "siftEffect", type: "float"},


            ],
            data: [],
            autoLoad: false,
            proxy: {type: 'memory'},
            pageSize: 5
        });

        var gridEffect = Ext.create('Ext.grid.Panel', {
            title: '<span class="ssel">Variant Effect</span>',
            flex: 1,
            height: '100%',
            store: this.stEffect,
            loadMask: true,
            border: 1,
            titleCollapse: true,
            collapsible: true,
            columns: [
                {xtype: 'rownumberer'},
                {
                    text: "Position chr:start:end (strand)",
                    dataIndex: "featureChromosome",
                    xtype: "templatecolumn",
                    tpl: '{featureChromosome}:{featureStart}-{featureEnd} <tpl if="featureStrand == 1">(+)<tpl elseif="featureStrand == -1">(-)</tpl>',
                    flex: 1
                },
                {
                    text: "SNP Id",
                    dataIndex: "snpId",
                    flex: 1
                },
                {
                    text: "Conseq. Type",
                    dataIndex: "consequenceTypeObo",
                    xtype: "templatecolumn",
                    tpl: '{consequenceTypeObo} (<a href="http://www.sequenceontology.org/browser/current_svn/term/{consequenceType}" target="_blank">{consequenceType}</a>)',
                    flex: 1
                },
                {
                    text: "Aminoacid Change",
                    xtype: "templatecolumn",
                    tpl: '<tpl if="aminoacidChange">{aminoacidChange} - {codonChange} ({aaPosition}) <tpl else>.</tpl>  ',
                    flex: 1
                },
//                {
//                    text: "Polyphen",
//                    xtype: "templatecolumn",
//                    dataIndex: "polyphenScore",
//                    tpl: xtmplPoly,
//                    flex: 1
//                },
//                {
//                    text: "SIFT",
//                    xtype: "templatecolumn",
//                    dataIndex: "siftScore",
//                    tpl: xtmplSift,
//                    flex: 1
//                },
                {
                    text: "Gene (EnsemblId)",
                    dataIndex: "geneName",
                    xtype: 'templatecolumn',
                    tpl: '<tpl if="geneName">{geneName} (<a href="http://www.ensembl.org/Homo_sapiens/Location/View?g={geneId}" target="_blank">{geneId}</a>)<tpl else>.</tpl>',
                    flex: 1
                },
                {
                    text: "Transcript Id",
                    dataIndex: "transcriptId",
                    xtype: 'templatecolumn',
                    tpl: '<a href="http://www.ensembl.org/Homo_sapiens/Location/View?t={transcriptId}" target="_blank">{transcriptId}</a>',
                    flex: 1
                },
                {
                    text: "Feature Id",
                    dataIndex: "featureId",
                    flex: 1

                },
                {
                    text: "Feature Name",
                    dataIndex: "featureName",
                    flex: 1

                },
                {
                    text: "Feature Type",
                    dataIndex: "featureType",
                    flex: 1

                },
                {
                    text: "Feature Biotype",
                    dataIndex: "featureBiotype",
                    flex: 1

                },
                {
                    text: "Ancestral",
                    dataIndex: "ancestral",
                    hidden: true,
                    flex: 1
                },
                {
                    text: "Alternative",
                    dataIndex: "alternative",
                    hidden: true,
                    flex: 1
                }
            ],
            ////features: [groupingFeature, {ftype: 'summary'}],
            viewConfig: {
                emptyText: 'No records to display'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbtext',
                            id: this.id + "numRowsLabelEffect"
                        }
                    ]
                }
            ]
        });
        return gridEffect
    },
    _createGrid: function () {

        var _this = this;

        var xtmplPoly = new Ext.XTemplate(
            '{[this.parseEffect(values)]}',
            {
                parseEffect: function (value) {

                    if (value.polyphen_score == 0 && value.polyphen_effect == 0) {
                        return ".";
                    }

                    var score = value.polyphen_score;
                    var effect = "";
                    switch (value.polyphen_effect) {
                        case 0:
                            effect = "probably damaging";
                            break;
                        case 1:
                            effect = "possibly damaging";
                            break;
                        case 2:
                            effect = "benign";
                            break;
                        case 3:
                            effect = "unknown";
                            break;

                        default:
                            return ".";

                    }
                    return(score + " - (" + effect + ")");
                }
            }
        );
        var xtmplSift = new Ext.XTemplate(
            '{[this.parseEffect(values)]}',
            {
                parseEffect: function (value) {

                    if (value.sift_score == 0 && value.sift_effect == 0) {
                        return ".";
                    }

                    var score = value.sift_score;
                    var effect = "";
                    switch (value.sift_effect) {
                        case 0:
                            effect = "tolerated";
                            break;
                        case 1:
                            effect = "deleterious";
                            break;
                        default:
                            return ".";

                    }
                    return(score + " - (" + effect + ")");
                }
            }
        );

        _this.columnsGrid = [
            {
                text: "Variant",
                dataIndex: 'chromosome',
                flex: 1,
                xtype: "templatecolumn",
                tpl: "{chromosome}:{position}"
            },
            {
                text: "Alleles",
                flex: 0.5,
                xtype: "templatecolumn",
                tpl: "{ref}>{alt}"
            },
            {
                text: "Gene",
                dataIndex: 'gene_name',
                hidden: true,
                flex: 1
            },
            {
                text: 'Samples',
                flex: 1,
                columns: []
            },
            {
                text: "SNP id",
                dataIndex: 'stats_id_snp',
                flex: 1,
                sortable: true
            },
            {
                flex: 1,
                text: "Controls (MAF)",
                columns: [
                    {
                        text: "1000G",
                        renderer: function (val, meta, record) {
                            if (record.data.controls["1000G"]) {
                                var maf = record.data.controls["1000G"].maf;
                                return maf.toFixed(3) + " (" + record.data.controls["1000G"].allele + ")";
                            } else {
                                return ".";
                            }
                        }
                    },
                    {
                        text: "BIER",
                        renderer: function (val, meta, record) {
                            if (record.data.controls["BIER"]) {

                                return record.data.controls["BIER"].maf + " (" + record.data.controls["BIER"].allele + ")";
                            } else {
                                return ".";
                            }
                        }
                    },
                    {
                        text: "EVS",
                        renderer: function (val, meta, record) {
                            if (record.data.controls["EVS"]) {

                                return record.data.controls["EVS"].maf + " (" + record.data.controls["EVS"].allele + ")";
                            } else {
                                return ".";
                            }
                        }
                    }
                ]
            },
            {
                text: "Consq. Type",
                dataIndex: "consequence_types",
                flex: 1,
                sortable: true
            },
            {
                text: 'Polyphen',
                flex: 1,
                data_index: 'polyphen_score',
                xtype: 'templatecolumn',
                tpl: xtmplPoly
            },
            {
                text: 'Sift',
                flex: 1,
                data_index: 'sift_score',
                xtype: "templatecolumn",
                tpl: xtmplSift
            },
            {text: 'Conservation', flex: 1},
            {
                text: "Alleles & Genotypes",
                hidden: true,
                columns: [
                    {

                        text: "Allele Ref",
                        dataIndex: 'ref',
                        flex: 0.2,
                        hidden: true,
                        sortable: true
                    },
                    {
                        text: "Allele Alt",
                        dataIndex: 'alt',
                        flex: 0.2,
                        hidden: true,
                        sortable: true
                    },

                    {
                        text: "MAF",
                        dataIndex: 'stats_maf',
                        xtype: "templatecolumn",
                        tpl: "{stats_maf} ({stats_allele_maf})",
                        flex: 0.2,
                        hidden: true,
                        sortable: true
                    },
                    {
                        text: "MGF",
                        dataIndex: 'stats_mgf',
                        xtype: "templatecolumn",
                        tpl: "{stats_mgf} ({stats_genotype_maf})",
                        flex: 0.2,
                        hidden: true,
                        sortable: true
                    }
                ]
            },
            {
                text: "Missing Alleles/Genotypes",
                hidden: true,
                columns: [
                    {
                        text: "Miss. Alleles",
                        dataIndex: 'stats_miss_allele',
                        flex: 0.1,
                        hidden: true,
                        sortable: true
                    },
                    {
                        text: "Miss. Genotypes",
                        dataIndex: 'stats_miss_gt',
                        flex: 0.1,
                        hidden: true,
                        sortable: true
                    }
                ]
            },
            {
                text: "Mendelian Errors",
                flex: 1,
                dataIndex: 'stats_mendel_err',
                sortable: true,
                hidden: true
            },
            {
                text: "Is indel?",
                flex: 1,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                dataIndex: 'stats_is_indel',
                sortable: true,
                hidden: true
            },
            {
                text: "Inheritance",
                flex: 1,
                hidden: true,
                columns: [
                    {
                        text: "% Cases dominant",
                        dataIndex: 'stats_cases_percent_dominant',
                        hidden: true,
                        renderer: function (value) {
                            return value.toFixed(2);
                        },
                        sortable: true
                    },
                    {
                        text: "% Controls dominant",
                        dataIndex: 'stats_controls_percent_dominant',
                        hidden: true,
                        renderer: function (value) {
                            return value.toFixed(2) + "%";
                        },
                        sortable: true
                    },
                    {
                        text: "% Cases recessive",
                        dataIndex: 'stats_cases_percent_recessive',
                        hidden: true,
                        renderer: function (value) {
                            return value.toFixed(2) + "%";
                        },
                        sortable: true
                    },
                    {
                        text: "% Controls recessive",
                        dataIndex: 'stats_controls_percent_recessive',
                        hidden: true,
                        renderer: function (value) {
                            return value.toFixed(2) + "%";
                        },
                        sortable: true
                    }
                ]
            }
        ];
        _this.attributes = [
            {name: "chromosome", type: "String"},
            {name: "position", type: "int"},
            {name: "alt", type: "String"},
            {name: "ref", type: "String"},
            {name: 'stats_id_snp', type: 'string'},
            {name: 'stats_maf', type: 'float'},
            {name: 'stats_mgf', type: 'double'},
            {name: 'stats_allele_maf', type: 'string'},
            {name: 'stats_genotype_maf', type: 'string'},
            {name: 'stats_miss_allele', type: 'int'},
            {name: 'stats_miss_gt', type: 'int'},
            {name: 'stats_mendel_err', type: 'int'},
            {name: 'stats_is_indel', type: 'boolean'},
            {name: 'stats_cases_percent_dominant', type: 'double'},
            {name: 'stats_controls_percent_dominant', type: 'double'},
            {name: 'stats_cases_percent_recessive', type: 'double'},
            {name: 'stats_controls_percent_recessive', type: 'double'},
            {name: 'gene_name', type: 'string'},
            {name: 'consequence_types', type: 'string'},
            {name: "genotypes", type: 'auto'},
            {name: "effect", type: 'auto'},
            {name: "controls", type: 'auto'},
            {name: "polyphen_score", type: 'float'},
            {name: "polyphen_effect", type: 'int'},
            {name: "sift_score", type: 'float'},
            {name: "sift_effect", type: 'int'},

        ];
        _this.model = Ext.define('Variant', {
            extend: 'Ext.data.Model',
            fields: _this.attributes
        });
        _this.st = Ext.create('Ext.data.Store', {
            model: _this.model,
            groupField: 'gene_name',
            data: [],
            autoLoad: false,
            proxy: {type: 'memory'},
            pageSize: 5

        });
        var xtmplGroup = new Ext.XTemplate(
            '{[this.parseGroupField(values.groupField)]}: {groupValue} ({rows.length} Variant{[values.rows.length > 1 ? "s" : ""]})',
            {
                parseGroupField: function (value) {

                    return Utils.formatText(value, "_");
                }
            }
        );
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            //groupHeaderTpl: '{groupField}: {groupValue} ({rows.length} Variant{[values.rows.length > 1 ? "s" : ""]})',
            groupHeaderTpl: xtmplGroup,
            enableGroupingMenu: false
        });
        var grid = Ext.create('Ext.grid.Panel', {
                title: '<span class="ssel">Variant Info</span>',
                flex: 1,
                height: '100%',
                //width: '100%',
                store: _this.st,
                loadMask: true,
                border: 1,
                // titleCollapse: true,
                // collapsible: true,
                //            features: [groupingFeature],
                columns: this.columnsGrid,
                plugins: 'bufferedrenderer',
                loadMask: true,
                features: [groupingFeature, {ftype: 'summary'}],
                viewConfig: {
                    emptyText: 'No records to display'
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'tbtext',
                                id: this.id + "numRowsLabel"
                            },
                            '->',
                            {
                                text: 'Collapse All',
                                handler: function () {
                                    if (this.text == "Collapse All") {
                                        groupingFeature.collapseAll();
                                        this.setText("Expand All");
                                    } else {
                                        groupingFeature.expandAll();
                                        this.setText("Collapse All");
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Columns',
                                id: this.id + "gridColSelectorBtn",
                                menu: {
                                    width: 150,
                                    margin: '0 0 10 0',
                                    id: this.id + "gridColSelectorMenu",
                                    plain: true,
                                    items: []
                                }

                            },
                            {
                                xtype: 'button',
                                text: 'Export data...',
                                handler: function () {
                                    if (!Ext.getCmp(_this.id + "exportWindow")) {
                                        var cbgItems = [];
                                        var attrList = _this._getColumnNames();

                                        cbgItems.push({
                                            boxLabel: attrList[0],
                                            name: 'attr',
                                            inputValue: attrList[0],
                                            checked: true,
                                            disabled: true
                                        });

                                        for (var i = 1; i < attrList.length; i++) {
                                            cbgItems.push({
                                                boxLabel: attrList[i],
                                                name: 'attr',
                                                inputValue: attrList[i],
                                                checked: true
                                            });
                                        }


                                        Ext.create('Ext.window.Window', {
                                            id: _this.id + "exportWindow",
                                            title: "Export attributes",
                                            height: 250,
                                            maxHeight: 250,
                                            width: 400,
                                            autoScroll: true,
                                            layout: "vbox",
                                            modal: true,
                                            items: [
                                                {
                                                    xtype: 'checkboxgroup',
                                                    id: _this.id + "cbgAttributes",
                                                    layout: 'vbox',
                                                    items: cbgItems
                                                }
                                            ],
                                            buttons: [
                                                {
                                                    xtype: 'textfield',
                                                    id: _this.id + "fileName",
                                                    emptyText: "enter file name",
                                                    flex: 1
                                                },
                                                {
                                                    text: 'Download',
                                                    href: "none",
                                                    handler: function () {

                                                        var fileName = Ext.getCmp(_this.id + "fileName").getValue();
                                                        if (fileName == "") {
                                                            fileName = "variants";
                                                        }
                                                        var columns = Ext.getCmp(_this.id + "cbgAttributes").getChecked();

                                                        var content = _this._exportToTab(columns);

                                                        this.getEl().set({
                                                            href: 'data:text/csv,' + encodeURIComponent(content),
                                                            download: fileName + ".txt"
                                                        });

                                                        this.up(".window").hide();
                                                    }
                                                }
                                            ]
                                        }).show();
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        );

        grid.getSelectionModel().on('selectionchange', function (sm, selectedRecord) {

            if (selectedRecord.length) {

                var row = selectedRecord[0].data;
                var chr = row.chromosome;
                var pos = row.position;
                var ref = row.ref;
                var alt = row.alt;


                _this._updateEffectGrid(chr, pos, ref, alt);

            }
        });

        return grid;
    },
    _updateEffectGrid: function (chr, pos, ref, alt) {

        var _this = this;
        var req = chr + ":" + pos + ":" + ref + ":" + alt;
        _this.gridEffect.setLoading(true);

        $.ajax({
            url: "http://ws.bioinfo.cipf.es/cellbase/rest/latest/hsa/genomic/variant/" + req + "/consequence_type?of=json",
            dataType: 'json',
            success: function (response, textStatus, jqXHR) {
                if (response.length > 0) {

                    var data = _this._filterEffectData(response);

                    _this.gridEffect.getStore().loadData(data);
                    _this.gridEffect.setTitle('<span class="ssel">Effect</span> - <spap class="info">' + chr + ':' + pos + ' ' + ref + '>' + alt + '</spap>');
                    Ext.getCmp(_this.id + "numRowsLabelEffect").setText(data.length + " effects");

                } else {
                    _this.gridEffect.getStore().removeAll();
                }
                _this.gridEffect.setLoading(false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading Effect');
                _this.gridEffect.setLoading(false);
            }
        });
    },
    _filterEffectData: function (data) {
        var _this = this;
        var res = [];

        var regulatory = {};

        for (var i = 0; i < data.length; i++) {
            var elem = data[i];
            if (elem.consequenceTypeObo == "coding_sequence_variant" || elem.consequenceTypeObo == "exon_variant" || elem.consequenceTypeObo == "intron_variant") {
                continue;
            } else if (elem.consequenceTypeObo == "regulatory_region_variant") {
                if (!(elem.featureId in regulatory)) {
                    regulatory[elem.featureId] = elem;
                }
                continue;
            }

            res.push(elem);
        }

        for (var elem in regulatory) {
            res.push(regulatory[elem]);
        }

        return res;
    },
    _getSubColumn: function (colName) {
        var _this = this;
        var subCols = [];

        for (var i = 0; i < _this.columnsGrid.length; i++) {
            var col = _this.columnsGrid[i];

            if (col["text"] == colName && col["columns"] != null && col["columns"].length > 0) {
                var sub = col["columns"];
                for (var j = 0; j < sub.length; j++) {
                    var elem = sub[j];
                    subCols.push(elem["text"]);
                }
            }
        }
        return subCols;

    },
    _exportToTab: function (columns) {

        var _this = this;
        var colNames = [];

        var headerLine = "";
        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];

            var subCols = _this._getSubColumn(col["boxLabel"]);
            if (subCols.length > 0) {
                for (var j = 0; j < subCols.length; j++) {
                    headerLine += subCols[j] + "\t";
                    colNames.push(subCols[j]);

                }
            } else {
                headerLine += col["boxLabel"] + "\t";
                colNames.push(col["boxLabel"]);
            }b
            subCols.splice(0, subCols.length);

        }

        var output = "";
        output += "#" + headerLine + "\n";

        var lines = _this._getDataToExport();

        Ext.getCmp(_this.id + "_progressBarExport").updateProgress(0.6, "Preparing data");

        for (var i = 0; i < lines.length; i++) {
            var v = lines[i];
            for (var key in v.sampleGenotypes) {

                aux = v.sampleGenotypes[key];
                aux = aux.replace(/-1/g, ".");
                aux = aux.replace("|", "/");
                v[key] = aux;
                _this._getEffect(v);
                _this._getPolyphenSift(v);
            }

            v.genes = v.genes.join(",");
        }

        Ext.getCmp(_this.id + "_progressBarExport").updateProgress(0.9, "Creating File");


        for (var j = 0; j < lines.length; j++) {
            output += _this._processFileLine(lines[j], colNames);
            output += "\n";
        }

        return output;
    },
    _getDataToExport: function () {


        var _this = this;
        var totalData = _this.st.totalCount;

        var values = this.form.getForm().getValues();

        var formParams = {};
        for (var param in values) {
            if (formParams[param]) {
                var aux = [];
                aux.push(formParams[param]);
                aux.push(values[param]);
                formParams[param] = aux;
            } else {
                formParams[param] = values[param];
            }
        }
        formParams.limit = totalData;

        var url = OpencgaManager.getJobAnalysisUrl($.cookie("bioinfo_account"), _this.job.id) + '/variantsMongo';

        var data = [];
        $.ajax({
            url: url,
            dataType: 'json',
            data: formParams,
            async: false,
            success: function (response, textStatus, jqXHR) {
                if (response.response && response.response.numResults > 0) {

                    data = response.response.result;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading Effect');
                Ext.getCmp(_this.id + "_progressBarExport").updateProgress(0, "Error");
            }
        });


        return data;

    },
    _processFileLine: function (data, columns) {
        var line = "";
        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            switch (col) {
                case "Variant":
                    line += data.chromosome + ":" + data.position;
                    break;
                case "Alleles":
                    line += data.ref + ">" + data.alt;
                    break;
                case "SNP Id":

                    line += this._getValueLine(data.stats_id_snp);
                    break;
                case "1000G":
                    if (data.controls["1000G"]) {
                        line += data.controls["1000G"].maf + "(" + data.controls["1000G"].allele + ")";

                    } else {
                        line += ".";
                    }
                    break;
                case "BIER":
                    if (data.controls["BIER"]) {

                        line += data.controls["BIER"].maf + "(" + data.controls["BIER"].allele + ")";
                    } else {
                        line += ".";
                    }
                    break;
                case "EVS":
                    if (data.controls["EVS"]) {
                        line += data.controls["EVS"].maf + "(" + data.controls["EVS"].allele + ")";
                    } else {
                        line += ".";
                    }
                    break;

                case "Gene":
                    line += this._getValueLine(data.genes)
                    break;
                case "Consq. Type":
                    line += this._getValueLine(data.consequence_types);
                    break;
                case "Polyphen":
                    //line += "-";
                    line += this._getValueLine(data.polyphen_score);
                    break;
                case "Phenotype":
                    //line += "-";
                    line += this._getValueLine(data.phenotype);
                    break;
                case "SIFT":
                    line += this._getValueLine(data.sift_score);
                    break;

                case "Is indel?":
                    line += this._getValueLine(data.stats_is_indel);
                    break;
                default:
                    line += this._getValueLine(data[col]);
            }
            line += "\t";
        }
        return line;
    },
    _getValueLine: function (value) {
        if (value == undefined || value == null) {
            return ".";
        } else if (value == "") {
            return ".";
        } else {
            return value;
        }
    },
    _getColumnNames: function () {
        var _this = this;

        var colNames = [];
        for (var i = 0; i < _this.columnsGrid.length; i++) {
            var col = _this.columnsGrid[i];
            colNames.push(col.text);
        }
        return colNames;
    },
    _prepareData: function (data) {

        var finalData = [];
        var cont = 0;
        var aux;

        for (var i = 0; i < data.length; i++) {
            var v = data[i];

            for (var key in v.sampleGenotypes) {
                aux = v.sampleGenotypes[key];
                aux = aux.replace(/-1/g, ".");
                v[key] = aux;
            }

            delete v.sampleGenotypes;

            var ct = "";
            if (v.consequenceTypes != null) {
                for (var key in v.consequenceTypes) {
                    ct += v.consequenceTypes[key];
                    ct += ",";
                }
                v.ct = ct;
            }

            finalData.push(v);


        }
        return finalData;
    },
    _getResult: function () {
        var _this = this;

        // Clear store's extraParams
        _this.st.getProxy().extraParams = {};

        var values = this.form.getForm().getValues();

        var formParams = {};
        for (var param in values) {
            if (formParams[param]) {
                var aux = [];
                aux.push(formParams[param]);
                aux.push(values[param]);
                formParams[param] = aux;
            } else {
                formParams[param] = values[param];
            }
        }

        for (var param in formParams) {
            _this.st.getProxy().setExtraParam(param, formParams[param]);
        }
        _this.st.load();


    },
    _addColorPicker: function () {

        var _this = this;

        var menu = _this.grid.headerCt.getMenu();
        menu.add([
            {
                text: 'Choose color',
                menu: {
                    xtype: 'colormenu',
                    value: '000000',
                    handler: function (obj, rgb) {
                        Ext.Msg.alert('background-color: ' + rgb.toString());
                    } // handler
                } // menu
            }
        ]);

    },
    _updateInfoVariantMini: function (data) {

        var _this = this;
        var result = [];

        for (var i = 0; i < data.length; i++) {
            var elem = data[i];
            result.push({
                chr: elem.get("chromosome"),
                pos: elem.get("position"),
                ref: elem.get("ref"),
                alt: elem.get("alt")[0]
            });
        }

        _this.stMini.loadData(result);

    },

////
////
    /*FORM COMPONENTS*/
////
////

    _getSelectDataPanel: function () {

        var dataBases = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "pruebas.db", "name": "pruebas"},
                {"value": "s4.db", "name": "s4"},
                {"value": "s5500.db", "name": "s5500"},
                {"value": "fpoletta.db", "name": "fpoletta"}
            ]
        });

        var data_opt = this._createComboboxDB("db_name", "Data Base", dataBases, 0, 100, '5 0 5 5');

        return Ext.create('Ext.form.Panel', {
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            layout: 'vbox',
            items: [data_opt]
        });
    },
    _getChrStartEnd: function () {

        var chr_pos = Ext.create('Ext.form.field.Text', {
            fieldLabel: "Chromosome",
            id: this.id + "chr_pos",
            name: "chr_pos",
            margin: '5 0 0 5',
            width: "20%",
            value: 22,
            allowBlank: false
        });

        var start_pos = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Start',
            id: this.id + 'start_pos',
            name: 'start_pos',
            margin: '5 0 0 5',
            width: '20%',
            allowBlank: false
        });
        var end_pos = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'End',
            id: this.id + "end_pos",
            name: "end_pos",
            margin: '5 0 0 5',
            width: "20%",
            allowBlank: false,
            value: 20000000
        });

        return Ext.create('Ext.form.Panel', {
            //            title: 'Inheritance',
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            type: 'vbox',
            items: [chr_pos, start_pos, end_pos]
        });
    },
    _getRegionList: function () {
        var regionList = Ext.create('Ext.form.field.TextArea', {
            id: this.id + "region_list",
            name: "region_list",
            emptyText: '1:1-1000000,2:1-1000000',
            margin: '0 0 0 5',
            //value: "1:1-10000000",
            allowBlank: false,
            width: '100%'
        });

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            //width: "100%",
            flex: 1,
            border: 0,
            buttonAlign: 'center',
            layout: 'vbox',
            items: [
                {
                    xtype: 'tbtext', text: '<span class="info">Enter regions (comma separated)</span>'
                },
                regionList
            ]
        });
    },
    _getGenes: function () {
        var geneList = Ext.create('Ext.form.field.TextArea', {
            id: this.id + "genes",
            name: "genes",
            emptyText: 'BRCA2,PPL',
            margin: '0 0 0 5',
            allowBlank: false,
            width: '100%'
        });

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            border: 0,
            buttonAlign: 'center',
            layout: 'vbox',
            items: [
                {
                    xtype: 'tbtext', text: '<span class="info">Enter genes (comma separated)</span>'
                },
                geneList
            ]
        });
    },
    _getBioTypes: function () {
        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 8",
            width: '100%',
            border: 0,
            buttonAlign: 'center',
            layout: 'vbox',
            id: this.id + 'biotype_panel',
            items: []
        });
    },
    _getConsequenceType: function () {

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            layout: 'vbox',
            border: 0,
            id: this.id + "conseq_type_panel",
            items: []
        });
    },
    _getMissing: function () {
        var alleles_text = Ext.create('Ext.form.field.Text', {
            id: this.id + "miss_allele",
            name: "miss_allele",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var alleles_opt = this._createCombobox("option_miss_alleles", "", this.optValues, 0, 10, '0 0 0 5');
        alleles_opt.width = "20%";

        var gt_text = Ext.create('Ext.form.field.Text', {
            id: this.id + "miss_gt",
            name: "miss_gt",
            margin: '0 0 0 5',
            allowBlank: false,
            width: "20%",
            value: 0
        });

        var gt_opt = this._createCombobox("option_miss_gt", "", this.optValues, 4, 10, '0 0 0 5');
        gt_opt.width = "20%";

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            type: 'vbox',
            border: 0,
            items: [
//                {
//                    xtype: 'tbtext', text: '<span class="emph">Missing Alleles</span>'
//                },
//                {
//                    xtype: 'fieldcontainer',
//                    margin: "0 0 5 0",
//
//                    layout: 'hbox',
//                    border: false,
//                    items: [alleles_opt, alleles_text] },
                {
                    xtype: 'tbtext', text: '<span class="emph">Missings</span>'
                },

                {
                    xtype: 'fieldcontainer',
                    margin: "0 0 5 0",
                    layout: 'hbox',
                    border: false,
                    items: [gt_opt, gt_text]}
            ]
        });
    },
    _getMAF: function () {
        var maf_text = Ext.create('Ext.form.field.Text', {
            id: this.id + "maf",
            name: "maf",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var maf_opt = this._createCombobox("option_maf", "", this.optValues, 0, 10, '0 0 0 5');
        maf_opt.width = "20%";

        var mgf_text = Ext.create('Ext.form.field.Text', {
            id: this.id + "mgf",
            name: "mgf",
            margin: '0 0 0 5',
            allowBlank: false,
            width: "20%"
        });

        var mgf_opt = this._createCombobox("option_mgf", "", this.optValues, 0, 10, '0 0 0 5');
        mgf_opt.width = "20%";

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            type: 'vbox',
            border: 0,
            items: [
                {
                    xtype: 'tbtext', text: '<span class="emph">Allele freq.</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [
                        maf_opt,
                        maf_text]
                },
                {
                    xtype: 'tbtext', text: '<span class="emph">Genotype freq.</span>'
                },

                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [ mgf_opt, mgf_text]}
            ]
        });
    },
    _getMendelError: function () {
        var mendel_text = Ext.create('Ext.form.field.Text', {
            id: this.id + "mend_error",
            name: "mend_error",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var mendel_opt = this._createCombobox("option_mend_error", "", this.optValues, 0, 10, '0 0 0 5');
        mendel_opt.width = "20%";

        return Ext.create('Ext.form.Panel', {
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            type: 'vbox',
            border: 0,
            items: [
                {
                    xtype: 'tbtext', text: '<span class="emph">Mendelian Errors</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [mendel_opt, mendel_text]
                }
            ]

        });
    },
    _getIsIndel: function () {
        return Ext.create('Ext.form.Panel', {
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "99%",
            buttonAlign: 'center',
            layout: 'hbox',
            border: 0,
            items: [
                {
                    xtype: 'tbtext',
                    text: '<span class="emph">Is indel?</span>',
                    margin: '5 0 0 5'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'is_indel'

                }
            ]
        });
    },
    _getInheritance: function () {

        var cases_d = Ext.create('Ext.form.field.Text', {
            id: this.id + "cases_percent_dominant",
            name: "cases_percent_dominant",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var cases_d_opt = this._createCombobox("option_cases_dom", "", this.optValues, 0, 10, '0 0 0 5');
        cases_d_opt.width = "20%";

        var controls_d = Ext.create('Ext.form.field.Text', {
            id: this.id + "controls_percent_dominant",
            name: "controls_percent_dominant",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var controls_d_opt = this._createCombobox("option_controls_dom", "", this.optValues, 0, 10, '0 0 0 5');
        controls_d_opt.width = "20%";

        var cases_r = Ext.create('Ext.form.field.Text', {
            id: this.id + "cases_percent_recessive",
            name: "cases_percent_recessive",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var cases_r_opt = this._createCombobox("option_cases_rec", "", this.optValues, 0, 10, '0 0 0 5');
        cases_r_opt.width = "20%";

        var controls_r = Ext.create('Ext.form.field.Text', {
            id: this.id + "controls_percent_recessive",
            name: "controls_percent_recessive",
            margin: '0 0 0 5',
            width: "20%",
            allowBlank: false
        });

        var controls_r_opt = this._createCombobox("option_controls_rec", "", this.optValues, 0, 10, '0 0 0 5');
        controls_r_opt.width = "20%";

        return Ext.create('Ext.form.Panel', {
            border: true,
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            type: 'vbox',
            border: 0,
            items: [
                {
                    xtype: 'tbtext', text: '<span class="emph">% Cases Dominant</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [cases_d_opt, cases_d]
                },
                {
                    xtype: 'tbtext', text: '<span class="emph">% Controls Dominant</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [controls_d_opt, controls_d]
                },
                {
                    xtype: 'tbtext', text: '<span class="emph">% Cases Recessive</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [cases_r_opt, cases_r]
                },
                {
                    xtype: 'tbtext', text: '<span class="emph">% Controls Recessive</span>'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    items: [controls_r_opt, controls_r]
                }
            ]
        });


    },
    _getPolySIFT: function () {
        return Ext.create('Ext.form.Panel', {
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            layout: 'vbox',
            border: 0,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    width: "100%",
                    items: [
                        {
                            xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">Polyphen <</span>'
                        },
                        {
                            xtype: 'textfield',
                            name: 'polyphen',
                            margin: '0 0 0 5',
                            labelWidth: '50%',
                            width: "50%"
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    //fieldLabel: '% Controls recessive',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    border: false,
                    width: "100%",
                    items: [

                        {
                            xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">SIFT <</span>'
                        },
                        {
                            xtype: 'textfield',
                            name: 'sift',
                            margin: '0 0 0 5',
                            labelWidth: '50%',
                            width: "50%"
                        }
                    ]
                }
            ]
        });
    },
    _getControls: function () {
        return Ext.create('Ext.form.Panel', {
            bodyPadding: "5",
            margin: "0 0 5 0",
            width: "100%",
            buttonAlign: 'center',
            layout: 'vbox',
            border: 0,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    width: "100%",
                    items: [
                        {
                            xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">1000G MAF <</span>'
                        },
                        {
                            xtype: 'textfield',
                            name: 'maf_1000g_controls',
                            margin: '0 0 0 5',
                            labelWidth: '50%',
                            width: "50%"
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    //fieldLabel: '% Controls recessive',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    border: false,
                    width: "100%",
                    items: [

                        {
                            xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">BIER MAF<</span>'
                        },
                        {
                            xtype: 'textfield',
                            name: 'maf_bier_controls',
                            margin: '0 0 0 5',
                            labelWidth: '50%',
                            width: "50%"
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    border: false,
                    width: "100%",
                    items: [
                        {
                            xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">EVS MAF <</span>'
                        },
                        {
                            xtype: 'textfield',
                            name: 'maf_evs_controls',
                            margin: '0 0 0 5',
                            labelWidth: '50%',
                            width: "50%"
                            //value: '0.1'
                        }
                    ]
                }
            ]
        });
    },
    _createCombobox: function (name, label, data, defaultValue, labelWidth, margin) {
        var _this = this;

        return Ext.create('Ext.form.field.ComboBox', {
            id: this.id + name,
            name: name,
            fieldLabel: label,
            store: data,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            value: data.getAt(defaultValue).get('value'),
            labelWidth: labelWidth,
            margin: margin,
            editable: false,
            allowBlank: false
        });
    },
    _createDynCombobox: function (name, label, data, defaultValue) {
        var _this = this;

        var dataAux = [];
        for (var key in data) {
            if (key != '.') {
                dataAux.push({
                    name: Utils.formatText(key, "_"),
                    value: key
                });
            }
        }
        var storeAux = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: dataAux
        });

        return Ext.create('Ext.form.field.ComboBox', {
            name: name,
            emptyText: label,
            store: storeAux,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            multiSelect: true,
            delimiter: ",",
            editable: false,
            allowBlank: false,
            value: defaultValue,
            width: '100%'
        });
    },
    _createComboboxDB: function (name, label, data, defaultValue, labelWidth, margin) {
        var _this = this;

        return Ext.create('Ext.form.field.ComboBox', {
            id: this.id + name,
            name: name,
            fieldLabel: label,
            store: data,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            value: data.getAt(defaultValue).get('value'),
            labelWidth: labelWidth,
            margin: margin,
            editable: false,
            allowBlank: false,
            listeners: {
                change: function (field, newValue, oldValue) {
                    _this._updateInfo(newValue);
                }
            }
        });
    },
    _clearForm: function () {

        var _this = this;
        _this.form.getForm().reset();
    },
    _reloadForm: function () {

        var _this = this;
        _this.form.getForm().reset();
    },
    _checkForm: function () {
        var reg = Ext.getCmp(this.id + "region_list");
        var genes = Ext.getCmp(this.id + "genes");

        return true;

    },
    _getEffect: function (record) {
        var _this = this;

        var req = record.chromosome + ":" + record.position + ":" + record.ref + ":" + record.alt[0];

        $.ajax({
            url: "http://ws.bioinfo.cipf.es/cellbase/rest/latest/hsa/genomic/variant/" + req + "/consequence_type?of=json",
            dataType: 'json',
            async: false,
            success: function (response, textStatus, jqXHR) {
                if (response) { // {&& response.response && response.response.length > 0) {
                    for (var j = 0; j < response.length; j++) {
                        var elem = response[j];
                        if (elem.aaPosition != -1 &&
                            elem.transcriptId != "" &&
                            elem.aminoacidChange.length >= 3
                            && record.transcriptId === undefined
                            && record.aaPos === undefined
                            && record.aaChange === undefined) {
                            record.transcript = elem.transcriptId;
                            record.aaPos = elem.aaPosition;
                            record.aaChange = elem.aminoacidChange;
                        }
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading Effect');
            }

        });
    },
    _getPolyphenSift: function (variant) {

        if (variant.aaPos != undefined && variant.aaPos >= 0) {
            var change = variant.aaChange.split("/")[1];
            var url = "http://ws-beta.bioinfo.cipf.es/cellbase/rest/v3/hsapiens/feature/transcript/" + variant.transcript + "/function_prediction?aaPosition=" + variant.aaPos + "&aaChange=" + change;
            $.ajax({
                url: url,
                dataType: 'json',
                async: false,
                success: function (response, textStatus, jqXHR) {
                    var res = response.response[0];
                    if (res.numResults > 0) {
                        if (res.result[0].aaPositions[variant.aaPos]) {

                            res = res.result[0].aaPositions[variant.aaPos][change];
                            if (res !== undefined) {
                                if (res.ps != null) {
                                    variant.polyphen_score = res.ps;
                                }
                                if (res.pe != null) {
                                    variant.polyphen_effect = res.pe;
                                }
                                if (res.ss != null) {
                                    variant.sift_score = res.ss;
                                }
                                if (res.se != null) {
                                    variant.sift_effect = res.se;
                                }
                            }
                        }
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error loading PolyPhen/SIFT');
                }
            });
        }
    },
    _getPhenotypes: function (records) {

        var regs = [];
        for (var i = 0; i < records.length; i++) {

            var variant = records[i];

            var chr = variant.raw.chromosome;
            var pos = variant.raw.position;
            regs.push(chr + ":" + pos + "-" + pos);

        }
        if (regs.length > 0) {
            var url = "http://ws-beta.bioinfo.cipf.es/cellbase/rest/v3/hsapiens/genomic/region/" + regs.join(",") + "/phenotype?include=phenotype";

            $.ajax({
                url: url,
                dataType: 'json',
                async: false,
                success: function (response, textStatus, jqXHR) {

                    if (response != undefined && response.response.length > 0 && response.response.length == records.length) {
                        for (var i = 0; i < response.response.length; i++) {
                            var v = records[i];

                            var elem = response.response[i];
                            var phenotypes = [];

                            for (var k = 0; k < elem.numResults; k++) {
                                phenotypes.push(elem.result[k].phenotype);
                            }

                            v.set("phenotype", phenotypes.join(","));
                            v.commit();
                        }


                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error loading Phenotypes');
                }
            });
        }
    }
}
;
