package org.babelomics.bierapp.server.ws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.base.Joiner;
import org.apache.commons.lang.mutable.MutableInt;
import org.babelomics.bierapp.lib.json.VariantAnalysisInfo;
import org.babelomics.bierapp.lib.json.VariantInfo;
import org.babelomics.bierapp.lib.storage.VariantBierAppMongoQueryBuilder;
import org.opencb.commons.containers.QueryResult;
import org.opencb.opencga.lib.auth.MongoCredentials;
import org.opencb.opencga.storage.variant.VariantQueryBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
@Path("/{version}/account/{accountId}/job/{jobId}")
public class VariantWSServer extends BierAppServer {
    private String accountId;
    private String jobId;

    public VariantWSServer() {
    }

    public VariantWSServer(@DefaultValue("") @PathParam("version") String version,
                           @Context UriInfo uriInfo,
                           @Context HttpServletRequest hsr,
                           @DefaultValue("") @PathParam("accountId") String accountId,
                           @DefaultValue("") @PathParam("jobId") String jobId
    ) throws IOException {
        super(version, uriInfo, hsr);

        this.accountId = accountId;
        this.jobId = jobId;
    }

    @GET
    @Path("/variants")
    public Response getVariants() {
        Map<String, String> map = new LinkedHashMap<>();

        UriInfo info = uriInfo;

        if (cloudSessionManager.checkAccount(accountId, sessionId)) {


            MultivaluedMap<String, String> queryParams = info.getQueryParameters();
            for (Map.Entry<String, List<String>> entry : queryParams.entrySet()) {
                map.put(entry.getKey(), Joiner.on(",").join(entry.getValue()));
            }


            int page = (info.getQueryParameters().containsKey("page")) ? Integer.parseInt(info.getQueryParameters().getFirst("page")) : 1;
            int start = (info.getQueryParameters().containsKey("start")) ? Integer.parseInt(info.getQueryParameters().getFirst("start")) : 0;
            int limit = (info.getQueryParameters().containsKey("limit")) ? Integer.parseInt(info.getQueryParameters().getFirst("limit")) : 25;

            map.put("studyId", accountId + "_-_" + this.jobId);

            System.out.println(map);
            MutableInt count = new MutableInt(-1);

            Properties prop = new Properties();
            prop.put("mongo_host", "mem15");
            prop.put("mongo_port", 27017);
            prop.put("mongo_db_name", "cibererStudies");
            prop.put("mongo_user", "user");
            prop.put("mongo_password", "pass");

            MongoCredentials credentials = new MongoCredentials(prop);
            VariantQueryBuilder vqm;
            String res = null;
            QueryResult<VariantInfo> queryResult = null;
            try {
                vqm = new VariantBierAppMongoQueryBuilder(credentials);
                queryResult = ((VariantBierAppMongoQueryBuilder) vqm).getRecordsMongo(page, start, limit, count, map);

                queryResult.setNumResults(count.intValue());
                vqm.close();

            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
            return createOkResponse(queryResult);
        } else {
            return createErrorResponse("User Not allowed!!");
        }
    }


    @GET
    @Path("/study")
    public Response getStudyInfo() {

        String studyId = (accountId + "_-_" + this.jobId);

        System.out.println("accountId = " + accountId);
        System.out.println("jobId = " + jobId);
        System.out.println("sessionId = " + sessionId);

        if (cloudSessionManager.checkAccount(accountId, sessionId)) {

            Properties prop = new Properties();
            prop.put("mongo_host", "mem15");
            prop.put("mongo_port", 27017);
            prop.put("mongo_db_name", "cibererStudies");
            prop.put("mongo_user", "user");
            prop.put("mongo_password", "pass");

            MongoCredentials credentials = new MongoCredentials(prop);
            VariantQueryBuilder vqm;
            String res = null;
            QueryResult<VariantAnalysisInfo> queryResult = null;
            try {
                vqm = new VariantBierAppMongoQueryBuilder(credentials);

                queryResult = ((VariantBierAppMongoQueryBuilder) vqm).getAnalysisInfo(studyId);

                res = jsonObjectMapper.writeValueAsString(queryResult);

                vqm.close();

            } catch (UnknownHostException e) {
                e.printStackTrace();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }


            return createOkResponse(queryResult);
        } else {
            return createErrorResponse("User not Allowed!!");
        }


    }


}
