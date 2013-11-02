module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        src: 'less/**/*.less',
        dest: 'dist/main.css',
        options: {
          dumpLineNumbers: 'comments'
        }
      },
      production: {
        src: 'less/**/*.less',
        dest: 'dist/main.css',
        options: {
          yuicompress: true
        }
      }
    },
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      less: {
        files: ['less/**/*.less'],
        tasks: ['less:development'],
        options: { nospawn: true }
      },
      node: {
        files: [
          'app.js',
          'routes/**/*.js',
          'controllers/**/*.js',
          'models/**/*.js'
        ],
        tasks: ['develop'],
        options: { nospawn: true }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'less:development',
    'develop',
    'watch'
  ]);

  grunt.registerTask('heroku', [
    'less:production'
  ]);

};
