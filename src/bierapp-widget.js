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


BierappWidget.prototype._createGrid = function () {

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

    parseMafControl = function (control) {
        var maf = control.maf;
        var res = maf.toFixed(3);
        if (control.allele != "") {
            res = res + " (" + control.allele + ")";
        }
        return res;
    }

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
            tpl: "{ref}>{alt}",
            sortable: false
        },
        {
            text: "Gene",
            dataIndex: 'genes',
            flex: 1,
            sortable: false
        },
        {
            text: 'Samples',
            flex: 1,
            sortable: false,
            columns: []
        },
        {
            text: "SNP Id",
            dataIndex: 'snpid',
            flex: 1,
            sortable: true
        },
        {
            flex: 1,
            text: "Controls (MAF)",
            defaults: {
                width: 70,
            },
            columns: [
                {
                    text: "1000G",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["1000G"]) {
                            return parseMafControl(record.data.controls["1000G"]);
                        } else {
                            return ".";
                        }
                    }
                },
                {
                    text: "1000G-AFR",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["1000G-AFR"]) {
                            return parseMafControl(record.data.controls["1000G-AFR"]);
                        } else {
                            return ".";
                        }
                    }
                },
                {
                    text: "1000G-ASI",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["1000G-ASI"]) {
                            return parseMafControl(record.data.controls["1000G-ASI"]);
                        } else {
                            return ".";
                        }
                    }
                },
                {
                    text: "1000G-AME",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["1000G-AME"]) {
                            return parseMafControl(record.data.controls["1000G-AME"]);
                        } else {
                            return ".";
                        }
                    }
                },
                {
                    text: "1000G-EUR",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["1000G-EUR"]) {
                            return parseMafControl(record.data.controls["1000G-EUR"]);
                        } else {
                            return ".";
                        }
                    }
                },
                {
                    text: "EVS",
                    renderer: function (val, meta, record) {
                        if (record.data.controls["EVS"]) {
                            return parseMafControl(record.data.controls["EVS"]);
                            //var maf = record.data.controls["EVS"].maf;
                            //return maf.toFixed(3) + " (" + record.data.controls["EVS"].allele + ")";
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
            sortable: false
        },
        {
            text: 'Polyphen',
            flex: 1,
            dataIndex: 'polyphen_score',
            xtype: 'templatecolumn',
            tpl: xtmplPoly,
            sortable: false
        },
        {
            text: 'SIFT',
            flex: 1,
            dataIndex: 'sift_score',
            xtype: "templatecolumn",
            tpl: xtmplSift,
            sortable: false
        },
        {
            text: 'Phenotype',
            dataIndex: 'phenotype',
            sortable: false
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
        {name: 'stats_miss_gt', type: 'int'},
        {name: 'stats_is_indel', type: 'boolean'},
        {name: 'gene_name', type: 'string'},
        {name: 'consequence_types', type: 'string'},
        {name: "controls", type: 'auto'},
        {name: "phenotype", type: "string"},
        {name: "polyphen_score", type: 'float'},
        {name: "polyphen_effect", type: 'int'},
        {name: "sift_score", type: 'float'},
        {name: "sift_effect", type: 'int'}
    ];
    _this.model = Ext.define('Variant', {
        extend: 'Ext.data.Model',
        fields: _this.attributes
    });

    var url = OpencgaManager.getJobAnalysisUrl($.cookie("bioinfo_account"), _this.job.id) + '/variantsMongo';
    console.log(url);

    _this.st = Ext.create('Ext.data.Store', {
        pageSize: 25,
        model: _this.model,
        //groupField: 'gene_name',
        data: [],
        autoLoad: false,
        remoteSort: true,
        storeId: 'gridStore',
        sorters: [
            {
                property: 'chromosome',
                direction: 'ASC'
            }
        ],
        proxy: {
            model: _this.model,
            type: 'ajax',
            url: url,
            reader: {
                root: "response.result",
                totalProperty: "response.numResults"
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },
                success: function (response) {
                    console.log("Spiffing, everything worked");
                    console.log(response.success);
                    console.log(response.result);
                },
                failure: function (response) {
                    console.log(response);
                    Ext.Msg.alert('Error', 'Please try again.', Ext.emptyFn);
                }
            }
        },
        method: 'get',
        listeners: {
            load: function (store, records, successful, operation, eOpts) {

                _this.st.suspendEvents();
                var aux;

                for (var i = 0; i < records.length; i++) {
                    var v = records[i];
                    for (var key in v.raw.sampleGenotypes) {

                        aux = v.raw.sampleGenotypes[key];
                        aux = aux.replace(/-1/g, ".");
                        aux = aux.replace("|", "/");
                        v.set(key, aux);
                    }

                    v.set("snpid", v.raw.snpid);
                    v.set("genes", v.raw.genes.join(","));

                    //_this._getEffect(v);
                    //_this._getPolyphenSift(v);
                    v.commit();
                }

                _this._getPhenotypes(records);

                _this.st.resumeEvents();
                _this.st.fireEvent('refresh');

                console.log(records);
                _this._updateInfoVariantMini(records);
            }
        }

    });
    _this.exportStore = Ext.create('Ext.data.Store', {
        //pageSize: 25,
        model: _this.model,
        //groupField: 'gene_name',
        data: [],
        autoLoad: false,
        remoteSort: true,
        storeId: 'exportStore',
        sorters: [
            {
                property: 'chromosome',
                direction: 'ASC'
            }
        ],
        proxy: {
            model: _this.model,
            type: 'ajax',
            url: url,
            reader: {
                root: "response.result",
                totalProperty: "response.numResults"
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },
                success: function (response) {
                    console.log("Spiffing, everything worked");
                    console.log(response.success);
                    console.log(response.result);
                },
                failure: function (response) {
                    console.log(response);
                    Ext.Msg.alert('Error', 'Please try again.', Ext.emptyFn);
                }
            }
        },
        method: 'get',
        listeners: {
            load: function (store, records, successful, operation, eOpts) {

                _this.st.suspendEvents();
                var aux;

                for (var i = 0; i < records.length; i++) {
                    var v = records[i];
                    for (var key in v.raw.sampleGenotypes) {

                        aux = v.raw.sampleGenotypes[key];
                        aux = aux.replace(/-1/g, ".");
                        aux = aux.replace("|", "/");
                        v.set(key, aux);
                    }

                    v.set("snpid", v.raw.snpid);
                    v.set("genes", v.raw.genes.join(","));

                    //_this._getEffect(v);
                    //_this._getPolyphenSift(v);
                    v.commit();
                }

                //_this._getPhenotypes(records);

                _this.st.resumeEvents();
                _this.st.fireEvent('refresh');

            }
        }

    });

    var grid = Ext.create('Ext.grid.Panel', {
            title: '<span class="ssel">Variant Info</span>',
            flex: 1,
            height: '100%',
            store: _this.st,
            loadMask: true,
            border: 1,
            columns: this.columnsGrid,
            plugins: 'bufferedrenderer',
            loadMask: true,
            features: [
                {ftype: 'summary'}
            ],
            viewConfig: {
                emptyText: 'No records to display',
                enableTextSelection: true
            },
            bbar: Ext.create('Ext.PagingToolbar', {
                store: _this.st,
                id: _this.id + "_pagingToolbar",
                pageSize: 25,
                displayInfo: true,
                displayMsg: 'Variants {0} - {1} of {2}',
                emptyMsg: "No variants to display",
            }),
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

                                if (_this.st.getCount() == 0) {
                                    Ext.example.msg('ERROR', 'You must apply some filters before or the result set is empty!!');
                                    return;
                                }

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
                                    var progress = Ext.create('Ext.ProgressBar', {
                                        text: 'Progress...',
                                        border: 1,
                                        flex: 1,
                                        margin: '0 10 0 0',
                                        id: _this.id + "_progressBarExport"
                                    });

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
                                            progress,
                                            {
                                                xtype: 'textfield',
                                                id: _this.id + "fileName",
                                                emptyText: "enter file name",
                                                flex: 1
                                            },
                                            {
                                                text: 'Download',
                                                href: "none",
                                                id: _this.id + "_downloadExport",
                                                handler: function () {
                                                    Ext.getCmp(_this.id + "_progressBarExport").updateProgress(0.1, "Requesting data");

                                                    this.disable();
                                                    var fileName = Ext.getCmp(_this.id + "fileName").getValue();
                                                    if (fileName == "") {
                                                        fileName = "variants";
                                                    }
                                                    var columns = Ext.getCmp(_this.id + "cbgAttributes").getChecked();

                                                    var content = _this._exportToTab(columns);

                                                    this.getEl().set({
                                                        href: 'data:text/csv,' + encodeURIComponent(content),
                                                        download: fileName + ".csv"
                                                    });


                                                    Ext.getCmp(_this.id + "_progressBarExport").updateProgress(1, "Downloaded");
                                                    //this.up(".window").hide();
                                                    Ext.getCmp(_this.id + "fileName").reset();

                                                }
                                            }
                                        ]
                                    }).show();
                                } else {
                                    Ext.getCmp(_this.id + "exportWindow").show();

                                }
                                Ext.getCmp(_this.id + "_progressBarExport").updateProgress(0, "Progress");
                                Ext.getCmp(_this.id + "_downloadExport").enable();
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
                xtype: 'textfield',
                fieldLabel: '<span class="emph">1000G MAF <</span>',
                name: 'maf_1000g_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            },
            {
                xtype: 'textfield',
                fieldLabel: '<span class="emph">EVS MAF   <</span>',
                name: 'maf_evs_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            },
            {
                xtype: 'tbtext',
                margin: '20 0 5 0 ',
                border: '0 0 1 0',
                style: {
                    borderColor: 'black',
                    borderStyle: 'solid'
                },
                text: '<span>1000G Populations</span>'
            },
            {
                xtype: 'textfield',
                fieldLabel: '<span class="emph">African MAF <</span>',
                name: 'maf_1000g_afr_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            },
            {
                xtype: 'textfield',
                fieldLabel: '<span class="emph">American MAF <</span>',
                name: 'maf_1000g_ame_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            },
            {
                xtype: 'textfield',
                fieldLabel: '<span class="emph">Asian MAF <</span>',
                name: 'maf_1000g_asi_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            },
            {
                xtype: 'textfield',
                fieldLabel: '<span class="emph">European MAF <</span>',
                name: 'maf_1000g_eur_controls',
                labelWidth: 120,
                width: 180,
                labelAlign: 'right'
            }
        ]
    });
};