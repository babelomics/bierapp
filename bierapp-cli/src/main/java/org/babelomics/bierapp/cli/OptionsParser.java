package org.babelomics.bierapp.cli;

import com.beust.jcommander.JCommander;
import com.beust.jcommander.Parameter;
import com.beust.jcommander.ParameterException;
import com.beust.jcommander.Parameters;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class OptionsParser {

    private final JCommander jcommander;

    private final CommandAnnot annot;
    private final CommandIndex index;


    public OptionsParser() {
        jcommander = new JCommander();

        annot = new CommandAnnot();
        index = new CommandIndex();

        jcommander.addCommand(annot);
        jcommander.addCommand(index);

    }

    interface Command {
    }


    @Parameters(commandNames = {"annot"}, commandDescription = "Annot vcf file")
    class CommandAnnot implements Command {


        @Parameter(names = {"-i", "--input"}, description = "Input file", required = true, arity = 1)
        String input;

        //        @Parameter(names = { "-p", "--prefix" }, description = "Accession IDs prefix", arity = 1)
//        String prefix;
//
//        @Parameter(names = { "-s", "--study-alias" }, description = "Unique ID for the study where the file is classified (used for prefixes)",
//                required = true, arity = 1)//, validateValueWith = StudyIdValidator.class)
//                String studyId;
//
//        @Parameter(names = { "-r", "--resume-from-accession" }, description = "Starting point to generate accessions (will not be included)", arity = 1)
//        String resumeFromAccession;
//
        @Parameter(names = {"-o", "--output"}, description = "Output file", required = true, arity = 1)
        String output;

    }

    @Parameters(commandNames = {"index"}, commandDescription = "Index vcf file")
    class CommandIndex implements Command {
        @Parameter(names = {"-i", "--input"}, description = "Input file", required = true, arity = 1)
        String input;

        @Parameter(names = {"-s", "--study"}, description = "Study ID", required = true, arity = 1)
        String studyId;

    }


    String parse(String[] args) throws ParameterException {
        jcommander.parse(args);
        return jcommander.getParsedCommand();
    }

    String usage() {
        StringBuilder builder = new StringBuilder();
        jcommander.usage(builder);
        return builder.toString();
    }

    CommandAnnot getAnnotCommand() {
        return annot;
    }

    CommandIndex getIndexCommand() {
        return index;
    }

}
