package org.babelomics.bierapp.server.ws;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.google.common.base.Splitter;
import org.opencb.commons.containers.QueryResponse;
import org.opencb.commons.containers.QueryResult;
import org.opencb.commons.containers.map.ObjectMap;
import org.opencb.commons.containers.map.QueryOptions;
import org.opencb.opencga.account.CloudSessionManager;
import org.opencb.opencga.account.io.IOManagementException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.util.Properties;

/**
 * @author Alejandro Alemán Ramos <aaleman@cipf.es>
 */
@Path("/")
public class BierAppServer {


    // output content format: txt or text, json, xml, das
    protected String outputFormat;

    protected String version;
    protected UriInfo uriInfo;
    protected HttpServletRequest httpServletRequest;

    protected MultivaluedMap<String, String> params;
    protected QueryOptions queryOptions;

    protected long startTime;
    protected long endTime;

    protected static ObjectMapper jsonObjectMapper;
    protected static ObjectWriter jsonObjectWriter;
    protected static XmlMapper xmlObjectMapper;
    protected static Properties properties;

    protected static Logger logger;

    //General params
    @DefaultValue("")
    @QueryParam("sessionId")
    protected String sessionId;

    @DefaultValue("json")
    @QueryParam("of")
    protected String of;

    /**
     * Only one CloudSessionManager
     */
    protected static CloudSessionManager cloudSessionManager;

    static {

        try {
            cloudSessionManager = new CloudSessionManager();
        } catch (IOException | IOManagementException e) {
            e.printStackTrace();
        }
//        InputStream is = CloudSessionManager.class.getClassLoader().getResourceAsStream("application.properties");
        properties = new Properties();
//        try {
//            properties.load(is);
//        } catch (IOException e) {
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//        }


        logger = LoggerFactory.getLogger(BierAppServer.class);

        jsonObjectMapper = new ObjectMapper();
        jsonObjectWriter = jsonObjectMapper.writer();
        logger.info("BierApp: Initialising attributes inside static block");


    }

    public BierAppServer() {
        logger.info("BierAppServer: in 'default constructor");
    }

    public BierAppServer(@PathParam("version") String version,
                         @Context UriInfo uriInfo, @Context HttpServletRequest hsr) throws IOException {


        this.version = version;
        this.uriInfo = uriInfo;
        this.httpServletRequest = hsr;
        this.params = this.uriInfo.getQueryParameters();


        init(version, uriInfo);

        logger.info("BierAppServer: in 'constructor'");

    }

    protected void init(String version, UriInfo uriInfo) throws IOException {

        startTime = System.currentTimeMillis();


        queryOptions = new QueryOptions();
        logger.info("GenericrestWSServer: in 'init' method");

        parseCommonQueryParameters(uriInfo.getQueryParameters());
    }

    private void parseCommonQueryParameters(MultivaluedMap<String, String> multivaluedMap) {
        queryOptions.put("metadata", (multivaluedMap.get("metadata") != null) ? multivaluedMap.get("metadata").get(0).equals("true") : true);
        queryOptions.put("exclude", (multivaluedMap.get("exclude") != null) ? Splitter.on(",").splitToList(multivaluedMap.get("exclude").get(0)) : null);
        queryOptions.put("include", (multivaluedMap.get("include") != null) ? Splitter.on(",").splitToList(multivaluedMap.get("include").get(0)) : null);
        queryOptions.put("limit", (multivaluedMap.get("limit") != null) ? multivaluedMap.get("limit").get(0) : -1);
        queryOptions.put("skip", (multivaluedMap.get("skip") != null) ? multivaluedMap.get("skip").get(0) : -1);
        queryOptions.put("count", (multivaluedMap.get("count") != null) ? Boolean.parseBoolean(multivaluedMap.get("count").get(0)) : false);

        outputFormat = (multivaluedMap.get("of") != null) ? multivaluedMap.get("of").get(0) : "json";
    }

//    @GET
//    @Path("/test")
//    public Response help() {
//        return createOkResponse("No help available");
//    }
//
//    protected Response createOkResponse(Object obj) {
//        endTime = System.currentTimeMillis() - startTime;
//        queryResponse.setTime(new Long(endTime - startTime).intValue());
//        queryResponse.setApiVersion(version);
//        queryResponse.setQueryOptions(queryOptions);
//
//        // Guarantee that the QueryResponse object contains a coll of results
//        Collection coll;
//        if (obj instanceof Collection) {
//            coll = (Collection) obj;
//        } else {
//            coll = new ArrayList();
//            coll.add(obj);
//        }
//        queryResponse.setResponse(coll);
//
//        switch (outputFormat.toLowerCase()) {
//            case "json":
//                return createJsonResponse();
//            case "xml":
//                return createXmlResponse();
//            default:
//                return buildResponse(Response.ok());
//        }
//    }
//
//    protected Response createOkResponse(Collection obj, MediaType mediaType) {
//        return buildResponse(Response.ok(obj, mediaType));
//    }
//
//    protected Response createOkResponse(Collection obj, MediaType mediaType, String fileName) {
//        return buildResponse(Response.ok(obj, mediaType).header("content-disposition", "attachment; filename =" + fileName));
//    }
//
//    protected Response createErrorResponse(String obj) {
//        endTime = System.currentTimeMillis() - startTime;
//        queryResponse.setTime(new Long(endTime - startTime).intValue());
//        queryResponse.setApiVersion(version);
//        queryResponse.setQueryOptions(queryOptions);
//        queryResponse.setError(obj);
//
//        switch (outputFormat.toLowerCase()) {
//            case "json":
//                return createJsonResponse();
//            case "xml":
//                return createXmlResponse();
//            default:
//                return buildResponse(Response.ok());
//        }
//    }
//
//
//    protected Response createJsonResponse() {
//        try {
//            return buildResponse(Response.ok(jsonObjectWriter.writeValueAsString(queryResponse), MediaType.APPLICATION_JSON_TYPE));
//        } catch (JsonProcessingException e) {
//            logger.error("Error parsing queryResponse object", e);
//            return null;
//        }
//    }
//
//    protected Response createXmlResponse() {
//        try {
//            return buildResponse(Response.ok(xmlObjectMapper.writeValueAsString(queryResponse), MediaType.APPLICATION_XML_TYPE));
//        } catch (JsonProcessingException e) {
//            logger.error("Error parsing queryResponse object", e);
//            return null;
//        }
//    }
//
//    private Response buildResponse(Response.ResponseBuilder responseBuilder) {
//        return responseBuilder.header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "x-requested-with, content-type").build();
//    }

    @GET
    @Path("/echo/{message}")
    public Response echoGet(@PathParam("message") String message) {
        System.out.println("HOLA");
        return createOkResponse(message);
    }

    protected Response createErrorResponse(Object o) {
        QueryResult<ObjectMap> result = new QueryResult();
        result.setErrorMsg(o.toString());
        return createJsonResponse(result);
    }

    protected Response createOkResponse(Object obj) {
        switch (outputFormat.toLowerCase()) {
            case "json":
                return createJsonResponse(obj);
            case "xml":
                return createOkResponse(obj, MediaType.APPLICATION_XML_TYPE);
            default:
                return buildResponse(Response.ok(obj));
        }
    }

    protected Response createJsonResponse(Object obj) {
        endTime = System.currentTimeMillis() - startTime;
        System.out.println("queryOptions = " + queryOptions);
        System.out.println("params = " + params);
        QueryResponse queryResponse = new QueryResponse(queryOptions, obj,
                (params.get("version") != null) ? params.get("version").get(0) : null,
                (params.get("species") != null) ? params.get("species").get(0) : null,
                endTime);

        try {
            return buildResponse(Response.ok(jsonObjectWriter.writeValueAsString(queryResponse), MediaType.APPLICATION_JSON_TYPE));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            logger.error("Error parsing queryResponse object");
            return null;
        }
    }

    protected Response createOkResponse(Object o1, MediaType o2) {
        return buildResponse(Response.ok(o1, o2));
    }

    protected Response createOkResponse(Object o1, MediaType o2, String fileName) {
        return buildResponse(Response.ok(o1, o2).header("content-disposition", "attachment; filename =" + fileName));
    }

    private Response buildResponse(Response.ResponseBuilder responseBuilder) {
        return responseBuilder.header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "x-requested-with, content-type").build();

    }


}
