package org.babelomics.bierapp.lib.storage;

import org.opencb.commons.bioformats.variant.VariantSource;
import org.opencb.opencga.lib.auth.MongoCredentials;
import org.opencb.opencga.storage.variant.VariantVcfMongoDataWriter;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class VariantBierAppVcfMongoDataWriter extends VariantVcfMongoDataWriter {
    public VariantBierAppVcfMongoDataWriter(VariantSource source, String species, MongoCredentials credentials) {
        super(source, species, credentials);
    }
}
