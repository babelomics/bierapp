BierApp
=======

## Download code
```bash
git clone https://github.com/babelomics/bierapp.git bierapp
cd bierapp/
git submodule update --init
```

### Install Node
To install node click [here.](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

**What is `npm`?** npm stands for [node packaged modules](http://npmjs.org/) is the node dependency manager.


### Install bower components and npm modules after clone
```bash
cd bierapp/
sudo npm install -g bower
npm install
bower install
```

Now install jsorolla submodule npm and bower dependencies:
```bash
cd bierapp/lib/jsorolla
npm install
bower install
```


## Compiling CSS and JavaScript
```bash
cd bierapp/
npm run build
```

Minimized files will be located in the `bierapp/build` dir.
