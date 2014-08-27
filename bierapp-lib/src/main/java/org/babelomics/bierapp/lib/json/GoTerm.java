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
    private String def;
    private String name;
    private List<String> parents;

    public GoTerm() {
        parents = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDef() {
        return def;
    }

    public void setDef(String def) {
        this.def = def;
    }

    public List<String> getParents() {
        return parents;
    }

    public void setParents(List<String> parents) {
        this.parents = parents;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static List<GoTerm> parseObo(String goOboPath) {
        List<GoTerm> goTermList = new ArrayList<>();
        try {
            BufferedReader goReader = new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream(goOboPath))));
            String line = null;
            GoTerm node = null;
            boolean findGo = false;
            while ((line = goReader.readLine()) != null) {

                if (line.startsWith("[Term]")) {
                    if (node != null) {
                        goTermList.add(node);
                    }
                    node = new GoTerm();
                }
                if (line.startsWith("id:")) {
                    String[] id = line.split(" ");
                    node.setId(id[1]);
                }

                if (line.startsWith("is_a:")) {
                    String[] is_a = line.split(" ");
                    node.getParents().add(is_a[1]);
                }

                if (line.startsWith("def:")) {
                    node.setDef(line.replace("def: ", ""));
                }

                if (line.startsWith("name:")) {
                    node.setName(line.replace("name: ", ""));
                }

            }
            goReader.close();

        } catch (FileNotFoundException f) {

        } catch (IOException e) {
            e.printStackTrace();
        }
        return goTermList;
    }
}
