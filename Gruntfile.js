module.exports = function(grunt) {
   require('time-grunt')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: [".tmp", "dist"],

      /*
      copy: {
         main: {
            expand: true,
            cwd: 'client/',
            src: 'index.html',
            dest: 'dist/'
         },
      },
     */

      concat: {   
         libs: {
            src: ['client/bower_components/*/*.min.js'],
            dest: 'dist/js/libs.min.js',
         },
         app: {
            src: ['client/js/*.js'],
            dest: '.tmp/js/app.js'
         }
      },

      uglify: {
         app: {
            src: '.tmp/js/app.js',
            dest: 'dist/js/app.min.js'
         }
      },

      imagemin: {
         dynamic: {
            files: [{
               expand: true,
               cwd: 'client/img/',
               src: ['*.{png,jpg,gif}'],
               dest: 'dist/img/'
            }]
         }
      },

      /*
      filerev: {
         options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 8
         }, 
         js: {
            src: ['dist/js/*.js'],
         },
         images: {
            src: 'dist/img/*.{png,jpg,gif}',
         }
      },
     */

      jshint: {
         all: ['Gruntfile.js', 'client/js/*.js'],
         options: {
            "predef": ["angular"],
            strict: false,
            node: true
         }
      },

      /*
      'useminPrepare': {
         options: {
            dest: 'dist'
         },
         html: 'client/index.html'
      },

      usemin: {
         html: ['dist/index.html'],
         options: {
            assetDirs: ['dist/img'],
         }
      },
     */

      sass: {
         dist: {
            options: {
               style: 'compressed'
            },
            files: [{
               expand: true,
               cwd: 'client/scss',
               src: ['*.scss'],
               dest: 'dist/css',
               ext: '.css'
            }]
         } 
      },

      watch: {
         options: {
            livereload: true,
         },
         everything: {
            files: ['client/*', 'client/*/*', 'client/*/*/*'],
            tasks: ['build'],
            options: {
               spawn: false,
            },
         } 
      }

   });

   grunt.registerTask('default', ['build', 'watch']);

   grunt.registerTask('build', [
      'clean',
      'newer:jshint',
      //'useminPrepare',
      //'newer:copy',
      //'newer:concat:generated',
      //'uglify:generated',
      'newer:concat',
      'newer:uglify',
      'newer:imagemin',
      'newer:sass']);
      //'filerev',
      //'usemin']);

   require('load-grunt-tasks')(grunt);
};
