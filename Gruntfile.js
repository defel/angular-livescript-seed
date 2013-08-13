module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'public/css/app.css': [
            'src/sass/app.scss'
          ]
        }
      }
    },
    livescript: {
      src: {
        files: {
          'public/js/app.js': [
            'src/livescript/*/*.ls',
            'src/livescript/app.ls'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: 'src/index.html', dest: 'public/index.html'},
          {src: 'src/lib/livereload.js', dest: 'public/js/livereload.js'}
        ]
      }
    },
    concat: {
      options: {
        seperator: ';'
      },
      main: {
        src: [
          'src/lib/angular/angular.js'
        ],
        dest: 'public/js/libs.js'
      }
    }, 
    watch: {
      livescript: {
        files: ['src/livescript/*.ls', 'src/livescript/*/*.ls'],
        tasks: ['livescript'],
        options: {
          livereload: true
        }
      }, 
      index: {
        files: ['src/index.html'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['src/sass/*.scss', 'src/sass/*/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('hello', function() {
    console.log('HELLO WORLD!');
  });

  grunt.registerTask('default', ['hello', 'check-modules', 'sass', 'livescript', 'copy', 'concat']);

  grunt.loadNpmTasks('grunt-check-modules');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
}
