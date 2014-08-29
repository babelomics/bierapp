package org.babelomics.bierapp.lib.storage;

import au.com.bytecode.opencsv.CSVWriter;
import org.opencb.commons.bioformats.variant.Variant;
import org.opencb.commons.bioformats.variant.VariantSource;
import org.opencb.commons.bioformats.variant.vcf4.io.writers.VariantWriter;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class VariantBierAppCSVDataWriter implements VariantWriter {

    private VariantSource source;

    private CSVWriter csvWriter;
    private char separator;
    private char quotechar;
    private String output;

    public VariantBierAppCSVDataWriter(VariantSource source, String output, char separator, char quotechar) {
        this.source = source;
        this.output = output;
        this.separator = separator;
        this.quotechar = quotechar;
    }

    public VariantBierAppCSVDataWriter(VariantSource source, String output) {
        this(source, output, '\t', '\0');
    }

    @Override
    public void includeStats(boolean b) {
    }

    @Override
    public void includeSamples(boolean b) {

    }

    @Override
    public void includeEffect(boolean b) {

    }

    @Override
    public boolean open() {

        boolean res = true;
        try {
            csvWriter = new CSVWriter(new FileWriter(this.output), separator, quotechar);
        } catch (IOException e) {
            e.printStackTrace();
            res = false;
        }
        return res;
    }

    @Override
    public boolean close() {
        boolean res = true;
        try {
            csvWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
            res = false;
        }
        return res;
    }

    @Override
    public boolean pre() {

        boolean res = true;
        List<String> header = new ArrayList<>();
        header.add("Variant");
        header.add("Alleles");
        header.add("Gene");
        header.addAll(source.getSamples());
        header.add("SNP id");
        header.add("1000G");
        header.add("1000G-AFR");
        header.add("1000G-ASI");
        header.add("1000G-AME");
        header.add("1000G-EUR");
        header.add("EVS");
        header.add("BIER");
        header.add("Consequence Type");
        header.add("Polyphen");
        header.add("SIFT");
        header.add("Phenotype");

        csvWriter.writeNext(header.toArray(new String[header.size()]));
        return res;
    }

    @Override
    public boolean post() {
        return false;
    }

    @Override
    public boolean write(Variant variant) {
        boolean res = true;

        List<String> data = new ArrayList<>();
        data.add(variant.getChromosome() + ":" + variant.getPosition());
        data.add(variant.getReference() + ">" + variant.getAlternate());
        data.add(getAttribute(variant.getAttributes(), "GeneNames"));

        for (String sampleName : variant.getSampleNames()) {
            String gt = variant.getSampleData(sampleName, "GT");
            data.add(gt);
        }

        data.add(variant.getId());

        data.add(getControl(variant.getAttributes(), "1000G"));
        data.add(getControl(variant.getAttributes(), "1000G_AFR"));
        data.add(getControl(variant.getAttributes(), "1000G_ASI"));
        data.add(getControl(variant.getAttributes(), "1000G_AME"));
        data.add(getControl(variant.getAttributes(), "1000G_EUR"));
        data.add(getControl(variant.getAttributes(), "EVS"));
        data.add(getControl(variant.getAttributes(), "BIER"));


        data.add(getAttribute(variant.getAttributes(), "ConsType"));
        data.add(getPolyphen(variant.getAttributes()));
        data.add(getSift(variant.getAttributes()));
        data.add(getAttribute(variant.getAttributes(), "phenotype"));

        csvWriter.writeNext(data.toArray(new String[data.size()]));

        return res;
    }

    private String getAttribute(Map<String, String> attributes, String geneNames) {

        String res = attributes.containsKey(geneNames) ? attributes.get(geneNames) : ".";

        return res;
    }

    private String getPolyphen(Map<String, String> attributes) {
        String res = ".";

        if (attributes.containsKey("PolyphenScore")) {
            res = attributes.get("PolyphenScore");
        }

        return res;
    }

    private String getSift(Map<String, String> attributes) {
        String res = ".";

        if (attributes.containsKey("SIFTScore")) {
            res = attributes.get("SIFTScore");
        }

        return res;
    }

    private String getControl(Map<String, String> attributes, String controlTag) {
        String res = ".";

        if (attributes.containsKey(controlTag + "_maf")) {
            res = attributes.get(controlTag + "_maf");
            if (attributes.containsKey(controlTag + "_amaf")) {
                res += " (" + attributes.get(controlTag + "_amaf") + ")";
            }
        }

        return res;
    }


    @Override
    public boolean write(List<Variant> variants) {

        boolean res = true;
        for (Variant v : variants) {
            res &= write(v);
        }

        return res;
    }
}
