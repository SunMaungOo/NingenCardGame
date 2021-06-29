const gulp = require("gulp");

const browserify = require("browserify");

const source = require("vinyl-source-stream");

const tsify = require("tsify");

const paths ={
  deck:{
    taskName:"copy-prototype-deck",
    basePath:"prototype/deck",
    jsPath:"./deck/js",
    //specific the source file
    srcPath:["src/prototype/deck-prototype.ts"],
    bundleName:"proto-deck-bundle.js"
  },

  network:{
    taskName:"copy-prototype-network",
    basePath:"prototype/network",
    jsPath:"./network/js",
    //specific the source file
    srcPath:["src/prototype/network-prototype.ts"],
    bundleName:"proto-network-bundle.js"    
  }
};

gulp.task(paths.deck.taskName,function(){
  return gulp.src(`${paths.deck.basePath}/*.html"`).pipe(gulp.dest("dist"));
});

function browserPipe(bundleName,jsPath){

  return function () {
    return browserify({
      basedir: "../.",
      debug: true,
      entries: paths.deck.srcPath,
      cache: {},
      packageCache: {},
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(bundleName))
    .pipe(gulp.dest(jsPath));
  }  
}

gulp.task(
  "default",
  gulp.series(gulp.parallel(paths.deck.taskName),
  browserPipe(paths.deck.bundleName,paths.deck.jsPath))
);

