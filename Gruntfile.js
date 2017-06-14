module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'public/controllers/mainCtrl.js',
    //     dest: 'public/controllers/min/mainCtrl.min.js'
    //   }
    // },

    // minifies all css files found in public/assetts/css, doesn't include already minified files
    cssmin: {
      my_target: {
        // combine: {       use this to combine multiple css files into 1 file
        //   files: {
        //     'css/style.css': ['css/style2.css', 'css/style3.css']
        //   }
        // }
        files: [{
          expand: true, // expand enables the options found below, false by default
          cwd: 'public/assetts/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'public/assetts/css/',
          ext: '.min.css'
        }]
      }
    }


    // watch: {
    //   files: ['public/controllers/mainCtrl.js'],
    //   tasks: ['uglify']
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['cssmin']);
}
