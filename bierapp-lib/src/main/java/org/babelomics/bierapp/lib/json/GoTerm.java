package org.babelomics.bierapp.lib.json;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.GZIPInputStream;

/**
 * Created by ralonso on 8/25/14.
 */
public class GoTerm {

    private String id;
    private String desc;
    private List<String> parents;

    public GoTerm(){
        parents = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public List<String> getParents() {
        return parents;
    }

    public void setParents(List<String> parents) {
        this.parents = parents;
    }

    public static List<GoTerm> parseObo(String goOboPath){
        List<GoTerm> goTermList = new ArrayList<>();
        try {
            BufferedReader goReader = new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream(goOboPath))));
            String line = null;
            GoTerm node = null;
            boolean mode_on = false;
            while((line = goReader.readLine()) != null){
                if (line.startsWith("[Term]"))
                    mode_on = true;
                if(mode_on){

                    String[] id = line.split(" ");
                    if(line.startsWith("id: ")){
                        node = new GoTerm();
                        node.setId(id[1]);
                        goTermList.add(node);
                    }
                    if(line.startsWith("is_a: ")){
                        node.getParents().add(id[1]);
                    }
                }
            }
            goReader.close();

        }
        catch (FileNotFoundException f){

        } catch (IOException e) {
            e.printStackTrace();
        }
        return goTermList;

    }
}
