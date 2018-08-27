/* jshint node: true */
(function() {
  "use strict";

  const gulp = require("gulp");

  // Styles
  const sass = require("gulp-sass");
  const autoprefixer = require("gulp-autoprefixer");
  const cssnano = require("gulp-cssnano");

  // Scripts
  const usemin = require("gulp-usemin");
  const uglify = require("gulp-uglify");
  const jshint = require("gulp-jshint");
  const ngAnnotate = require("gulp-ng-annotate");
  const templateCache = require("gulp-angular-templatecache");
  const babel = require("gulp-babel");
  const jsonlint = require("gulp-jsonlint");

  // Utils
  const rev = require("gulp-rev");
  const flatten = require("gulp-flatten");
  const es = require("event-stream");
  const del = require("del");
  const url = require("url");
  const runSequence = require("run-sequence");
  const argv = require("yargs").argv;
  const addSrc = require("gulp-add-src");

  // Server
  const Server = require("karma").Server;
  const proxy = require("proxy-middleware");
  const browserSync = require("browser-sync");

  // Envs
  const localEnv = {
    apiPort: 8080,
    apiAddress: "http://localhost"
  };

  const customizacaoEnv = {
    apiPort: 8586,
    apiAddress: "http://10.13.1.13"
  };

  const produtoEnv = {
    apiPort: 8500,
    apiAddress: "http://10.13.1.11"
  };

  var dockerEnv = {
    apiPort: 8500,
    apiAddress: "http://localhost"
  };

  var selectedEnv = localEnv;

  if (argv["13"]) {
    selectedEnv = customizacaoEnv;
  }

  if (argv["11"]) {
    selectedEnv = produtoEnv;
  }

  if (argv.docker) {
    selectedEnv = dockerEnv;
  }

  var projProp = {
    app: "src/main/webapp/static/",
    appName: "les",
    dist: "src/main/resources/static/",
    tmp: ".tmp/",
    basePath: "/les/",
    port: argv.port || 9002,
    apiPort: selectedEnv.apiPort,
    apiAddress: selectedEnv.apiAddress,
    apiProxyRoutes: [
      "/rest",
      "/external",
      "/health",
      "/login",
      "/logout",
      "/warehousing",
      "/shipment",
      "/business-process",
      "/configuration"
    ]
  };

  gulp.task("clean", function(cb) {
    return del([projProp.dist], cb);
  });

  gulp.task("sass", function() {
    return gulp
      .src(projProp.app + "app/app.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(projProp.app + "/assets/styles"));
  });

  gulp.task("jshint", function() {
    return gulp
      .src([
        "gulpfile.js",
        projProp.app + "app/**/*.js",
        "!" + projProp.app + "app/i18n/**"
      ])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  gulp.task("jsonlint", function() {
    return gulp
      .src(projProp.app + "app/i18n/**/*.json")
      .pipe(jsonlint())
      .pipe(jsonlint.failOnError())
      .pipe(jsonlint.reporter());
  });

  gulp.task("usemin", ["clean", "sass", "jshint"], function() {
    return gulp
      .src(projProp.app + "index.html")
      .pipe(
        usemin({
          vendorCss: [rev],
          appCss: [autoprefixer, cssnano, rev],
          commonsJs: [rev],
          vendorJs: [rev],
          appJs: [babel, ngAnnotate, uglify, rev],
          templateCache: [
            addSrc(projProp.app + "app/**/*.html"),
            templateCache({
              root: "app",
              standalone: true
            }),
            rev,
            gulp.dest(projProp.dist + "scripts")
          ]
        })
      )
      .pipe(gulp.dest(projProp.dist));
  });

  gulp.task("copyTranslations:app", ["clean", "jsonlint"], function() {
    return es.merge(
      gulp
        .src(projProp.app + "bower_components/angular-i18n/**/*.js")
        .pipe(gulp.dest(projProp.app + "app/i18n/angular-i18n/")),
      gulp
        .src(projProp.app + "bower_components/commons-web/app/i18n/en/*.json")
        .pipe(gulp.dest(projProp.app + "app/i18n/en/commons-web/")),
      gulp
        .src(
          projProp.app + "bower_components/commons-web/app/i18n/pt-br/*.json"
        )
        .pipe(gulp.dest(projProp.app + "app/i18n/pt-br/commons-web/"))
    );
  });

  gulp.task(
    "copyTranslations:dist",
    ["clean", "jsonlint", "copyTranslations:app"],
    function() {
      return es.merge(
        gulp
          .src(projProp.app + "app/i18n/**")
          .pipe(gulp.dest(projProp.dist + "app/i18n/")),
        gulp
          .src(projProp.app + "bower_components/angular-i18n/**/*.js")
          .pipe(gulp.dest(projProp.dist + "app/i18n/angular-i18n/")),
        gulp
          .src(projProp.app + "bower_components/commons-web/app/i18n/en/*.json")
          .pipe(gulp.dest(projProp.dist + "app/i18n/en/commons-web/")),
        gulp
          .src(
            projProp.app + "bower_components/commons-web/app/i18n/pt-br/*.json"
          )
          .pipe(gulp.dest(projProp.dist + "app/i18n/pt-br/commons-web/"))
      );
    }
  );

  gulp.task("copyFont", ["clean"], function() {
    return es.merge(
      gulp
        .src(projProp.app + "assets/fonts/**/*.{woff,woff2,svg,ttf,eot}")
        .pipe(gulp.dest(projProp.dist + "assets/fonts/")),
      gulp
        .src(projProp.app + "bower_components/**/*.{woff,woff2,svg,ttf,eot}")
        .pipe(flatten())
        .pipe(gulp.dest(projProp.dist + "assets/fonts/"))
    );
  });

  gulp.task("copyImg", ["clean"], function() {
    del([
      projProp.app + "assets/img/**",
      "!" + projProp.app + "assets/img"
    ]).then(function() {
      gulp
        .src(projProp.app + "bower_components/commons-web/dist/img/**")
        .pipe(gulp.dest(projProp.app + "assets/img"))
        .pipe(browserSync.reload({ stream: true }));
    });
    return es.merge(
      gulp
        .src(projProp.app + "bower_components/commons-web/dist/img/**")
        .pipe(gulp.dest(projProp.dist + "assets/img"))
    );
  });

  gulp.task("watch", function() {
    gulp.watch(projProp.app + "assets/img/**", ["copyImg"]);

    gulp.watch(
      [
        projProp.app + "app/**/*.scss",
        projProp.app +
          "bower_components/commons-web/dist/css/commons-web.min.css"
      ],
      ["sass"]
    );
    gulp
      .watch(
        [
          projProp.app + "app/**",
          "!" + projProp.app + "app/**/*.spec.js",
          "!" + projProp.app + "app/**/demo/**",
          "!" + projProp.app + "app/i18n/angular-i18n/**"
        ],
        ["jshint"]
      )
      .on("change", browserSync.reload);
  });

  gulp.task("serve", function() {
    var dimColor = "\x1b[2m";
    var magentaColor = "\x1b[35m";
    var resetColor = "\x1b[0m";

    console.log(
      dimColor,
      "-----------------------------------------------------",
      resetColor
    );
    console.log(
      resetColor,
      "API address: ",
      magentaColor,
      selectedEnv.apiAddress,
      resetColor
    );
    console.log(
      resetColor,
      "   API port: ",
      magentaColor,
      selectedEnv.apiPort,
      resetColor
    );
    console.log(
      dimColor,
      "-----------------------------------------------------",
      resetColor
    );

    var baseUri =
      projProp.apiAddress +
      ":" +
      projProp.apiPort +
      "/" +
      projProp.appName +
      "/";
    var proxyRoutes = projProp.apiProxyRoutes;

    var requireTrailingSlash = proxyRoutes
      .filter(function(r) {
        return "/".indexOf("/", r - "/".length) !== -1;
      })
      .map(function(r) {
        return r.substr(0, r.length - 1);
      });

    var proxies = [
      function(req, res, next) {
        requireTrailingSlash.forEach(function(route) {
          if (url.parse(req.url).path === route) {
            res.statusCode = 301;
            res.setHeader("Location", route + "/");
            res.end();
          }
        });

        next();
      }
    ].concat(
      proxyRoutes.map(function(r) {
        var options = url.parse(baseUri + r);
        options.route = r;
        options.preserveHost = true;
        return proxy(options);
      })
    );

    var options = url.parse("http://localhost" + ":" + projProp.port);
    options.route = projProp.basePath;
    options.preserveHost = true;
    proxies.push(proxy(options));

    browserSync({
      open: true,
      port: projProp.port,
      startPath: projProp.basePath,
      ghostMode: false,
      server: {
        baseDir: projProp.app,
        middleware: proxies
      }
    });
  });

  gulp.task("test", function(done) {
    new Server(
      {
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
      },
      done
    ).start();
  });

  gulp.task("test:debug", function() {
    new Server({
      browsers: ["Chrome"],
      reporters: ["progress"],
      configFile: __dirname + "/karma.conf.js"
    }).start();
  });

  gulp.task("dev", ["sass", "copyTranslations:app", "copyImg"]);

  gulp.task("build", [
    "usemin",
    "sass",
    "copyTranslations:app",
    "copyTranslations:dist",
    "copyFont",
    "copyImg"
  ]);

  gulp.task("default", function(done) {
    runSequence("dev", ["serve", "watch"], done);
  });
})();
