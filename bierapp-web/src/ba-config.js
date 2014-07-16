//CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";
CELLBASE_HOST = "http://www.ebi.ac.uk/cellbase/webservices/rest";
CELLBASE_VERSION = "v3";
OPENCGA_HOST = "http://ws-beta.bioinfo.cipf.es/opencga-staging/rest";

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
    OPENCGA_HOST = "http://ws-beta.bioinfo.cipf.es/opencga-staging/rest";
}

CELLBASE_HOST_OLD = "http://ws-beta.bioinfo.cipf.es/cellbase-staging/rest";


var POPULAR_SPECIES = ["Homo sapiens", "Mus musculus", "Danio rerio", "Drosophila melanogaster", "Saccharomyces cerevisiae", "Plasmodium falciparum", "Arabidopsis thaliana", "Citrus Clementina"];


SUITE_INFO = '<div style=" width:800px;">'
    + '<p style="font-size:30px;color:white">Overview</p><p style="text-align:justify">Welcome to the gene/variant prioritization tool of the BIER (the Team of BioInformatic for Rare Diseases). This interactive tool allows finding genes  affected by deleterious variants that segregate along family pedigrees , case-controls or sporadic samples .</p>'
    + '<p style="font-size:30px;color:white">Try an Example</p><p style="text-align:justify">Here you can try all the filtering options and discover the gene affected in a test family.</p>'
    + '<p style="font-size:30px;color:white">Analyze your own families or case-control data</p><p style="text-align:justify">Here you can upload your VCF file containing the exomes to be analyzed. Define the thresholds of allele frequencies, pathogenicity, conservation; the type of variants sought; and define the type of inheritance and the segregation schema along the family.</p>'

    + '<p style="color:white">Supported by</p><p style="text-align:justify;">'
    + '<img style="margin:3px;height:67px;" src="http://bioinfo.cipf.es/bierwiki/lib/tpl/arctic/images/logobier.jpg"/>'
    + '<img style="margin:3px;height:67px;" src="http://www2.iib.uam.es/ivarela_lab/imagenes/logo_ciberer.jpg"/>'
    + '<img style="margin:3px;height:67px;" src="http://www.cipf.es/CIPF_THEME/CIPF_THEME/images/logo_cipf.png"/>'
    + '<img style="margin:3px;height:67px;" src="http://bioinfo.cipf.es/babeltrac/chrome/site/babeltitle200.gif"/>'
    + '<img style="margin:3px;height:67px;" src="http://img2.mailchimp.com/2009/03/25/1efbf9c6a8/LOGO_Micinn_Isciii.jpg"/>'
    + '</p>'

    + '<p style="color:white">Note</p><p style="text-align:justify;font-size: 16px">This web application makes an intensive use of new web technologies and standards like HTML5, so browsers that are fully supported for this site are: Chrome 14+, Firefox 7+, Safari 5+ and Opera 11+. Older browser like Chrome13-, Firefox 5- or Internet Explorer 9 may rise some errors. Internet Explorer 6 and 7 are no supported at all.</p>'
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

consequenceTypes = [
    {
        name:'Transcript Variant',
        cls: "parent",
        expanded: true,
        leaf: false,
        checked:false,
        iconCls :'no-icon',
        children:[{
            name: 'Coding Variant',
            cls: "parent",
            leaf: false ,
            iconCls :'no-icon',
            expanded: true,
            checked:false,
            children: [
                {acc: 'SO:0001587', name: 'stop_gained', qtip: 'A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcript',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001578', name: 'stop_lost', qtip: 'A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001821', name: 'inframe_insertion', qtip: 'An inframe non synonymous variant that inserts bases into in the coding sequence',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001822', name: 'inframe_deletion', qtip: 'An inframe non synonymous variant that deletes bases from the coding sequence',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001589', name: 'frameshift_variant', qtip: 'A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001621', name: 'NMD_transcript_variant', qtip: 'A variant in a transcript that is the target of NMD',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001582', name: 'initiator_codon_variant', qtip: 'A codon variant that changes at least one base of the first codon of a transcript',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001626', name: 'incomplete_terminal_codon_variant', qtip: 'A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001583', name: 'missense_variant', qtip: 'A sequence variant, that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001819', name: 'synonymous_variant', qtip: 'A sequence variant where there is no resulting change to the encoded amino acid',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001567', name: 'stop_retained_variant', qtip: 'A sequence variant where at least one base in the terminator codon is changed, but the terminator remains',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001580', name: 'coding_sequence_variant', qtip: 'A sequence variant that changes the coding sequence',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001907', name: 'feature_elongation', qtip: 'A sequence variant that causes the extension of a genomic feature, with regard to the reference sequence',leaf: true,checked: false,  iconCls :'no-icon' },
                {acc: 'SO:0001906', name: 'feature_truncation', qtip: 'A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence',leaf: true,checked: false,  iconCls :'no-icon' }

            ]
        },
            {

                name: 'Non-coding Variant',
                cls: "parent",
                leaf: false ,
                iconCls :'no-icon',
                expanded: true,
                checked:false,
                children: [
                    {acc: 'SO:0001623', name: '5_prime_UTR_variant', qtip: 'A UTR variant of the 5\' UTR',leaf: true,checked: false,  iconCls :'no-icon'},
                    {acc: 'SO:0001624', name: '3_prime_UTR_variant', qtip: 'A UTR variant of the 3\' UTR',leaf: true, checked: false,  iconCls :'no-icon'},
                    {acc: 'SO:0001792', name: 'non_coding_exon_variant', qtip: 'A sequence variant that changes non-coding exon sequence',leaf: true,checked: false,  iconCls :'no-icon' },
                    {acc: 'SO:0001619', name: 'nc_transcript_variant', qtip: 'A transcript variant of a non coding RNA',leaf: true,checked: false,  iconCls :'no-icon' },
                    {acc: 'SO:0001627', name: 'intron_variant', qtip: 'A transcript variant occurring within an intron',leaf: true,checked: false,  iconCls :'no-icon' }

                ]

            },
            {

                name: 'Splice Variant',
                cls: "parent",
                leaf: false ,
                iconCls :'no-icon',
                expanded: true,
                checked:false,
                children: [
                    {acc: 'SO:0001575', name: 'splice_donor_variant', qtip: 'A splice variant that changes the 2 base region at the 5\' end of an intron',leaf: true,checked: false,  iconCls :'no-icon' },
                    {acc: 'SO:0001574', name: 'splice_acceptor_variant', qtip: 'A splice variant that changes the 2 base region at the 3\' end of an intron',leaf: true,checked: false,  iconCls :'no-icon' },
                    {acc: 'SO:0001630', name: 'splice_region_variant', qtip: 'A sequence variant in which a change has occurred within the region of the splice site, either within 1-3 bases of the exon or 3-8 bases of the intron',leaf: true,checked: false,  iconCls :'no-icon' }

                ]

            },

            {acc: 'SO:0001893', name: 'transcript_ablation', qtip: 'A feature ablation whereby the deleted region includes a transcript feature',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001889', name: 'transcript_amplification', qtip: 'A feature amplification of a region containing a transcript',leaf: true,checked: false,  iconCls :'no-icon' }

        ]

    },
    {
        name:'Regulatory Variant ',
        cls: "parent",
        expanded: true,
        leaf: false,
        checked:false,
        iconCls :'no-icon',
        children: [
            {acc: 'SO:0001782', name: 'TF_binding_site_variant', qtip: 'A sequence variant located within a transcription factor binding site',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001895', name: 'TFBS_ablation', qtip: 'A feature ablation whereby the deleted region includes a transcription factor binding site',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001892', name: 'TFBS_amplification', qtip: 'A feature amplification of a region containing a transcription factor binding site',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001620', name: 'mature_miRNA_variant', qtip: 'A transcript variant located with the sequence of the mature miRNA',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001566', name: 'regulatory_region_variant', qtip: 'A sequence variant located within a regulatory region',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001894', name: 'regulatory_region_ablation', qtip: 'A feature ablation whereby the deleted region includes a regulatory region',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001891', name: 'regulatory_region_amplification', qtip: 'A feature amplification of a region containing a regulatory region',leaf: true,checked: false,  iconCls :'no-icon' }
        ]
    },
    {
        name:'Intergenic Variant',
        cls: "parent",
        expanded: true,
        leaf: false,
        checked:false,
        iconCls :'no-icon',
        children: [
            {acc: 'SO:0001631', name: 'upstream_gene_variant', qtip: 'A sequence variant located 5\' of a gene',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001632', name: 'downstream_gene_variant', qtip: 'A sequence variant located 3\' of a gene',leaf: true,checked: false,  iconCls :'no-icon' },
            {acc: 'SO:0001628', name: 'intergenic_variant', qtip: 'A sequence variant located in the intergenic region, between genes',leaf: true,checked: false,  iconCls :'no-icon' }
        ]
    }

];



bierappColumns = [
    {
        text: "SNP Id",
        dataIndex: 'id'
    },
    {
        text: "Chromosome",
        dataIndex: 'chromosome'
    },
    {
        text: 'Position',
        dataIndex: 'start'
    },
    //{
    //text: 'End',
    //dataIndex: 'end'
    //},
    {
        text: 'Aleles',
        xtype: "templatecolumn",
        tpl: "{reference}>{alternate}"
    },
    {
        text: 'Class',
        dataIndex: 'type'
    },
    {
        text: '1000G MAF',
        dataIndex: ''
    },
    {
        text: 'Consequence Type',
        dataIndex: 'ct'
    },
    {
        text: 'Gene',
        dataIndex: 'gene'
    },
    {
        text: 'HGVS Names',
        dataIndex: 'hgvs_name'
    },
    {
        text: 'View',
        //dataIndex: 'id',
        xtype: 'templatecolumn',
        tpl: '<tpl if="id"><a href="?variantID={id}" target="_blank"><img class="eva-grid-img" src="img/eva_logo.png"/></a>&nbsp;' +
            '<a href="http://www.ensembl.org/Homo_sapiens/Variation/Explore?vdb=variation;v={id}" target="_blank"><img alt="" src="http://static.ensembl.org/i/search/ensembl.gif"></a>' +
            '&nbsp;<a href="http://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?searchType=adhoc_search&type=rs&rs={id}" target="_blank"><span>dbSNP</span></a>' +
            '<tpl else><a href="?variantID={chromosome}:{start}:{ref}:{alt}" target="_blank"><img class="eva-grid-img" src="img/eva_logo.png"/></a>&nbsp;<img alt="" class="in-active" src="http://static.ensembl.org/i/search/ensembl.gif">&nbsp;<span  style="opacity:0.2" class="in-active">dbSNP</span></tpl>'
    }

    //
];

bierappAttributes = [
    {name: 'id', type: 'string'},
    {name: "chromosome", type: "string"},
    {name: "start", type: "int"},
    {name: "end", type: "int"},
    {name: "type", type: "string"},
    {name: "ref", type: "string"},
    {name: "alt", type: "string"},
    {name: 'hgvs_name', type: 'string'},
];
