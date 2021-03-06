const gulp = require("gulp");
const clean = require("gulp-clean");
const sourcemaps = require("gulp-sourcemaps");
const tslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const uglify = require('gulp-uglify');

var tsProject = ts.createProject("tsconfig.json");
var distPath = tsProject.config.compilerOptions.outDir;

gulp.task("tslint", () => {
    return tsProject.src()
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task("clean", () => {
    return gulp.src(["./dist", "./src/**/*.js*", "./demo/**/*.js*"], {
        read: false
    }).pipe(clean());
});

gulp.task("compile-ts", () => {
    return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("."));
});

gulp.task("build", ["tslint", "clean", "compile-ts"], () => {
    //gulp.watch(["./src/**/*.ts", "./demo/**/*.ts"], ["compile-ts"]);
});