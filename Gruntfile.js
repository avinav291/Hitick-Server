/**
 * Created by sparsh on 20/8/16.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        removelogging: {
            dist: {
                src: "routes/*.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-remove-logging");

    grunt.registerTask("default", ["removelogging"]);

};