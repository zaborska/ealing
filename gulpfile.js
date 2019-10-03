const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
// const watch = require("gulp-watch");
const nunjucksRender = require("gulp-nunjucks-render");

// sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"));
});

gulp.task("template", function() {
  return gulp
    .src("./templates/pages/*.html")
    .pipe(
      nunjucksRender({
        path: ["./templates/"] // String or Array
      })
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("sass:watch", function() {
  gulp.watch("./scss/**/*.scss", gulp.series("sass"));
});

gulp.task("template:watch", function() {
  gulp.watch("./pages/**/*.html", gulp.series("template"));
});

gulp.task(
  "default",
  gulp.parallel("sass", "sass:watch", "template", "template:watch")
);
