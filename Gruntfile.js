module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Concatenate JS files into dist/pkg.name.js
    concat: {
      options: {
        separator: '/*CONCAT FILE SEPARATOR;*/'
      },
      dist: {
        // the files to concatenate
        src: ['public/**/*.js', '!public/assetts/**', '!public/dist/**'],
        // the location of the resulting JS file
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },

    // Uglify the concatenated file
    uglify: {
      options: {
        mangle: false,
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    // Define unit test directory
    qunit: {
      files: ['test/**/*.html']
    },

    // Lint js files
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'public/**/*.js', 'test/**/*.js', '!public/assetts/**', '!public/dist/**'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        // asi: true,  // disable semicolon required
        globals: {
          jQuery: true,
          console: true,
          module: true,
        }
      }
    },

    // Tasks to be run when js file is modified
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit', 'concat', 'uglify']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
