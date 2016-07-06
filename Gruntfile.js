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
                    'bower_components/backbone/backbone.js'
                ],
                dest: '<%= build.path %>/vendors.js'
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
                    // {expand: true, cwd: '.', src: ['index.html'], dest: '<%= build.path %>'},
                    // {expand: true, cwd: '.', src: ['conf/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: '.', src: ['images/**'], dest: '<%= build.path %>'},
                    {expand: true, cwd: './lib/jsorolla/styles/img', src: ['**'], dest: '<%= build.path %>/images'},
                    {expand: true, cwd: './lib/jsorolla/styles', src: ['fonts/**'], dest: '<%= build.path %>'},
                    // {expand: true, cwd: './bower_components', src: ['fontawesome/css/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['fontawesome/fonts/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['webcomponentsjs/*.min.js'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['underscore/*min.js'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['backbone/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['highcharts-release/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['jquery/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['cookies-js/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['qtip2/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['crypto-js-evanvosberg/**'], dest: '<%= build.path %>/bower_components'},
                    // {expand: true, cwd: './bower_components', src: ['pako/**'], dest: '<%= build.path %>/bower_components'},
                    // { expand: true, cwd: '.', src: ['conf/theme.html'], dest: '<%= build.path %>' },

                    { expand: true, cwd: './', src: ['LICENSE'], dest: '<%= build.path %>/' },
                    { expand: true, cwd: './', src: ['README.md'], dest: '<%= build.path %>/' }

                    // {expand: true, cwd: './lib/jsorolla/src/lib/components/', src: ['jso-global.css'], dest: '<%= build.path %>'},
                    // {expand: true, cwd: './lib/jsorolla/src/lib/components/', src: ['jso-dropdown.css'], dest: '<%= build.path %>'},
                    // {expand: true, cwd: './lib/jsorolla/src/lib/components/', src: ['jso-form.css'], dest: '<%= build.path %>'},
                    // {   expand: true, cwd: './<%= def.jsorolla %>', src: ['styles/**'], dest: '<%= def.build %>/'  },
                    // {   expand: true, cwd: './<%= def.jsorolla %>/src/lib', src: ['worker*'], dest: '<%= def.build %>/' },
                    // {   expand: true, cwd: './<%= def.jsorolla %>/build/<%= jsopkg.version %>/genome-viewer/', src: ['genome-viewer*.js', 'gv-config.js'], dest: '<%= def.build %>/' }
                    // {   expand: true, cwd: './lib', src: ['jsorolla/**'], dest: '<%= build.path %>/lib' },
                    // {   expand: true, cwd: './src', src: ['FilterHistory.js'], dest: '<%= build.path %>/src' }
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


    // Default task.   'htmlbuild', 'log-deploy'
    grunt.registerTask('clean', ['clean']);
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'processhtml', 'vulcanize', 'replace']);
};
