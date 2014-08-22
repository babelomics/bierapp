package org.babelomics.bierapp.cli;

import com.beust.jcommander.ParameterException;
import org.opencb.commons.bioformats.pedigree.io.readers.PedigreePedReader;
import org.opencb.commons.bioformats.pedigree.io.readers.PedigreeReader;
import org.opencb.commons.bioformats.variant.Variant;
import org.opencb.commons.bioformats.variant.VariantSource;
import org.opencb.commons.bioformats.variant.annotators.*;
import org.opencb.commons.bioformats.variant.vcf4.io.readers.VariantReader;
import org.opencb.commons.bioformats.variant.vcf4.io.readers.VariantVcfReader;
import org.opencb.commons.bioformats.variant.vcf4.io.writers.VariantVcfDataWriter;
import org.opencb.commons.bioformats.variant.vcf4.io.writers.VariantWriter;
import org.opencb.commons.containers.list.SortedList;
import org.opencb.commons.run.Task;
import org.opencb.opencga.lib.auth.MongoCredentials;
import org.opencb.opencga.storage.variant.VariantVcfMongoDataWriter;
import org.opencb.variant.lib.runners.VariantRunner;
import org.opencb.variant.lib.runners.tasks.VariantAnnotTask;
import org.opencb.variant.lib.runners.tasks.VariantEffectTask;
import org.opencb.variant.lib.runners.tasks.VariantStatsTask;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class BierAppMain {

    //    private static final String credentialsPath = BierAppMain.class.getResource("/bierapp.credentials").toString();
    private static final String credentialsPath = BierAppMain.class.getResource("/bierapp.credentials").getFile();


    public static void main(String[] args) throws IOException {

        OptionsParser parser = new OptionsParser();

        if (args.length == 0 || args[0].equals("-h") || args[0].equals("--help")) {
            System.out.println(parser.usage());
        }


        OptionsParser.Command command = null;

        try {
            switch (parser.parse(args)) {
                case "annot":
                    command = parser.getAnnotCommand();
                    break;
                case "index":
                    command = parser.getIndexCommand();
                    break;
                default:
                    System.out.println("Command not implemented");
                    parser.usage();
                    System.exit(1);
            }
        } catch (ParameterException ex) {
            System.out.println(ex.getMessage());
            System.out.println(parser.usage());
            System.exit(1);
        }

        String pedFile = null;
        VariantRunner vr;
        VariantReader reader;
        VariantWriter writer;
        PedigreeReader pedReader = pedFile != null ? new PedigreePedReader(pedFile) : null;
        List<Task<Variant>> taskList = new SortedList<>();
        List<VariantWriter> writers = new ArrayList<>();

        if (command instanceof OptionsParser.CommandAnnot) {
            OptionsParser.CommandAnnot ca = (OptionsParser.CommandAnnot) command;

            String inputFile = ca.input;
            String outputFile = ca.output;


            VariantSource study = new VariantSource("study1", "s1", "Study 1", Arrays.asList("author"), Arrays.asList(inputFile, pedFile));

            reader = new VariantVcfReader(inputFile);
            writer = new VariantVcfDataWriter(reader, outputFile);

            List<VariantAnnotator> annots = new ArrayList<>();

            annots.add(new VariantPolyphenSIFTAnnotator());
            annots.add(new VariantSNPAnnotator());
            annots.add(new VariantConsequenceTypeAnnotator());
            annots.add(new VariantGeneNameAnnotator());
            annots.add(new VariantControlMongoAnnotator());

            writers.add(writer);

            taskList.add(new VariantAnnotTask(annots));

            vr = new VariantRunner(study, reader, pedReader, writers, taskList);

            System.out.println("Annotating variants...");
            vr.run();
            System.out.println("Variants annotated!");

        } else if (command instanceof OptionsParser.CommandIndex) {

            OptionsParser.CommandIndex ci = (OptionsParser.CommandIndex) command;

            reader = new VariantVcfReader(ci.input);
            String studyName = ci.studyId;
            VariantSource source = new VariantSource(studyName, studyName, studyName, null, null);

            MongoCredentials credentials;

            Properties properties = new Properties();
            properties.load(new InputStreamReader(new FileInputStream(credentialsPath)));

            credentials = new MongoCredentials(properties);
            writers.add(new VariantVcfMongoDataWriter(source, "opencga-hsapiens", credentials));

            taskList.add(new VariantEffectTask());
            taskList.add(new VariantStatsTask(reader, source));

            for (VariantWriter variantWriter : writers) {
                variantWriter.includeSamples(true);
                variantWriter.includeEffect(true);
                variantWriter.includeStats(true);
            }

            vr = new VariantRunner(source, reader, pedReader, writers, taskList);

            System.out.println("Indexing variants...");
            vr.run();
            System.out.println("Variants indexed!");

        }

    }
}
