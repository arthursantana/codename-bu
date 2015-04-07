module.exports = function(grunt) {
   require('time-grunt')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: ["dist"],

      jshint: {
         all: ['Gruntfile.js', 'client/js/*.js'],
         options: {
            strict: false,
            globalstrict: true
         }
      },

      copy: {
         main: {
            expand: true,
            cwd: 'client/',
            src: 'index.html',
            dest: 'dist/'
         },
         phaser: {
            expand: true,
            cwd: 'client/bower_components/phaser/build',
            src: 'phaser.min.js',
            dest: 'dist/js/'
         },
         tilesets: {
            expand: true,
            cwd: 'client/img/tilesets',
            src: '*',
            dest: 'dist/img/tilesets'
         },
         maps: {
            expand: true,
            cwd: 'client/maps',
            src: '*',
            dest: 'dist/maps'
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

      watch: {
         options: {
            livereload: true,
         },
         everything: {
            files: ['client/*', 'client/*/*', 'client/*/*/*'],
            tasks: ['build'],
            options: {
               spawn: true,
            },
         } 
      }

   });

   grunt.registerTask('default', ['build']);

   grunt.registerTask('build', [
      'clean',
      'jshint',
      'copy',
      'imagemin',
      'useminPrepare',
      'concat:generated',
      'uglify:generated',
      'usemin']);

   require('load-grunt-tasks')(grunt);
};
