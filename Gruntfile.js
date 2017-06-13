module.exports = function(grunt) {

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/controllers/mainCtrl.js',
                dest: 'public/controllers/min/mainCtrl.min.js'
            }
        },
        watch: {
            files: ['public/controllers/mainCtrl.js'],
            tasks: ['uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
}
