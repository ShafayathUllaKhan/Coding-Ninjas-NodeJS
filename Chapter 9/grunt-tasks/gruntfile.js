module.exports = function(grunt){

    // configure the tasks.
    grunt.initConfig({
        // specify tasks
        uglify:{
            target:{
                files:{
                    "dest/js/main.min.js":["src/js/*.js"]
                }
            }
        },

        // configure ninify css.

        cssmin:{
            target:{
                files:[
                    {
                        expand:true, // for managing paths
                        cwd:"src/css",
                        src:["*.css", "!*.min.css"],
                        dest:"dest/css",
                        ext:".min.css"
                    }
                ]
            }
        }
    })

    // load libraries
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // setting up tasks
    grunt.registerTask('default',['uglify','cssmin']);

    // to run type grunt
}