# Overview
BierApp is the gene/variant prioritization tool of the BiER (the Team of BioInformatic for Rare Diseases). This interactive tool allows finding genes affected by deleterious variants that segregate along family pedigrees, case-controls or sporadic samples. The tool provides an easy-to-use environment in which heuristic filters can be applied to narrow down a large liste of variants found in whole exome (or genome) experiments.

### Documentation
You can find BierApp documentation and tutorials at: https://github.com/babelomics/bierapp/wiki.

### How to cite BiERapp
Alemán A, Garcia-Garcia F, Salavert F, Medina I, Dopazo J. A web-based interactive framework to assist in the prioritization of disease candidate genes in whole-exome sequencing studies. Nucleic Acids Res. 2014 Jul;42(Web Server issue):W88-93. doi: 10.1093/nar/gku407. [PubMed](http://www.ncbi.nlm.nih.gov/pubmed/24803668)


### Issue Tracking
You can report bugs or request new features at [GitHub issue tracking](https://github.com/babelomics/bierapp/issues).

### Release Notes and Roadmap
Releases notes are available at [GitHub releases](https://github.com/babelomics/bierapp/releases).

Roadmap is available at [GitHub milestones](https://github.com/babelomics/bierapp/milestones). You can report bugs or request new features at [GitHub issue tracking](https://github.com/babelomics/bierapp/issues).

### Versioning
BierApp is versioned following the rules from [Semantic versioning](http://semver.org/).

### Maintainers
We recommend to contact BierApp developers by writing to OpenCB mailing list babelomics@cipf.es. The main developers and maintainers are:
* Joaquin Dopazo (jdopazo@cipf.es) (_Founder and Project Leader_)
* Ignacio Medina (im411@cam.ac.uk)
* Mercedes Medina (mmedina@cipf.es)
* Alejandro Aleman (aaleman@cipf.es)
* Francisco Salavert (fsalavert@cipf.es)

Former contributors
* Roberto Alonso 


##### Contributing
BierApp is an open-source and collaborative project. We appreciate any help and feeback from users, you can contribute in many different ways such as simple bug reporting and feature request. Dependending on your skills you are more than welcome to develop client tools, new features or even fixing bugs.


# How to build 
BierApp is developed in HTML5, therefore it is mainly developed in JavaScript and makes a heavy usage of HTML and CSS. It uses [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) as building tools. BierApp also requires of [OpenCB JSorolla](https://github.com/opencb/jsorolla) to be built, this is a JavaScript library developed for several OpenCB web-based projects, this can be found as Git submodule in BierApp.

Stable releases are merged and tagged at **_master_** branch, you are encourage to use latest stable release for production. Current active development is carried out at **_develop_** branch, only building is guaranteed and bugs are expected, use this branch for development or for testing new functionalities. The only source code dependency of BierApp from OpenCB is JSorolla. BierApp **_master_** branch depends on stable branches in JSorolla, while **_develop_** branch of BierApp depends on JSorolla **_develop_**.

### Prerequisites
The following technologies are needed to build BierApp: [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/).

##### Installing Node.js and npm
To install [Node.js](https://nodejs.org/) you can visit [this link](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

[npm](https://www.npmjs.com/) stands for _node packaged modules_ and it is the dependency manager of [Node.js](https://nodejs.org/).

##### Install Bower and Grunt
After installing _Node.js_ and _npm_, we can install [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) by executing the following commands with root permission:

```bash
sudo npm install -g bower
sudo npm install -g grunt-cli
```

### Cloning
BierApp is an open-source and free project, you can download **_master_** branch by executing:

    imedina@ivory:~$ git clone https://github.com/babelomics/bierapp.git
    Cloning into 'bierapp'...
    remote: Counting objects: 847, done.
    remote: Compressing objects: 100% (4/4), done.
    remote: Total 847 (delta 0), reused 0 (delta 0), pack-reused 842
    Receiving objects: 100% (847/847), 4.40 MiB | 1.10 MiB/s, done.
    Resolving deltas: 100% (375/375), done.


To fetch the latest stable release at **_develop_** branch can be downloaded executing:

    imedina@ivory:~$ git clone -b develop https://github.com/babelomics/bierapp.git
    Cloning into 'bierapp'...
    remote: Counting objects: 847, done.
    remote: Compressing objects: 100% (4/4), done.
    remote: Total 847 (delta 0), reused 0 (delta 0), pack-reused 842
    Receiving objects: 100% (847/847), 4.40 MiB | 1.02 MiB/s, done.
    Resolving deltas: 100% (375/375), don

After this, in both cases, you **must** execute the following command to fetch the JSorolla submodule:

    git submodule update --init


### Build
After install _Node.js_ and _npm_ we have to install _npm_ packages for BierApp, from the the root folder execute:

```bash
npm install
```
This will make _npm_ to look at file [package.json](package.json) and install locally all the dependencies listed there.

To install all _Bower_ dependencies for BierApp execute from the root folder:

```bash
bower install
```
This will make _Bower_ to look at file [bower.json](bower.json) and install locally all the dependencies.

First, you must update JSorolla dependencies:
```bash
cd lib/jsorolla
npm install
bower install
```

Finally, to build BierApp execute:
```bash
grunt
```

When completed, all compiled files will be located under the `build` folder.

# Supporters
JetBrains is supporting this open source project with:

[![Intellij IDEA](https://www.jetbrains.com/idea/docs/logo_intellij_idea.png)]
(http://www.jetbrains.com/idea/)
