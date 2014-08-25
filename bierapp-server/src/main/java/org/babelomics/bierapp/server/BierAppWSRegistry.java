package org.babelomics.bierapp.server;

import org.glassfish.jersey.server.ResourceConfig;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
public class BierAppWSRegistry extends ResourceConfig {
    public BierAppWSRegistry() {
        packages("org.babelomics.bierapp.server.ws");
    }

}
