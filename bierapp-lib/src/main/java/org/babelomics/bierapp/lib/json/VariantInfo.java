package org.babelomics.bierapp.lib.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.opencb.commons.bioformats.variant.json.VariantControl;
import org.opencb.commons.bioformats.variant.utils.effect.VariantEffect;
import org.opencb.commons.bioformats.variant.utils.stats.VariantStats;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: aleman
 * Date: 9/10/13
 * Time: 8:35 PM
 * To change this template use File | Settings | File Templates.
 */
public class VariantInfo {

    @JsonProperty
    HashMap<String, VariantControl> controls;
    @JsonProperty
    private String chromosome;
    @JsonProperty
    private int position;
    @JsonProperty
    private String ref;
    @JsonProperty
    private String alt;
    @JsonProperty
    private String geneName;
    @JsonProperty
    private double stats_maf;
    @JsonProperty
    private double stats_mgf;
    @JsonProperty
    private String stats_allele_maf;
    @JsonProperty
    private String stats_genotype_maf;
    @JsonProperty
    private int stats_miss_allele;
    @JsonProperty
    private int stats_miss_gt;
    @JsonProperty
    private int stats_mendel_err;
    @JsonProperty
    private boolean stats_is_indel;
    @JsonProperty
    private double stats_cases_percent_dominant;
    @JsonProperty
    private double stats_controls_percent_dominant;
    @JsonProperty
    private double stats_cases_percent_recessive;
    @JsonProperty
    private double stats_controls_percent_recessive;
    @JsonProperty
    private String snpid;
    @JsonProperty
    private Set<String> genes;
    @JsonProperty
    private Set<String> consequence_types;
    @JsonProperty
    private Set<VariantEffect> effect;
    @JsonProperty
    private HashMap<String, String> sampleGenotypes;
    @JsonProperty
    private Map<String, Integer> genotypes;
    @JsonProperty
    private double polyphen_score;
    @JsonProperty
    private double sift_score;
    @JsonProperty
    private int polyphen_effect;
    @JsonProperty
    private int sift_effect;

    public VariantInfo() {
        this("", -1, "", "");
    }

    public VariantInfo(String chromosome, int position, String ref, String alt) {
        this.chromosome = chromosome;
        this.position = position;
        this.ref = ref;
        this.alt = alt;
        this.effect = new HashSet<>();
        this.genes = new HashSet<>();
        this.consequence_types = new HashSet<>();
        this.sampleGenotypes = new LinkedHashMap<>();
        this.controls = new LinkedHashMap<>();
        this.genotypes = new LinkedHashMap<>();


    }

    public VariantInfo(String chromosome, int position, String ref, String alt, VariantStats stats) {
        this(chromosome, position, ref, alt);
        this.addStats(stats);


    }

    public void addStats(VariantStats stat) {

        this.stats_maf = stat.getMaf();
        this.stats_mgf = stat.getMgf();
        this.stats_allele_maf = stat.getMafAllele();
        this.stats_genotype_maf = stat.getMgfAllele();
        this.stats_miss_allele = stat.getMissingAlleles();
        this.stats_miss_gt = stat.getMissingGenotypes();
        this.stats_mendel_err = stat.getMendelinanErrors();
        this.stats_is_indel = stat.isIndel();
        this.stats_cases_percent_dominant = stat.getCasesPercentDominant();
        this.stats_controls_percent_dominant = stat.getControlsPercentDominant();
        this.stats_cases_percent_recessive = stat.getCasesPercentRecessive();
        this.stats_controls_percent_recessive = stat.getControlsPercentRecessive();
        if (this.snpid == null && stat.getId() != null) {
            this.snpid = stat.getId();
        }
    }

    public Set<VariantEffect> getEffect() {
        return effect;
    }

    public void setEffect(Set<VariantEffect> effect) {
        this.effect = effect;
    }

    public boolean addEffect(VariantEffect ve) {
        return this.effect.add(ve);


    }

    public String getChromosome() {
        return chromosome;
    }

    public void setChromosome(String chromosome) {
        this.chromosome = chromosome;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public double getStats_maf() {
        return stats_maf;
    }

    public void setStats_maf(double stats_maf) {
        this.stats_maf = stats_maf;
    }

    public double getStats_mgf() {
        return stats_mgf;
    }

    public void setStats_mgf(double stats_mgf) {
        this.stats_mgf = stats_mgf;
    }

    public String getStats_allele_maf() {
        return stats_allele_maf;
    }

    public void setStats_allele_maf(String stats_allele_maf) {
        this.stats_allele_maf = stats_allele_maf;
    }

    public String getStats_genotype_maf() {
        return stats_genotype_maf;
    }

    public void setStats_genotype_maf(String stats_genotype_maf) {
        this.stats_genotype_maf = stats_genotype_maf;
    }

    public int getStats_miss_allele() {
        return stats_miss_allele;
    }

    public void setStats_miss_allele(int stats_miss_allele) {
        this.stats_miss_allele = stats_miss_allele;
    }

    public int getStats_miss_gt() {
        return stats_miss_gt;
    }

    public void setStats_miss_gt(int stats_miss_gt) {
        this.stats_miss_gt = stats_miss_gt;
    }

    public int getStats_mendel_err() {
        return stats_mendel_err;
    }

    public void setStats_mendel_err(int stats_mendel_err) {
        this.stats_mendel_err = stats_mendel_err;
    }

    public boolean isStats_is_indel() {
        return stats_is_indel;
    }

    public void setStats_is_indel(boolean stats_is_indel) {
        this.stats_is_indel = stats_is_indel;
    }

    public double getStats_cases_percent_dominant() {
        return stats_cases_percent_dominant;
    }

    public void setStats_cases_percent_dominant(double stats_cases_percent_dominant) {
        this.stats_cases_percent_dominant = stats_cases_percent_dominant;
    }

    public double getStats_controls_percent_dominant() {
        return stats_controls_percent_dominant;
    }

    public void setStats_controls_percent_dominant(double stats_controls_percent_dominant) {
        this.stats_controls_percent_dominant = stats_controls_percent_dominant;
    }

    public double getStats_cases_percent_recessive() {
        return stats_cases_percent_recessive;
    }

    public void setStats_cases_percent_recessive(double stats_cases_percent_recessive) {
        this.stats_cases_percent_recessive = stats_cases_percent_recessive;
    }

    public double getStats_controls_percent_recessive() {
        return stats_controls_percent_recessive;
    }

    public void setStats_controls_percent_recessive(double stats_controls_percent_recessive) {
        this.stats_controls_percent_recessive = stats_controls_percent_recessive;
    }

    public HashMap<String, String> getSampleGenotypes() {
        return sampleGenotypes;
    }

    public void setSampleGenotypes(HashMap<String, String> sampleGenotypes) {
        this.sampleGenotypes = sampleGenotypes;
    }

    public void addSammpleGenotype(String sample, String gt) {
        this.sampleGenotypes.put(sample, gt);
    }

    public void addControl(String key, String value) {

        if (!key.contains("_")) {
            return;
        }
        String[] fields = key.split("_");
        String controlName = fields[0];
        String controlType = fields[1];
        VariantControl vc;

        if (!controls.containsKey(controlName)) {
            vc = new VariantControl();
            controls.put(controlName, vc);

        } else {
            vc = controls.get(controlName);
        }

        switch (controlType) {
            case "maf":
                vc.setMaf(Float.parseFloat(value));
                break;
            case "amaf":
                vc.setAllele(value);
                break;
        }


    }

    public HashMap<String, VariantControl> getControls() {
        return controls;
    }

    public void setControls(HashMap<String, VariantControl> controls) {
        this.controls = controls;
    }

    public Map<String, Integer> getGenotypes() {
        return genotypes;
    }

    public void setGenotypes(Map<String, Integer> genotypes) {
        this.genotypes = genotypes;
    }

    public void addGenotype(String gt, int count) {
        this.genotypes.put(gt, count);
    }

    @Override
    public String toString() {
        return "VariantInfo{" +
                "chromosome='" + chromosome + '\'' +
                ", position=" + position +
                ", ref='" + ref + '\'' +
                ", alt='" + alt + '\'' +
                ", geneName='" + geneName + '\'' +
                ", stats_maf=" + stats_maf +
                ", stats_mgf=" + stats_mgf +
                ", stats_allele_maf='" + stats_allele_maf + '\'' +
                ", stats_genotype_maf='" + stats_genotype_maf + '\'' +
                ", stats_miss_allele=" + stats_miss_allele +
                ", stats_miss_gt=" + stats_miss_gt +
                ", stats_mendel_err=" + stats_mendel_err +
                ", stats_is_indel=" + stats_is_indel +
                ", stats_cases_percent_dominant=" + stats_cases_percent_dominant +
                ", stats_controls_percent_dominant=" + stats_controls_percent_dominant +
                ", stats_cases_percent_recessive=" + stats_cases_percent_recessive +
                ", stats_controls_percent_recessive=" + stats_controls_percent_recessive +
                ", snpid='" + snpid + '\'' +
                ", genes=" + genes +
                ", controls=" + controls +
                ", effect=" + effect +
                ", sampleGenotypes=" + sampleGenotypes +
                '}';
    }

    public void addGenotypes(String genotypes) {
        String[] splits = genotypes.split(",");
        String[] aux;
        for (String split : splits) {
            aux = split.split(":");
            this.addGenotype(aux[0], Integer.parseInt(aux[1]));
        }
    }

    public void addGenes(String genes) {
        String[] splits = genes.split(",");
        String[] aux;
        for (String split : splits) {
            this.genes.add(split);
        }
    }

    public void addConsequenceTypes(String conseqType) {
        String[] splits = conseqType.split(",");
        String[] aux;
        for (String split : splits) {
            this.consequence_types.add(split);
        }
    }

    public double getPolyphen_score() {
        return polyphen_score;
    }

    public void setPolyphen_score(double polyphen_score) {
        this.polyphen_score = polyphen_score;
    }

    public double getSift_score() {
        return sift_score;
    }

    public void setSift_score(double sift_score) {
        this.sift_score = sift_score;
    }

    public int getPolyphen_effect() {
        return polyphen_effect;
    }

    public void setPolyphen_effect(int polyphen_effect) {
        this.polyphen_effect = polyphen_effect;
    }

    public int getSift_effect() {
        return sift_effect;
    }

    public void setSift_effect(int sift_effect) {
        this.sift_effect = sift_effect;
    }

    public String getSnpid() {
        return snpid;
    }

    public void setSnpid(String snpid) {
        this.snpid = snpid;
    }

    public String getGeneName() {
        return geneName;
    }

    public void setGeneName(String geneName) {
        this.geneName = geneName;
    }
}
