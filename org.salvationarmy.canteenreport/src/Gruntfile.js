// Generated on 2014-10-11 using generator-brei-app 0.5.0
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadNpmTasks('grunt-exec');

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        deploy: '../www'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: [
                    '<%= yeoman.app %>/sass/{,*/}*.{scss,sass}',
                    '/img/{,*/}*.png'
                ],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.app %>/css/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '.tmp/css/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
                    '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            deploy: {
                options: {
                    force: true
                }
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,*/}*.js',
                '!<%= yeoman.app %>/js/plugins.js',
                '!<%= yeoman.app %>/js/plugins/*',
                '!<%= yeoman.app %>/js/vendor/*',
                '!<%= yeoman.app %>/js/angular/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/sass',
                //cssDir: '.tmp/css',
                cssDir: '<%= yeoman.app %>/css',
                //generatedImagesDir: '.tmp/img/generated',
                generatedImagesDir: '<%= yeoman.app %>/img/generated',
                imagesDir: '<%= yeoman.app %>/img',
                javascriptsDir: '<%= yeoman.app %>/js',
                fontsDir: '<%= yeoman.app %>/css/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img/generated',
                httpFontsPath: '../css/fonts',
                relativeAssets: false,
                outputStyle: 'compact',
                debugInfo: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/img/generated',
                    debugInfo: false,
                    outputStyle: 'compressed'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'index.html',
                        'img/{,*/}*.{webp,gif}',
                        'css/{,*/}*.{jpg,gif,png,webp}',
                        'css/fonts/{,*/}*.{eot,svg,ttf,woff,}'
                    ]
                }]
            },
            deploy: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.dist %>',
                    dest: '<%= yeoman.deploy %>',
                    src: ['./**']
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass:dist',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        exec: {
            build_ios: {
                cwd: '../',
                cmd: 'cordova build ios'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'uglify',
        'copy:dist',
        'usemin'
    ]);

    grunt.registerTask('test', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'uglify',
        'copy:dist',
        'usemin',
        'clean:deploy',
        'copy:deploy'
        //'exec:build_ios'
    ]);

    grunt.registerTask('check', [
        'jshint'
    ]);

    grunt.registerTask('deploy', [
        'clean:deploy',
        'copy:deploy'
    ]);

    grunt.registerTask('default', [
        //'jshint',
        'build'
    ]);

};
