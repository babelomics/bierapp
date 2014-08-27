package org.babelomics.bierapp.server.ws;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Splitter;
import com.mongodb.*;
import org.opencb.opencga.lib.auth.MongoCredentials;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */

@Path("/{version}/go")
public class GoWSServer extends BierAppServer {

    private static final String credentialsPath = BierAppServer.class.getResource("/bierapp.credentials").getFile();

    private static MongoClient mongoClient;
    private static DB db;
    private static DBCollection goCollection;

    static {
        Properties properties = new Properties();
        try {
            properties.load(new InputStreamReader(new FileInputStream(credentialsPath)));

            MongoCredentials credentials = new MongoCredentials(properties);
            ServerAddress address = null;
            address = new ServerAddress(credentials.getMongoHost(), credentials.getMongoPort());
            mongoClient = new MongoClient(address, Arrays.asList(credentials.getMongoCredentials()));
            ObjectMapper mapper = new ObjectMapper();
            db = mongoClient.getDB(credentials.getMongoDbName());
            goCollection = db.getCollection("go");
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }


    }

    public GoWSServer(@DefaultValue("") @PathParam("version") String version,
                      @Context UriInfo uriInfo,
                      @Context HttpServletRequest hsr) throws IOException {
        super(version, uriInfo, hsr);

    }

    @GET
    @Path("/{go}/tree")
    public Response getGoTerms(@DefaultValue("") @PathParam("go") String goTerm) {
        Map<String, List<String>> tree = new HashMap<>();

        List<String> goAux = Splitter.on(",").splitToList(goTerm);

        List<String> goTerms = new ArrayList<>(goAux);

        DBObject query;

        while (!goTerms.isEmpty()) {
            String go = goTerms.remove(0);

            query = new BasicDBObject("id", go);

            DBCursor cursor = goCollection.find(query);

            for (DBObject dbObject : cursor) {
                BasicDBObject elem = (BasicDBObject) dbObject;
                String key = elem.getString("id");
                List<String> parents;

                if (tree.containsKey(key)) {
                    parents = tree.get(key);
                } else {
                    parents = new ArrayList<>();
                }

                BasicDBList parentsList = ((BasicDBList) elem.get("parents"));

                for (String parentKey : parentsList.keySet()) {
                    String newGoTerm = (String) parentsList.get(parentKey);
                    if (!parents.contains(newGoTerm)) {
                        parents.add(newGoTerm);
                    }
                    if (!goTerms.contains(newGoTerm)) {
                        goTerms.add(newGoTerm);
                    }
                }
                tree.put(key, parents);
            }
        }
        return createOkResponse(tree);
    }
}
