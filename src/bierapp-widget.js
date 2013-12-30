BierappWidget.prototype = new VariantWidget();

function BierappWidget(args) {
    var _this = this;
    _.extend(this, Backbone.Events);

    this.id = Utils.genId("BierappWidget");

    //set default args
    this.border = true;
    this.autoRender = false;
    this.targetId;
    this.width;
    this.height = '100%';
    this.closable = true;

    //set instantiation args, must be last
    _.extend(this, args);

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
}

BierappWidget.prototype._createPanel = function (targetId) {
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
                        }else{
                            var row = _this.grid.getView().getSelectionModel().getSelection()[0].raw;

                            _this.region = new Region({
                                chromosome: row.chromosome,
                                start: row.position - 200,
                                end: row.position + 200
                            });

                            _this.panel.removeAll(false);
                            _this.panel.add(_this.genomeViewerPanel);


                            if (!_.isUndefined(_this.gv)) {
                                _this.gv.setRegion(_this.region);
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
};
BierappWidget.prototype._createGrid = function() {

    var _this = this;

    var xtmplPoly = new Ext.XTemplate(
        '{[this.parseEffect(values)]}',
        {
            parseEffect: function(value){

                if(value.polyphen_score == 0 && value.polyphen_effect == 0){
                    return ".";
                }

                var score = value.polyphen_score;
                var effect="";
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
            parseEffect: function(value){

                if(value.sift_score == 0 && value.sift_effect == 0){
                    return ".";
                }

                var score = value.sift_score;
                var effect="";
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
//            new Ext.grid.RowNumberer({width: 30}),
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
            text: 'Samples',
            flex: 1,
            columns: []
        },
        {
            text: "SNP Id",
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

                            return record.data.controls["1000G"].maf + " (" + record.data.controls["1000G"].allele + ")";
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
            text: "Gene",
            dataIndex: 'gene_name',
            hidden: true,
            flex: 1
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
            text: 'SIFT',
            flex: 1,
            data_index: 'sift_score',
            xtype: "templatecolumn",
            tpl: xtmplSift
        },
        // {text: 'Conservation', flex: 1},
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
                parseGroupField: function(value){

                    return Utils.formatText(value, "_");
                }
            }
        );

    var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
        //groupHeaderTpl: '{[this.parseGroupField(values.groupField)]}: {groupValue} ({rows.length} Variant{[values.rows.length > 1 ? "s" : ""]})',
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
            viewConfig:{
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
            ],
            listeners: {
                afterrender: function () {

                    var btn = Ext.getCmp(_this.id + "gridColSelectorMenu");

                    btn.add(_this.colSelector);


                }
            }
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
};

BierappWidget.prototype._getControls = function () {
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
        //{
            //xtype: 'fieldcontainer',
            ////fieldLabel: '% Controls recessive',
            //layout: 'hbox',
            //margin: '10 0 0 0',
            //border: false,
            //width: "100%",
            //items: [

                //{
                //xtype: 'tbtext', margin: '5 0 0 0', text: '<span class="emph">BIER MAF<</span>'
            //},
            //{
                //xtype: 'textfield',
                //name: 'maf_bier_controls',
                //margin: '0 0 0 5',
                //labelWidth: '50%',
                //width: "50%"
            //}
            //]
        //},
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
};
