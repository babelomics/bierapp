//CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";
CELLBASE_HOST = "http://www.ebi.ac.uk/cellbase/webservices/rest";
CELLBASE_VERSION = "v3";
OPENCGA_HOST = "http://ws-beta.bioinfo.cipf.es/opencga-staging/rest";
BIERAPP_HOST = "http://ws-beta.bioinfo.cipf.es/bierapp-staging/rest";
BIERAPP_VERSION = "1.4.1"

if (
    window.location.host.indexOf("localhost") != -1 ||
    window.location.host.indexOf("fsalavert") != -1 ||
    window.location.host.indexOf("rsanchez") != -1 ||
    window.location.host.indexOf("imedina") != -1 ||
    window.location.host.indexOf("aaleman") != -1 ||
    window.location.protocol === "file:"
    ) {

    //CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";
    CELLBASE_HOST = "http://www.ebi.ac.uk/cellbase/webservices/rest";
    OPENCGA_HOST = "http://localhost:8080/opencga/rest";
}

CELLBASE_HOST_OLD = "http://ws-beta.bioinfo.cipf.es/cellbase-staging/rest";


var POPULAR_SPECIES = ["Homo sapiens", "Mus musculus", "Danio rerio", "Drosophila melanogaster", "Saccharomyces cerevisiae", "Plasmodium falciparum", "Arabidopsis thaliana", "Citrus Clementina"];


SUITE_INFO = '<div class="bierapp-info">'
    + '<p style="font-size:30px;color:white">Overview</p><p class="bierapp-paragraph">Welcome to the gene/variant prioritization tool of the BIER (the Team of BioInformatic for Rare Diseases). This interactive tool allows finding genes  affected by deleterious variants that segregate along family pedigrees , case-controls or sporadic samples .</p>'
    + '<p style="font-size:30px;color:white">Try an Example</p><p class="bierapp-paragraph">Here you can try all the filtering options and discover the gene affected in a test family.</p>'
    + '<p style="font-size:30px;color:white">Analyze your own families or case-control data</p><p class="bierapp-paragraph">Here you can upload your VCF file containing the exomes to be analyzed. Define the thresholds of allele frequencies, pathogenicity, conservation; the type of variants sought; and define the type of inheritance and the segregation schema along the family.</p>'

    + '<p style="color:white">Supported by</p><p style="text-align:justify;">'
    + '<img style="margin:3px;height:67px;" src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg"/>'
    + '<img style="margin:3px;height:67px;" src="http://www2.iib.uam.es/ivarela_lab/imagenes/logo_ciberer.jpg"/>'
    + '<img style="margin:3px;height:67px;" src="http://www.cipf.es/CIPF_THEME/CIPF_THEME/images/logo_cipf.png"/>'
    + '<img style="margin:3px;height:67px;" src="http://bioinfo.cipf.es/sites/bioinfo.cipf.es/files/image/tools/babeltitle200.gif"/>'
    + '<img style="margin:3px;height:67px;" src="http://img2.mailchimp.com/2009/03/25/1efbf9c6a8/LOGO_Micinn_Isciii.jpg"/>'
    + '</p>'

    + '<p style="color:white">Note</p><p style="text-align:justify;font-size: 16px">This web application makes an intensive use of new web technologies and standards like HTML5, so browsers that are fully supported for this site are: Chrome 14+, Firefox 7+, Safari 5+ and Opera 11+. Older browser like Chrome13-, Firefox 5- or Internet Explorer 9 may rise some errors. Internet Explorer 6 and 7 are no supported at all.</p>'
    + '</div>';

BIERAPP_ABOUT = '<div class="bierapp-about">'
    + '<p style="font-size:30px;color:white">About</p>'
    + '<p class="bierapp-paragraph">BiERApp is an interactive tool that allows finding genes affected by deleterious variants that segregate along family pedigrees, case-controls or sporadic samples. BiERApp has built with open and free technologies like HTML5 and Javascript.</p>'
    + '<p class="bierapp-paragraph">BierApp project is a joint development of the BiER and the Computational Genomics Program, in the Systems Genomics Laboratory at CIPF in Valencia, Spain.</p>'
    + '<p class="bierapp-paragraph">For more information please visit our web page <a style="color:white" href="http://bioinfo.cipf.es">http://bioinfo.cipf.es</a></p>'
    + '<p style="text-align:justify;">'
    + '</p>'
    + '</div>';

var AVAILABLE_SPECIES = {
    "text": "Species",
    "items": [
        {
            "text": "Vertebrates",
            "items": [
                {"text": "Bos taurus", "assembly": "UMD3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Canis familiaris", "assembly": "CanFam3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Ciona intestinalis", "assembly": "KH", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Danio rerio", "assembly": "Zv9", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Equus caballus", "assembly": "EquCab2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Felis catus", "assembly": "Felis_catus_6.2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "C1", "C2", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "F1", "F2", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Gallus gallus", "assembly": "Galgal4", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "32", "W", "Z", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Gorilla gorilla", "assembly": "gorGor3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889611, "end": 32973805}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889599, "end": 32889739}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "20", "start": 32878277, "end": 32878277}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                //                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "1", "start": 32877109, "end": 32882337}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Macaca mulatta", "assembly": "MMUL_1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Mus musculus", "assembly": "GRCm38.p1", "region": {"chromosome": "1", "start": 18422009, "end": 18422009}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Oryctolagus cuniculus", "assembly": "oryCun2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Pan troglodytes", "assembly": "CHIMP2.1.4", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2A", "2B", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Pongo abelii", "assembly": "PPYG2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Un", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Rattus norvegicus", "assembly": "Rnor_5.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"},
                {"text": "Sus scrofa", "assembly": "Sscrofa10.2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-71/"}
            ]
        },
        {
            "text": "Metazoa",
            "items": [
                {"text": "Anopheles gambiae", "assembly": "AgamP3", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
                {"text": "Caenorhabditis elegans", "assembly": "WBcel235", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "X", "MtDNA"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/fasta/"},
                {"text": "Drosophila melanogaster", "assembly": "BDGP5", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2LHet", "2R", "2RHet", "3L", "3LHet", "3R", "3RHet", "4", "U", "Uextra", "X", "XHet", "YHet", "dmel_mitochondrion_genome"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
                {"text": "Drosophila simulans", "assembly": "WUGSC1", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "4", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
                {"text": "Drosophila yakuba", "assembly": "dyak_r1.3", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "4", "chr2h", "chr3h", "chrXh", "chrYh", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"}
            ]
        },
        {
            "text": "Fungi",
            "items": [
                {"text": "Aspergillus fumigatus", "assembly": "CADRE", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "MT"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Aspergillus nidulans", "assembly": "ASM1142v1", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Aspergillus niger", "assembly": "CADRE", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Aspergillus oryzae", "assembly": "CADRE2", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Saccharomyces cerevisiae", "assembly": "SacCer_Apr2011", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "Mito"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Schizosaccharomyces pombe", "assembly": "ASM294v1", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["AB325691", "I", "II", "III", "MT", "MTR"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"}
            ]
        },
        {
            "text": "Protist",
            "items": [
                {"text": "Leishmania major", "assembly": "ASM272v2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"], "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"},
                {"text": "Plasmodium falciparum", "assembly": "ASM276v1", "region": {"chromosome": "01", "start": 1000000, "end": 1000000}, "chromosomes": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"], "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"}
            ]
        },
        {
            "text": "Plants",
            "items": [
                {"text": "Arabidopsis lyrata", "assembly": "v.1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Arabidopsis thaliana", "assembly": "TAIR10", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "Mt", "Pt"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Brachypodium distachyon", "assembly": "v1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Glycine max", "assembly": "V1.0", "region": {"chromosome": "Gm01", "start": 1000000, "end": 1000000}, "chromosomes": ["Gm01", "Gm02", "Gm03", "Gm04", "Gm05", "Gm06", "Gm07", "Gm08", "Gm09", "Gm10", "Gm11", "Gm12", "Gm13", "Gm14", "Gm15", "Gm16", "Gm17", "Gm18", "Gm19", "Gm20"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Oryza sativa", "assembly": "MSU6", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Mt", "Pt", "Sy", "Un"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Vitis vinifera", "assembly": "IGGP_12x", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "Un"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Zea mays", "assembly": "AGPv3", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Mt", "Pt"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"}
                //                  {"text": "Citrus Clementina", "assembly": "1.0", "region":{"chromosome":"scaffold_1","start":233423,"end":236969},   "chromosomes": [], "url": ""}
            ]
        }
    ]
};


/** Reference to a species from the list to be shown at start **/
var DEFAULT_SPECIES = AVAILABLE_SPECIES.items[0].items[8];

//bierappColumns = [
//    {
//        text: "SNP Id",
//        dataIndex: 'id'
//    },
//    {
//        text: "Chromosome",
//        dataIndex: 'chromosome'
//    },
//    {
//        text: 'Position',
//        dataIndex: 'start'
//    },
//    //{
//    //text: 'End',
//    //dataIndex: 'end'
//    //},
//    {
//        text: 'Aleles',
//        xtype: "templatecolumn",
//        tpl: "{reference}>{alternate}"
//    },
//    {
//        text: 'Class',
//        dataIndex: 'type'
//    },
//    {
//        text: '1000G MAF',
//        dataIndex: ''
//    },
//    {
//        text: 'Consequence Type',
//        dataIndex: 'ct'
//    },
//    {
//        text: 'Gene',
//        dataIndex: 'gene'
//    },
//    {
//        text: 'HGVS Names',
//        dataIndex: 'hgvs_name'
//    },
//    {
//        text: 'View',
//        //dataIndex: 'id',
//        xtype: 'templatecolumn',
//        tpl: '<tpl if="id"><a href="?variantID={id}" target="_blank"><img class="eva-grid-img" src="img/eva_logo.png"/></a>&nbsp;' +
//            '<a href="http://www.ensembl.org/Homo_sapiens/Variation/Explore?vdb=variation;v={id}" target="_blank"><img alt="" src="http://static.ensembl.org/i/search/ensembl.gif"></a>' +
//            '&nbsp;<a href="http://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?searchType=adhoc_search&type=rs&rs={id}" target="_blank"><span>dbSNP</span></a>' +
//            '<tpl else><a href="?variantID={chromosome}:{start}:{ref}:{alt}" target="_blank"><img class="eva-grid-img" src="img/eva_logo.png"/></a>&nbsp;<img alt="" class="in-active" src="http://static.ensembl.org/i/search/ensembl.gif">&nbsp;<span  style="opacity:0.2" class="in-active">dbSNP</span></tpl>'
//    }
//
//    //
//];

bierappXtmplPoly = new Ext.XTemplate(
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
bierappXtmplSift = new Ext.XTemplate(
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

bierappParseMafControl = function (control) {
    var maf = control.maf;
    var res = maf.toFixed(3);
    if (control.allele != "") {
        res = res + " (" + control.allele + ")";
    }
    return res;
};


bierappColumns = [
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
            width: 100
        },
        columns: [
            {
                text: "1000G",
                renderer: function (val, meta, record) {
                    if (record.data.controls["1000G"]) {
                        return bierappParseMafControl(record.data.controls["1000G"]);
                    } else {
                        return ".";
                    }
                }
            },
            {
                text: "1000G-AFR",
                renderer: function (val, meta, record) {
                    if (record.data.controls["1000G-AFR"]) {
                        return bierappParseMafControl(record.data.controls["1000G-AFR"]);
                    } else {
                        return ".";
                    }
                }
            },
            {
                text: "1000G-ASI",
                renderer: function (val, meta, record) {
                    if (record.data.controls["1000G-ASI"]) {
                        return bierappParseMafControl(record.data.controls["1000G-ASI"]);

                    } else {
                        return ".";
                    }
                }
            },
            {
                text: "1000G-AME",
                renderer: function (val, meta, record) {
                    if (record.data.controls["1000G-AME"]) {
                        return bierappParseMafControl(record.data.controls["1000G-AME"]);
                    } else {
                        return ".";
                    }
                }
            },
            {
                text: "1000G-EUR",
                renderer: function (val, meta, record) {
                    if (record.data.controls["1000G-EUR"]) {
                        return bierappParseMafControl(record.data.controls["1000G-EUR"]);
                    } else {
                        return ".";
                    }
                }
            },
            {
                text: "EVS",
                renderer: function (val, meta, record) {
                    if (record.data.controls["EVS"]) {
                        return bierappParseMafControl(record.data.controls["EVS"]);
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
        tpl: bierappXtmplPoly,
        sortable: false
    },
    {
        text: 'SIFT',
        flex: 1,
        dataIndex: 'sift_score',
        xtype: "templatecolumn",
        tpl: bierappXtmplSift,
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
