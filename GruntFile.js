module.exports = function(grunt) {

    grunt.initConfig({
        bower: grunt.file.readJSON('bower.json'),
        clean: {
            dist: ['dist/*'],
            html: ['html/*.html'],
            tmp : ['.tmp','dist/css','dist/scripts','**/.DS_store']
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'html/', src: ['**', '!**/*.scss'], dest: 'dist/html/'},
                    {expand: true, cwd: 'assets/images', src: ['**'], dest: 'dist/html/images/'}
                ]
            },
            js: {
                files: [
                    {src: 'dist/scripts/app.min.js', dest : 'dist/html/scripts/app.min.js'},
                    {src: 'dist/css/styles/app.min.css', dest : 'dist/html/css/styles/app.min.css'}
                ]
            },
            libs:{
                files: '<%= bower.copy %>'
            }
        },
        htmlmin: {
            dist: {
                options: { removeComments: true, collapseWhitespace: true },
                files: [
                    { expand: true, cwd: 'dist/html/', src: ['*.html', '**/*.html'], dest: 'dist/html/' }
                ]
            }
        },
        watch: {
            sass: {
              files: ['html/css/scss/*.scss'],
              tasks: ['sass'],
            }
        },
        sass: {
            dist: {
                files: [
                    {'html/css/styles/app.css': ['html/css/scss/app.scss']},
                    {'html/css/styles/app.rtl.css': ['html/css/scss/app.rtl.scss']},
                    {'html/css/bootstrap-rtl/dist/bootstrap-rtl.css': ['html/css/bootstrap-rtl/scss/bootstrap-rtl.scss']},
                    {'html/css/theme/primary.css': ['html/css/scss/theme/primary.scss']},
                    {'html/css/theme/accent.css': ['html/css/scss/theme/accent.scss']},
                    {'html/css/theme/warn.css': ['html/css/scss/theme/warn.scss']},
                    {'html/css/theme/success.css': ['html/css/scss/theme/success.scss']},
                    {'html/css/theme/info.css': ['html/css/scss/theme/info.scss']},
                    {'html/css/theme/blue.css': ['html/css/scss/theme/blue.scss']},
                    {'html/css/theme/warning.css': ['html/css/scss/theme/warning.scss']},
                    {'html/css/theme/danger.css': ['html/css/scss/theme/danger.scss']}
                ]
            }
        },
        useminPrepare: {
            html: ['html/*.html']
        },
        usemin: {
            html: ['dist/html/*.html']
        },
        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },
        assemble: {
          options: {
            layoutdir: 'views/layout/',
            partials: ['views/blocks/**/*.html' ],
            data: ['assets/data.json'],
            flatten: true,
            helpers: ['assets/assemble.js']
          },
          page: {
            options: {
              layout: 'layout.html'
            },
            src: [
                'views/**/*.html',
                '!views/blocks/**',
                '!views/layout/**'
            ],
            dest: 'html/'
          }
        }
    });

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-assemble');

    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'htmlmin',
        'copy:js',
        'clean:tmp'
    ]);

    grunt.registerTask('release', [
        'bump'
    ]);

    grunt.registerTask('html', [
        'clean:html',
        'assemble'
    ]);
};
