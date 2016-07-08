/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsopkg: grunt.file.readJSON('lib/jsorolla/package.json'),
        build: {
            name: 'bierapp',
            path: 'build/<%= pkg.version %>',
            vendor: '<%= build.path %>/vendor'
        },
        clean: {
            dist: ['<%= build.path %>/*']
        },
        concat: {
            dist: {
                src: [
                    'bower_components/webcomponentsjs/webcomponents-lite.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/highcharts-release/highcharts.js',
                    'bower_components/qtip2/jquery.qtip.js',
                    'bower_components/uri.js/src/URI.js',
                    'bower_components/cookies-js/src/cookies.js'
                ],
                dest: '<%= build.path %>/vendors.js'
            },
            jsorolla: {
                src: [
                    'lib/jsorolla/src/lib/cache/indexeddb-cache.js',
                    'lib/jsorolla/src/lib/clients/cellbase-client-config.js',
                    'lib/jsorolla/src/lib/clients/cellbase-client.js',
                    'lib/jsorolla/src/lib/clients/opencga-client-config.js',
                    'lib/jsorolla/src/lib/clients/opencga-client.js',
                    'lib/jsorolla/src/lib/clients/rest-client.js'
                ],
                dest: '<%= build.path %>/jsorolla-clients.js'
            },
            genome_viewer: {
                src: [
                    'lib/jsorolla/build/1.1.9/genome-viewer/gv-config.js',
                    'lib/jsorolla/build/1.1.9/genome-viewer/genome-viewer.js',
                ],
                dest: '<%= build.path %>/genome-viewer.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= build.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= build.path %>/vendors.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            build: {
                files: [
                    // {expand: true, cwd: '.', src: ['conf/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './src', src: ['config.js'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './src', src: ['images/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './lib/jsorolla/styles/img', src: ['**'], dest: '<%= build.path %>/images'},
                    {expand: true, cwd: './lib/jsorolla/styles', src: ['fonts/**'], dest: '<%= build.path %>'},

                    {expand: true, cwd: './lib/jsorolla/styles/', src: ['css/style.css'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './bower_components/fontawesome', src: ['css/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './bower_components/fontawesome', src: ['fonts/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './bower_components/qtip2/', src: ['jquery.qtip.min.css'], dest: '<%= build.path %>/css'},

                    { expand: true, cwd: './', src: ['LICENSE'], dest: '<%= build.path %>/' },
                    { expand: true, cwd: './', src: ['README.md'], dest: '<%= build.path %>/' }
                ]
            }
        },
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    '<%= build.path %>/index.html': ['src/index.html']
                }
            }
        },
        vulcanize: {
            default: {
                options: {
                    // Task-specific options go here.
                    stripComments: true,
                    inlineScripts: true,
                    inlineCss: true
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    '<%= build.path %>/bierapp-web.html': 'src/bierapp-web.html'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        htmlbuild: {
            build: {
                src: 'src/<%= build.name %>.html',
                dest: '<%= build.path %>/',
                options: {
                    beautify: true,
                    styles: {
                        'vendor': [
                            '<%= def.build %>/vendor/ext-5/theme-babel/theme-babel-all.css',
                            '<%= def.build %>/vendor/jquery.qtip*.css',
                            '<%= def.build %>/vendor/bootstrap-*-dist/css/bootstrap.min.css',
                            '<%= def.build %>/vendor/typeahead.js-bootstrap.css',
                            '<%= def.build %>/vendor/jquery.simplecolorpicker.css'
                        ],
                        'css': ['<%= def.build %>/styles/css/style.css']
                    },
                    scripts: {
                        vendor: [
                            '<%= def.build %>/vendor/underscore*.js',
                            '<%= def.build %>/vendor/backbone*.js',
                            '<%= def.build %>/vendor/jquery.min.js',
                            '<%= def.build %>/vendor/bootstrap-*-dist/js/bootstrap.min.js',
                            '<%= def.build %>/vendor/typeahead.min.js',
                            '<%= def.build %>/vendor/jquery.cookie*.js',
                            '<%= def.build %>/vendor/purl*.js',
                            '<%= def.build %>/vendor/jquery.sha1*.js',
                            '<%= def.build %>/vendor/jquery.qtip*.js'
                        ],
                        config: [
                            '<%= def.build %>/gv-config.js'
                        ],
                        lib: [
                            '<%= def.build %>/opencga*.min.js',
                            '<%= def.build %>/genome-viewer.min.js'
                        ],
                        js: '<%= def.build %>/<%= def.name %>.min.js'
                    }

                }
            }
        },
        'curl-dir': {},
        hub: {
            'genome-viewer': {
                src: ['lib/jsorolla/Gruntfile.js'],
                tasks: ['gv']
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /lib\/jsorolla\/styles\/fonts/g,
                            replacement: 'fonts'
                        },
                        {
                            match: /lib\/jsorolla\/src\/lib\/components\//g,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['<%= build.path %>/index.html'], dest: '<%= build.path %>' },
                    { expand: true, flatten: true, src: ['<%= build.path %>/bierapp-element.html'], dest: '<%= build.path %>' }
                ]
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-hub');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('log-deploy', 'Deploy path info', function (version) {
        grunt.log.writeln("DEPLOY COMMAND: rsync -avz --no-whole-file -e ssh build/" + grunt.config.data.pkg.version + " cafetero@mem16:/httpd/bioinfo/www-apps/" + grunt.config.data.def.name + "/");
    });

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'processhtml', 'vulcanize', 'replace']);
};
