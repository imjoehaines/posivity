module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      all: {
        src: ['js/*.js'],
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
      }
    },

    standard: {
      all: {
        src: ['js/*.js', 'tests/spec/*.js']
      }
    },

    watch: {
      js: {
        files: [
          'js/*.js',
          'tests/spec/*.js'
        ],
        tasks: ['jasmine:istanbul', 'standard:all']
      }
    },

    'gh-pages': {
      options: {
        message: 'Updates -- via grunt gh-pages'
      },
      src: [
        'js/*',
        'lib/*',
        'index.html',
        'lists.json',
        'main.css'
      ]
    }
  })

  grunt.registerTask('test', ['jasmine:all', 'standard:all'])
  grunt.registerTask('coverage', ['jasmine:istanbul'])
  grunt.registerTask('default', ['watch'])

  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-gh-pages')
  grunt.loadNpmTasks('grunt-notify')
  grunt.loadNpmTasks('grunt-standard')
}
