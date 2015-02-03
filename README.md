BierApp
=======

## Compiling CSS and JavaScript

BierApp uses [Grunt](http://gruntjs.com/) task runner to build the code and run tests and other convenient tasks. 
To use it, install the required dependencies as directed and then run some Grunt commands. Grunt runs on top of Node.js, it must be installed first.

### Install Node
To install node click [here.](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

**What is `npm`?** npm stands for [node packaged modules](http://npmjs.org/) is the node dependency manager.


```bash
sudo npm install -g bower
bower install
npm install
npm run build
```
Minimized files will be located in the `/build` dir.
