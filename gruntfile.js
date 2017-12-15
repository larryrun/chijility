const webpackDevConfig = require('./webpack.dev.config');

module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          },
          {
            expand: true,
            cwd: "./views",
            src: ["**"],
            dest: "./dist/views"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [
          {src: ["src/**/*.ts", "!src/.baseDir.ts", "!src/public/**"], dest: "./dist"},
        ],
        options: {
          fast: 'never',
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
        }
      }
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      dev: webpackDevConfig    
    },
    watch: {
      ts: {
        files: ["src/**/*.ts"],
        tasks: ["ts"]
      },
      views: {
        files: ["views/**/*.ejs"],
        tasks: ["copy"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask("default", [
    "copy",
    "ts",
    "webpack"
  ]);

};