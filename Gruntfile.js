/**
 * Created by JCLG on 4/9/2016.
 */

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({

        folderSrc : {
            css : 'src/assets/css',
            js : 'src/assets/script',
            images : 'src/assets/image',
            sounds : 'src/assets/sound',
            root : 'src',
            entry : 'index.html'
        },

        folderBuild : {
            css : 'build/assets/css',
            js : 'build/assets/script',
            images : 'build/assets/image',
            sounds : 'build/assets/sound',
            root : 'build',
            entry : 'index.html'
        },

        clean: {
            build: ['<%= folderBuild.root %>'],
            notUglifiedBundle: ['<%= folderBuild.js %>/bundle.js']
        },

        copy: {
            main: {
                files: [
                    {
                        expand: false,
                        src: ['<%= folderSrc.root %>/<%= folderSrc.entry %>'],
                        dest: '<%= folderBuild.root %>/<%= folderBuild.entry %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= folderSrc.root %>',
                        src: ['**','!**/script/**','!**/css/**'],
                        dest: '<%= folderBuild.root %>'
                    },
                ]
            }
        },

        less: {
            development: {
                options: {
                    paths: ['<%= folderSrc.css%>']
                },
                files: {
                    '<%= folderBuild.css %>/index.css' : '<%= folderSrc.css %>/*.less'
                }
            },
            production: {
                options: {
                    paths: ['<%= folderSrc.css%>'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))(/*cleanCssOptions ||*/ {})
                    ]
                },
                files: {
                    '<%= folderBuild.css %>/index.css' : '<%= folderSrc.css %>/*.less'
                }
            }
        },

        browserify: {
            bundle : {
                src : '<%= folderSrc.js %>/**',
                dest : '<%= folderBuild.js %>/bundle.js'
            }
        },

        uglify: {
            build: {
                src: '<%= folderBuild.js %>/bundle.js',
                dest: '<%= folderBuild.js %>/bundle.min.js'
            }
        },

        htmlmin : {
            options : {
                removeComment : true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                //removeOptionalTags: true
            },
            compress : {
                src: '<%= folderBuild.root %>/<%= folderBuild.entry %>',
                dest: '<%= folderBuild.root %>/<%= folderBuild.entry %>'
            }
        }

    });

    //Define the default task
    grunt.registerTask('default',['clean:build','copy','less','browserify','uglify','clean:notUglifiedBundle','htmlmin']);


};