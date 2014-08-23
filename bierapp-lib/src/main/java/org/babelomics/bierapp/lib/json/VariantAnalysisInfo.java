package org.babelomics.bierapp.lib.json;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: aleman
 * Date: 9/28/13
 * Time: 9:01 AM
 * To change this template use File | Settings | File Templates.
 */
public class VariantAnalysisInfo {

    List<String> samples;
    Map<String, Integer> consequenceTypes;
    Map<String, Integer> biotypes;
    Map<String, Double> globalStats;
    Map<String, SampleStat> sampleStats;
    Map<String, Integer> chromosomes;

    public VariantAnalysisInfo() {
        samples = new ArrayList<>(5);
        consequenceTypes = new HashMap<>(50);
        biotypes = new LinkedHashMap<>(50);
        globalStats = new HashMap<>(20);
        sampleStats = new HashMap<>(5);
        chromosomes = new HashMap<>(25);

    }

    public List<String> getSamples() {
        return samples;
    }

    public void setSamples(List<String> samples) {
        this.samples = samples;
    }

    public Map<String, Integer> getConsequenceTypes() {
        return consequenceTypes;
    }

    public void setConsequenceTypes(Map<String, Integer> consequenceTypes) {
        this.consequenceTypes = consequenceTypes;
    }

    public Map<String, Integer> getBiotypes() {
        return biotypes;
    }

    public void setBiotypes(Map<String, Integer> biotypes) {
        this.biotypes = biotypes;
    }

    public void addSample(String sample) {
        this.samples.add(sample);
    }

    public void addConsequenceType(String ct) {
        int count = 0;
        if (consequenceTypes.containsKey(ct)) {
            count = consequenceTypes.get(ct);
        }

        count++;
        consequenceTypes.put(ct, count);
    }

    public void addBiotype(String bt) {
        if (bt.equals("")) {
            bt = ".";
        }
        int count = 0;
        if (biotypes.containsKey(bt)) {
            count = biotypes.get(bt);
        }

        count++;
        biotypes.put(bt, count);
    }

    public void addGlobalStats(String key, double value) {
        globalStats.put(key, value);

    }

    public void addSampleStats(String sample, int mendelianErrors, int missingGenotypes, int homozygotesNumber) {
        sampleStats.put(sample, new SampleStat(mendelianErrors, missingGenotypes, homozygotesNumber));

    }

    @Override
    public String toString() {
        return "VariantAnalysisInfo{" +
                "samples=" + samples +
                ", consequenceTypes=" + consequenceTypes +
                ", biotypes=" + biotypes +
                ", globalStats=" + globalStats +
                ", sampleStats=" + sampleStats +
                ", chromosomes=" + chromosomes +
                '}';
    }

    public void addBiotype(String bt, int count) {
        if (bt.equals("")) {
            bt = ".";
        }

        biotypes.put(bt, count);
    }

    public void addChromosome(String chromosome, int count) {
        chromosomes.put(chromosome, count);
    }

    public void addConsequenceType(String ct, int count) {
        consequenceTypes.put(ct, count);
    }

    public Map<String, Double> getGlobalStats() {
        return globalStats;
    }

    public void setGlobalStats(Map<String, Double> globalStats) {
        this.globalStats = globalStats;
    }

    public Map<String, SampleStat> getSampleStats() {
        return sampleStats;
    }

    public void setSampleStats(Map<String, SampleStat> sampleStats) {
        this.sampleStats = sampleStats;
    }

    public Map<String, Integer> getChromosomes() {
        return chromosomes;
    }

    public void setChromosomes(Map<String, Integer> chromosomes) {
        this.chromosomes = chromosomes;
    }

    private class SampleStat {
        int mendelianErrors;
        int missingGenotypes;
        int homozygotesNumber;

        private SampleStat(int mendelianErrors, int missingGenotypes, int homozygotesNumber) {
            this.mendelianErrors = mendelianErrors;
            this.missingGenotypes = missingGenotypes;
            this.homozygotesNumber = homozygotesNumber;
        }

        public SampleStat() {
        }
    }
}
