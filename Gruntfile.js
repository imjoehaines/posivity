module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            all: {
                src: [
                    'js/*.js',
                ],
                options: {
                    'vendor': 'lib/*.js',
                    'specs': 'tests/spec/*.js'
                }
            },

            istanbul: {
                src: '<%= jasmine.all.src %>',
                options: {
                    vendor: '<%= jasmine.all.options.vendor %>',
                    specs: '<%= jasmine.all.options.specs %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/json/coverage.json',
                        report: [
                            {type: 'html', options: {dir: 'coverage/html'}},
                            {type: 'lcov', options: {dir: 'coverage/lcov'}},
                            {type: 'text-summary'}
                        ]
                    }
                }
            },
        },

        watch: {
            js: {
                files: [
                    'js/*.js',
                    'tests/spec/*.js'
                ],
                tasks: ['jasmine:istanbul']
            }
        }
    });

    grunt.registerTask('test', ['jasmine:all']);
    grunt.registerTask('coverage', ['jasmine:istanbul']);
    grunt.registerTask('default', ['watch']);

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
