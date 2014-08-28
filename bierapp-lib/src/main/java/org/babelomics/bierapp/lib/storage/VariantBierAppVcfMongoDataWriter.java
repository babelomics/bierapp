package org.babelomics.bierapp.lib.storage;

import com.google.common.base.Splitter;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import org.opencb.commons.bioformats.variant.Variant;
import org.opencb.commons.bioformats.variant.VariantSource;
import org.opencb.opencga.lib.auth.MongoCredentials;
import org.opencb.opencga.storage.variant.VariantVcfMongoDataWriter;

import java.util.List;
import java.util.Map;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class VariantBierAppVcfMongoDataWriter extends VariantVcfMongoDataWriter {
    public VariantBierAppVcfMongoDataWriter(VariantSource source, String species, MongoCredentials credentials) {
        super(source, species, credentials);

    }

    @Override
    public boolean buildBatchRaw(List<Variant> data) {
        for (Variant v : data) {
            String rowkey = buildRowkey(v.getChromosome(), String.valueOf(v.getPosition()));

            // Check that this relationship was not established yet
            BasicDBObject query = new BasicDBObject("chr", v.getChromosome()).append("pos", v.getPosition());
            query.append("sources.sourceId", source.getAlias());

            if (variantCollection.count(query) == 0) {
                BasicDBObject mongoStudy = new BasicDBObject("sourceName", source.getName()).append("sourceId", source.getAlias());
                mongoStudy.append("ref", v.getReference()).append("alt", v.getAltAlleles());

                // GO
                if (v.containsAttribute("GOTerms")) {
                    BasicDBList go = new BasicDBList();
                    List<String> goTerms = Splitter.on(",").splitToList(v.getAttribute("GOTerms"));

                    go.addAll(goTerms);
                    mongoStudy.put("go", go);
                }
                // Attributes
                if (v.getAttributes().size() > 0) {
                    BasicDBObject info = null;
                    for (Map.Entry<String, String> entry : v.getAttributes().entrySet()) {
                        if (info == null) {
                            info = new BasicDBObject(entry.getKey(), entry.getValue());
                        } else {
                            info.append(entry.getKey(), entry.getValue());
                        }
                    }

                    if (info != null) {
                        mongoStudy.put("attributes", info);
                    }
                }

                // Samples
                if (this.includeSamples && v.getSamplesData().size() > 0) {
                    BasicDBObject samples = new BasicDBObject();

                    for (Map.Entry<String, Map<String, String>> entry : v.getSamplesData().entrySet()) {
                        BasicDBObject sampleData = new BasicDBObject();
                        for (Map.Entry<String, String> sampleEntry : entry.getValue().entrySet()) {
                            sampleData.put(sampleEntry.getKey(), sampleEntry.getValue());
                        }
                        samples.put(entry.getKey(), sampleData);
                    }
                    mongoStudy.put("samples", samples);
                }


                mongoMap.put(rowkey, mongoStudy);

            } else {
                // TODO What if there is the same position already?
                System.out.println("Variant " + v.getChromosome() + ":" + v.getPosition() + " already found");
            }
        }

        return true;
    }

}
