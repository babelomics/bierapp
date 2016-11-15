// CELLBASE_HOST = "http://bioinfo.hpc.cam.ac.uk/cellbase";
CELLBASE_HOST ="http://ws.babelomics.org/cellbase";
CELLBASE_VERSION = "v4";

OPENCGA_HOST = "http://test.babelomics.org/opencga-0.7-dev";
// OPENCGA_HOST = "http://test.babelomics.org/opencga-0.7-new";
//OPENCGA_HOST = "http://bioinfoint.hpc.cam.ac.uk/opencga/rest";
BIERAPP_VERSION = "1.5.0";

STUDY_NAME = "WorkSpace";
CELLBASE_HOST_OLD = "http://ws-beta.bioinfo.cipf.es/cellbase-staging/rest";

VCF_VALIDATOR=true;

var POPULAR_SPECIES = ["Homo sapiens", "Mus musculus", "Danio rerio", "Drosophila melanogaster", "Saccharomyces cerevisiae", "Plasmodium falciparum", "Arabidopsis thaliana", "Citrus Clementina"];

var AVAILABLE_SPECIES = {
    "text": "Species",
    "items": [
        {
            "text": "Vertebrates",
            "items": [
                {
                    "text": "Bos taurus",
                    "assembly": "UMD3.1",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Canis familiaris",
                    "assembly": "CanFam3.1",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Ciona intestinalis",
                    "assembly": "KH",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Danio rerio",
                    "assembly": "Zv9",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "X", "Y", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Equus caballus",
                    "assembly": "EquCab2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Felis catus",
                    "assembly": "Felis_catus_6.2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "C1", "C2", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "F1", "F2", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Gallus gallus",
                    "assembly": "Galgal4",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "32", "W", "Z", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Gorilla gorilla",
                    "assembly": "gorGor3.1",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Homo sapiens",
                    "assembly": "GRCh37.p10",
                    "region": {"chromosome": "13", "start": 32889611, "end": 32973805},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889599, "end": 32889739}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "20", "start": 32878277, "end": 32878277}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "1", "start": 32877109, "end": 32882337}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {
                    "text": "Macaca mulatta",
                    "assembly": "MMUL_1.0",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Mus musculus",
                    "assembly": "GRCm38.p1",
                    "region": {"chromosome": "1", "start": 18422009, "end": 18422009},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "X", "Y", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Oryctolagus cuniculus",
                    "assembly": "oryCun2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Pan troglodytes",
                    "assembly": "CHIMP2.1.4",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2A", "2B", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Pongo abelii",
                    "assembly": "PPYG2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Un", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Rattus norvegicus",
                    "assembly": "Rnor_5.0",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                },
                {
                    "text": "Sus scrofa",
                    "assembly": "Sscrofa10.2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "X", "Y", "MT"],
                    "url": "ftp://ftp.ensembl.org/pub/release-71/"
                }
            ]
        },
        {
            "text": "Metazoa",
            "items": [
                {
                    "text": "Anopheles gambiae",
                    "assembly": "AgamP3",
                    "region": {"chromosome": "2L", "start": 1000000, "end": 1000000},
                    "chromosomes": ["2L", "2R", "3L", "3R", "X"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"
                },
                {
                    "text": "Caenorhabditis elegans",
                    "assembly": "WBcel235",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "X", "MtDNA"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/fasta/"
                },
                {
                    "text": "Drosophila melanogaster",
                    "assembly": "BDGP5",
                    "region": {"chromosome": "2L", "start": 1000000, "end": 1000000},
                    "chromosomes": ["2L", "2LHet", "2R", "2RHet", "3L", "3LHet", "3R", "3RHet", "4", "U", "Uextra", "X", "XHet", "YHet", "dmel_mitochondrion_genome"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"
                },
                {
                    "text": "Drosophila simulans",
                    "assembly": "WUGSC1",
                    "region": {"chromosome": "2L", "start": 1000000, "end": 1000000},
                    "chromosomes": ["2L", "2R", "3L", "3R", "4", "X"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"
                },
                {
                    "text": "Drosophila yakuba",
                    "assembly": "dyak_r1.3",
                    "region": {"chromosome": "2L", "start": 1000000, "end": 1000000},
                    "chromosomes": ["2L", "2R", "3L", "3R", "4", "chr2h", "chr3h", "chrXh", "chrYh", "X"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"
                }
            ]
        },
        {
            "text": "Fungi",
            "items": [
                {
                    "text": "Aspergillus fumigatus",
                    "assembly": "CADRE",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "MT"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                },
                {
                    "text": "Aspergillus nidulans",
                    "assembly": "ASM1142v1",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                },
                {
                    "text": "Aspergillus niger",
                    "assembly": "CADRE",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                },
                {
                    "text": "Aspergillus oryzae",
                    "assembly": "CADRE2",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                },
                {
                    "text": "Saccharomyces cerevisiae",
                    "assembly": "SacCer_Apr2011",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "Mito"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                },
                {
                    "text": "Schizosaccharomyces pombe",
                    "assembly": "ASM294v1",
                    "region": {"chromosome": "I", "start": 1000000, "end": 1000000},
                    "chromosomes": ["AB325691", "I", "II", "III", "MT", "MTR"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"
                }
            ]
        },
        {
            "text": "Protist",
            "items": [
                {
                    "text": "Leishmania major",
                    "assembly": "ASM272v2",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"
                },
                {
                    "text": "Plasmodium falciparum",
                    "assembly": "ASM276v1",
                    "region": {"chromosome": "01", "start": 1000000, "end": 1000000},
                    "chromosomes": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"
                }
            ]
        },
        {
            "text": "Plants",
            "items": [
                {
                    "text": "Arabidopsis lyrata",
                    "assembly": "v.1.0",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Arabidopsis thaliana",
                    "assembly": "TAIR10",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "Mt", "Pt"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Brachypodium distachyon",
                    "assembly": "v1.0",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Glycine max",
                    "assembly": "V1.0",
                    "region": {"chromosome": "Gm01", "start": 1000000, "end": 1000000},
                    "chromosomes": ["Gm01", "Gm02", "Gm03", "Gm04", "Gm05", "Gm06", "Gm07", "Gm08", "Gm09", "Gm10", "Gm11", "Gm12", "Gm13", "Gm14", "Gm15", "Gm16", "Gm17", "Gm18", "Gm19", "Gm20"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Oryza sativa",
                    "assembly": "MSU6",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Mt", "Pt", "Sy", "Un"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Vitis vinifera",
                    "assembly": "IGGP_12x",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "Un"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                },
                {
                    "text": "Zea mays",
                    "assembly": "AGPv3",
                    "region": {"chromosome": "1", "start": 1000000, "end": 1000000},
                    "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Mt", "Pt"],
                    "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"
                }
                //                  {"text": "Citrus Clementina", "assembly": "1.0", "region":{"chromosome":"scaffold_1","start":233423,"end":236969},   "chromosomes": [], "url": ""}
            ]
        }
    ]
};


/** Reference to a species from the list to be shown at start **/
var DEFAULT_SPECIES = AVAILABLE_SPECIES.items[0].items[8];

//bierappXtmplPoly = new Ext.XTemplate(
//    '{[this.parseEffect(values)]}',
//    {
//        parseEffect: function (value) {
//
//            if (value.polyphen_score == 0 && value.polyphen_effect == 0) {
//                return ".";
//            }
//
//            var score = value.polyphen_score;
//            var effect = "";
//            switch (value.polyphen_effect) {
//                case 0:
//                    effect = "probably damaging";
//                    break;
//                case 1:
//                    effect = "possibly damaging";
//                    break;
//                case 2:
//                    effect = "benign";
//                    break;
//                case 3:
//                    effect = "unknown";
//                    break;
//                default:
//                    return ".";
//            }
//            return(score + " - (" + effect + ")");
//        }
//    }
//);
//bierappXtmplSift = new Ext.XTemplate(
//    '{[this.parseEffect(values)]}',
//    {
//        parseEffect: function (value) {
//            if (value.sift_score == 0 && value.sift_effect == 0) {
//                return ".";
//            }
//
//            var score = value.sift_score;
//            var effect = "";
//            switch (value.sift_effect) {
//                case 0:
//                    effect = "tolerated";
//                    break;
//                case 1:
//                    effect = "deleterious";
//                    break;
//                default:
//                    return ".";
//            }
//            return(score + " - (" + effect + ")");
//        }
//    }
//);
//
//bierappParseMafControl = function (control) {
//    var maf = control.maf;
//    var res = maf.toFixed(3);
//    if (control.allele != "") {
//        res = res + " (" + control.allele + ")";
//    }
//    return res;
//};
//
//
//bierappColumns = [
//    {
//        text: "Variant",
//        dataIndex: 'chromosome',
//        flex: 1,
//        xtype: "templatecolumn",
//        tpl: "{chromosome}:{position}"
//    },
//    {
//        text: "Alleles",
//        flex: 0.5,
//        xtype: "templatecolumn",
//        tpl: "{ref}>{alt}",
//        sortable: false
//    },
//    {
//        text: "Gene",
//        dataIndex: 'genes',
//        flex: 1,
//        sortable: false
//    },
//    {
//        text: 'Samples',
//        flex: 1,
//        sortable: false,
//        columns: []
//    },
//    {
//        text: "SNP Id",
//        dataIndex: 'snpid',
//        flex: 1,
//        sortable: true
//    },
//    {
//        flex: 1,
//        text: "Controls (MAF)",
//        defaults: {
//            width: 100
//        },
//        columns: [
//            {
//                text: "1000G",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["1000G"]) {
//                        return bierappParseMafControl(record.data.controls["1000G"]);
//                    } else {
//                        return ".";
//                    }
//                }
//            },
//            {
//                text: "1000G-AFR",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["1000G-AFR"]) {
//                        return bierappParseMafControl(record.data.controls["1000G-AFR"]);
//                    } else {
//                        return ".";
//                    }
//                }
//            },
//            {
//                text: "1000G-ASI",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["1000G-ASI"]) {
//                        return bierappParseMafControl(record.data.controls["1000G-ASI"]);
//
//                    } else {
//                        return ".";
//                    }
//                }
//            },
//            {
//                text: "1000G-AME",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["1000G-AME"]) {
//                        return bierappParseMafControl(record.data.controls["1000G-AME"]);
//                    } else {
//                        return ".";
//                    }
//                }
//            },
//            {
//                text: "1000G-EUR",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["1000G-EUR"]) {
//                        return bierappParseMafControl(record.data.controls["1000G-EUR"]);
//                    } else {
//                        return ".";
//                    }
//                }
//            },
//            {
//                text: "EVS",
//                renderer: function (val, meta, record) {
//                    if (record.data.controls["EVS"]) {
//                        return bierappParseMafControl(record.data.controls["EVS"]);
//                    } else {
//                        return ".";
//                    }
//                }
//            }
//        ]
//    },
//    {
//        text: "Consq. Type",
//        dataIndex: "consequence_types",
//        flex: 1,
//        sortable: false
//    },
//    {
//        text: 'Polyphen',
//        flex: 1,
//        dataIndex: 'polyphen_score',
//        xtype: 'templatecolumn',
//        tpl: bierappXtmplPoly,
//        sortable: false
//    },
//    {
//        text: 'SIFT',
//        flex: 1,
//        dataIndex: 'sift_score',
//        xtype: "templatecolumn",
//        tpl: bierappXtmplSift,
//        sortable: false
//    },
//    {
//        text: 'Phenotype',
//        dataIndex: 'phenotype',
//        sortable: false
//    },
//    {
//        text: "Is indel?",
//        flex: 1,
//        xtype: 'booleancolumn',
//        trueText: 'Yes',
//        falseText: 'No',
//        dataIndex: 'stats_is_indel',
//        sortable: true,
//        hidden: true
//    }
//];


//bierappAttributes = [
//    {name: 'id', type: 'string'},
//    {name: "chromosome", type: "string"},
//    {name: "start", type: "int"},
//    {name: "end", type: "int"},
//    {name: "type", type: "string"},
//    {name: "ref", type: "string"},
//    {name: "alt", type: "string"},
//    {name: 'hgvs_name', type: 'string'},
//];

bierappAttributes = [
    {name: "chromosome", type: "string"},
    {name: "position", type: "int"},
    {name: "alt", type: "string"},
    {name: "ref", type: "string"},
    {name: 'stats_id_snp', type: 'string'},
    {name: 'stats_maf', type: 'number'},
    {name: 'stats_mgf', type: 'number'},
    {name: 'stats_miss_gt', type: 'int'},
    {name: 'stats_is_indel', type: 'boolean'},
    {name: 'gene_name', type: 'string'},
    {name: 'consequence_types', type: 'string'},
    {name: "controls", type: 'auto'},
    {name: "phenotype", type: "string"},
    {name: "polyphen_score", type: 'number'},
    {name: "polyphen_effect", type: 'int'},
    {name: "sift_score", type: 'number'},
    {name: "sift_effect", type: 'int'}
];

CONSEQUENCE_TYPES = [{
    "name": "transcript_ablation",
    "text": "Transcript ablation",
    "value": 1893,
    "description": "A feature ablation whereby the deleted region includes a transcript feature",
    "impact":"high"
}, {
    "name": "splice_acceptor_variant",
    "text": "Splice acceptor variant",
    "value": 1574,
    "description": "A splice variant that changes the 2 base region at the 3' end of an intron",
    "impact":"high"
}, {
    "name": "splice_donor_variant",
    "text": "Splice donor variant",
    "value": 1575,
    "description": "A splice variant that changes the 2 base region at the 5' end of an intron",
    "impact":"high"
}, {
    "name": "stop_gained",
    "text": "Stop gained",
    "value": 1587,
    "description": "A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcrip",
    "impact":"high"
}, {
    "name": "frameshift_variant",
    "text": "Frameshift variant",
    "value": 1589,
    "description": "A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three",
    "impact":"high"
}, {
    "name": "stop_lost",
    "text": "Stop lost",
    "value": 1578,
    "description": "A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript",
    "impact":"high"
}, {
    "name": "start_lost",
    "text": "Start lost",
    "value": 2012,
    "description": "A codon variant that changes at least one base of the canonical start codo",
    "impact":"high"
}, {
    "name": "transcript_amplification",
    "text": "Transcript amplification",
    "value": 1889,
    "description": "A feature amplification of a region containing a transcript",
    "impact":"high"
}, {
    "name": "inframe_insertion",
    "text": "Inframe insertion",
    "value": 1821,
    "description": "An inframe non synonymous variant that inserts bases into in the coding sequenc",
    "impact":"moderate"
}, {
    "name": "inframe_deletion",
    "text": "Inframe deletion",
    "value": 1822,
    "description": "An inframe non synonymous variant that deletes bases from the coding sequenc",
    "impact":"moderate"
}, {
    "name": "missense_variant",
    "text": "Missense variant",
    "value": 1583,
    "description": "A sequence variant, that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved",
    "impact":"moderate"
}, {
    "name": "protein_altering_variant",
    "text": "Protein altering variant",
    "value": 1818,
    "description": "A sequence_variant which is predicted to change the protein encoded in the coding sequence",
    "impact":"moderate"
}, {
    "name": "splice_region_variant",
    "text": "Splice region variant",
    "value": 1630,
    "description": "A sequence variant in which a change has occurred within the region of the splice site, either within 1-3 bases of the exon or 3-8 bases of the intron",
    "impact":"low"
}, {
    "name": "incomplete_terminal_codon_variant",
    "text": "Incomplete terminal codon variant",
    "value": 1626,
    "description": "A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed",
    "impact":"low"
}, {
    "name": "stop_retained_variant",
    "text": "Stop retained variant",
    "value": 1567,
    "description": "A sequence variant where at least one base in the terminator codon is changed, but the terminator remains",
    "impact":"low"
}, {
    "name": "synonymous_variant",
    "text": "Synonymous variant",
    "value": 1819,
    "description": "A sequence variant where there is no resulting change to the encoded amino acid",
    "impact":"low"
}, {
    "name": "coding_sequence_variant",
    "text": "Coding sequence variant",
    "value": 1580,
    "description": "A sequence variant that changes the coding sequence",
    "impact":"modifier"
}, {
    "name": "mature_miRNA_variant",
    "text": "Mature miRNA variant",
    "value": 1620,
    "description": "A transcript variant located with the sequence of the mature miRNA",
    "impact":"modifier"
}, {
    "name": "5_prime_UTR variant",
    "text": "5 prime UTR variant",
    "value": 1623,
    "description": "A UTR variant of the 5' UTR",
    "impact":"modifier"
}, {
    "name": "3_prime_UTR variant",
    "text": "3 prime UTR variant",
    "value": 1624,
    "description": "A UTR variant of the 3' UTR",
    "impact":"modifier"
}, {
    "name": "non_coding_transcript_exon_variant",
    "text": "Non coding transcript exon variant",
    "value": 1792,
    "description": "A sequence variant that changes non-coding exon sequence in a non-coding transcript",
    "impact":"modifier"
}, {
    "name": "intron_variant",
    "text": "Intron variant",
    "value": 1627,
    "description": "A transcript variant occurring within an intron",
    "impact":"modifier"
}, {
    "name": "NMD_transcript_variant",
    "text": "NMD transcript variant",
    "value": 1621,
    "description": "A variant in a transcript that is the target of NMD",
    "impact":"modifier"
}, {
    "name": "non_coding_transcript variant",
    "text": "Non coding transcript variant",
    "value": 1619,
    "description": "A transcript variant of a non coding RNA gene",
    "impact":"modifier"
}, {
    "name": "upstream_gene_variant",
    "text": "Upstream gene variant",
    "value": 1631,
    "description": "A sequence variant located 5' of a gene",
    "impact":"modifier"
}, {
    "name": "downstream_gene_variant",
    "text": "Downstream gene variant",
    "value": 1632,
    "description": "A sequence variant located 3' of a gene",
    "impact":"modifier"
}, {
    "name": "TFBS_ablation",
    "text": "TFBS ablation",
    "value": 1895,
    "description": "A feature ablation whereby the deleted region includes a transcription factor binding site",
    "impact":"modifier"
}, {
    "name": "TFBS_amplification",
    "text": "TFBS amplification",
    "value": 1892,
    "description": "A feature amplification of a region containing a transcription factor binding site",
    "impact":"modifier"
}, {
    "name": "TF_binding_site variant",
    "text": "TF binding site variant",
    "value": 1782,
    "description": "A sequence variant located within a transcription factor binding site",
    "impact":"modifier"
}, {
    "name": "regulatory_region_ablation",
    "text": "Regulatory region ablation",
    "value": 1894,
    "description": "A feature ablation whereby the deleted region includes a regulatory region",
    "impact":"moderate"
}, {
    "name": "regulatory_region_amplification",
    "text": "Regulatory region amplification",
    "value": 1891,
    "description": "A feature amplification of a region containing a regulatory region",
    "impact":"modifier"
}, {
    "name": "feature_elongation",
    "text": "Feature elongation",
    "value": 1907,
    "description": "A sequence variant located within a regulatory region",
    "impact":"modifier"
}, {
    "name": "regulatory_region_variant",
    "text": "Regulatory region variant",
    "value": 1566,
    "description": "A sequence variant located within a regulatory region",
    "impact":"modifier"
}, {
    "name": "feature_truncation",
    "text": "Feature truncation",
    "value": 1906,
    "description": "A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence",
    "impact":"modifier"
}, {
    "name": "intergenic_variant",
    "text": "Intergenic variant",
    "value": 1628,
    "description": "A sequence variant located in the intergenic region, between genes",
    "impact":"modifier"
}, {
    "name": "initiator_codon_variant",
    "text": "Initiator codon variant",
    "value": 1582,
    "description": "A codon variant that changes at least one base of the first codon of a transcript",
    "impact":"modifier"
}, {
    "name": "incomplete_terminal_codon variant",
    "text": "Incomplete terminal codon variant",
    "value": 1626,
    "description": "A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed",
    "impact":"modifier"
}, {
    "name": "miRNA",
    "text": "MiRNA",
    "value": 276,
    "description": "Small, ~22-nt, RNA molecule that is the endogenous transcript of a miRNA gene (or the product of modifier non coding RNA genes. Micro RNAs are produced from precursor molecules (SO:0000647) that can form local hairpin structures, which ordinarily are processed (usually via the Dicer pathway) such that a single miRNA molecule accumulates from one arm of a hairpin precursor molecule. Micro RNAs may trigger the cleavage of their target molecules or act as translational repressors",
    "impact":"modifier"
}, {
    "name": "miRNA_target_site",
    "text": "MiRNA target site",
    "value": 934,
    "description": "A miRNA target site is a binding site where the molecule is a micro RNA",
    "impact":"modifier"
}, {
    "name": "exon_variant",
    "text": "Exon variant",
    "value": 1791,
    "description": "A miRNA target site is a binding site where the molecule is a micro RNA",
    "impact":"modifier"
}, {
    "name": "lincRNA",
    "text": "LincRNA",
    "value": 1463,
    "description": "A multiexonic non-coding RNA transcribed by RNA polymerase II",
    "impact":"modifier"
}, {
    "name": "5KB_downstream_variant",
    "text": "5KB downstream variant",
    "value": 1633,
    "description": "A sequence variant located within 5 KB of the end of a gene",
    "impact":"modifier"
}, {
    "name": "5KB_upstream_variant",
    "text": "5KB upstream variant",
    "value": 1635,
    "description": "A sequence variant located within 5KB 5' of a gene",
    "impact":"modifier"
}, {
    "name": "SNV",
    "text": "SNV",
    "value": 1483,
    "description": "SNVs are single nucleotide positions in genomic DNA at which different sequence alternatives exist",
    "impact":"modifier"
}, {
    "name": "SNP",
    "text": "SNP",
    "value": 694,
    "description": "SNPs are single base pair positions in genomic DNA at which different sequence alternatives exist in normal individuals in some population(s), wherein the least frequent variant has an abundance of 1% or greater",
    "impact":"modifier"
}, {
    "name": "RNA_polymerase_promoter",
    "text": "RNA polymerase promoter",
    "value": 1203,
    "description": "A region (DNA) to which RNA polymerase binds, to begin transcription",
    "impact":"modifier"
}, {
    "name": "CpG_island",
    "text": "CpG island",
    "value": 307,
    "description": "Regions of a few hundred to a few thousand bases in vertebrate genomes that are relatively GC and CpG rich; they are typically unmethylated and often found near the 5' ends of genes",
    "impact":"modifier"
}, {
    "name": "DNAseI_hypersensitive_site",
    "text": "DNAseI hypersensitive site",
    "value": 685,
    "description": "",
    "impact":"modifier"
}, {
    "name": "polypeptide_variation_site",
    "text": "Polypeptide variation site",
    "value": 336,
    "description": "A sequence that closely resembles a known functional gene, at anmodifier locus within a genome, that is non-functional as a consequence of (usually several) mutations that prevent either its transcription or translation (or both). In general, pseudogenes result from either reverse transcription of a transcript of their 'normal' paralog (SO:0000043) (in which case the pseudogene typically lacks introns and includes a poly(A) tail) or from recombination (SO:0000044) (in which case the pseudogene is typically a tandem duplication of its 'normal' paralog)",
    "impact":"modifier"
}];
