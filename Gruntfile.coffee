module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        cssmin:
            options:
                sourceMap: true
            build:
                files:
                    'build/app.min.css': [
                        'src/css/app.css'
                    ]

        'gh-pages':
            options:
                base: '.'
            src: [
                'build/index.html'
                'build/app.min.css'
                'build/app.min.js'
                'build/require.min.js'
            ]

        htmlmin:
            build:
                options:
                    removeComments: true
                    collapseWhitespace: true
                files:
                    'build/index.html': 'src/index.html'

        jsdoc:
            doc:
                src: [
                    'src/js/*.js'
                ]
                dest: 'docs/'
                options:
                    readme: 'README.md'

        jshint:
            beforeconcat: [
                'src/js/*.js'
            ]
            # afterconcat: [
            #     'build/app.min.js'
            # ]
            options:
                jshintrc: true

        "mocha-chai-sinon":
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['test/**/*.spec.js']

        uglify:
            build:
                options:
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: true
                files:
                    'build/app.min.js': [ 'src/app.js' ]

        watch:
            scripts:
                files: [
                    'src/js/*.js'
                    'src/css/*.css'
                ]
                tasks: [
                    'cssmin'
                    'uglify'
                    'jshint'
                    'gh-pages'
                    # 'mocha-chai-sinon'
                ]
            test:
                files: [
                    'test/**/*.spec.js'
                ]
                tasks: [
                    'mocha-chai-sinon'
                ]

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-gh-pages'
    grunt.loadNpmTasks 'grunt-jsdoc'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'
    grunt.loadNpmTasks 'grunt-notify'

    # Default task(s).
    grunt.registerTask 'default', [
        'htmlmin'
        'cssmin'
        'uglify'
        'gh-pages'
        'watch'
    ]
    # grunt.registerTask 'test', ['mocha-chai-sinon']
