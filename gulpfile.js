'use strict';

var fs = require('fs');
var paths = require('path');

// Подключение плагинов
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    svgSprite = require('gulp-svg-sprite'),
    imageResize = require('gulp-image-resize'),
    bulkSass = require('gulp-sass-glob-import'),
    include = require("gulp-include"),
    autoprefixer = require('gulp-autoprefixer'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    htmltidy = require('gulp-htmltidy'),
    htmlbeautify = require('gulp-html-beautify'),
    replace = require('gulp-replace-task'),
    fileinclude = require('gulp-file-include'),
    ftp = require('vinyl-ftp'),
    gutil = require('gulp-util');


//конфиги

var autoPrefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'ie > 8', 'safari 5', 'opera 12.1'],
    cascade: true,
}

var plumberCfg = {
    errorHandler:
        notify.onError({
            message: "Error: <%= error.message %>",
        })
};


var fileIncludeCfgDev = {
    prefix: '@@',
    basepath: '@root',
    context: {
        htmlFlag: (function () {
            var p = fs.existsSync(paths.join(__dirname, './pages-list'));

            return p ? 'dev' : null;
        }())
    }
};
var fileIncludeCfgProd = {
    prefix: '@@',
    basepath: '@root',
    context: {
        htmlFlag: 'prod'
    }
};
var formatHTML = {
    "indent_size": 2,
    "indent_char": "  ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": true,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": true
}

var imgResizeCfg = {
    width: '50%',
    height: '50%',
    crop: false,
    upscale: false
};

var spriteDefaultCfg = {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../img/sprite.png',
    padding: 5
};

var spriteMithRetinaCfg = {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../img/sprite.png',
    retinaImgName: 'sprite@2x.png',
    retinaSrcFilter: ['src/static/assets/img/sprite/retina/**/*_2x.png'],
    retinaImgPath: '../img/sprite@2x.png',
    padding: 5
}

var spriteSvgCfg = {
    "mode": {
        "css": {
            "spacing": {
                "padding": 5
            },
            "dest": "./",
            "layout": "horizontal",
            "sprite": "sprite-svg.svg",
            "bust": false,
            "render": {
                "scss": {
                    "dest": "_sprite-svg.scss",
                }
            }
        }
    }
}

var svgSymbol = {
    mode: {
        view: {
            bust: false
        },
        symbol: true
    }
};

// Пути для сборки
var path = {
    build: {
        root: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        fonts: 'build/fonts/',
        img: 'build/img/',
        pic: 'build/pic',
        svg: 'src/static/assets/img/svg/',
        html: 'build/*.html',
        svgHtml: 'build/img'
    },
    src: {
        root: 'src/',
//      html: ['src/pages/*.html', 'src/static/assets/img/svg.html'],
        html: 'src/pages/*.html',
        svgHtml: 'src/static/assets/img/svg.html',
        js: 'src/static/scripts/*.js',
        styles: 'src/static/styles/',
        sass: ['src/static/styles/main.scss', 'src/static/styles/other/*.scss'],
        img: ['src/static/assets/img/**/*.*', '!src/static/assets/img/sprite/**/*.*', '!src/static/assets/img/svg/**/*.*', '!src/static/assets/img/**/*.html'],
        pic: ['src/static/assets/pic/**/*.jpg', 'src/static/assets/pic/**/*.png'],
        fonts: 'src/static/assets/fonts/**/*.*',
        spr: {
            default: 'src/static/assets/img/sprite/default/*.png',
            retina2x: 'src/static/assets/img/sprite/retina/2x/*.png',
            retina1x: 'src/static/assets/img/sprite/retina/1x/',
            retina: 'src/static/assets/img/sprite/retina/**/*.png',
            svg: 'src/static/assets/img/sprite/svg/**/*.svg'
        },
        ajax: 'pages-list/**/*.*',
        modules: 'src/modules/**/*.scss'
    },
    watch: {
        html: ['src/pages/**/*.html', 'src/modules/**/*.html'],
        svgHtml: 'src/static/assets/img/svg.html',
        sass: 'src/static/styles/**/*.scss',
        fonts: 'src/static/assets/fonts/**/*.*',
        js: ['src/static/scripts/**/*.js', 'src/modules/**/*.js'],
        pic: 'src/static/assets/pic/**/*.*',
        img: ['src/static/assets/img/**/*.*', '!src/static/assets/img/sprite/**/*.*', '!src/static/assets/img/svg/**/*.*'],
        spr: {
            svg: 'src/static/assets/img/sprite/svg/**/*.svg',
            retina2x: 'src/static/assets/img/sprite/retina/2x/*.png',
            default: 'src/static/assets/img/sprite/default/*.png',
        }

    },
    clean: ['build', 'build/css/main.css', 'build/*.html']
};

// Конфиги для локального вебсервера
var webserver = {
    dev: {
        server: {
            baseDir: './build'
        },

        // tunnel: true,
        // host: 'localhost',
        // port: 9001,
        //logPrefix: 'app_dev'
    },
    prod: {
        server: {
            baseDir: './build'
        },
        //tunnel: true,
        //host: 'localhost',
        //port: 9002,
        //logPrefix: 'app_prod'
    }
};

// Очистка папок и файлов
gulp.task('clean', function () {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

//---------------------------------------//
// Компиляция SASS
//---------------------------------------//

//Чистим css
gulp.task('clean:css', function (cb) {
    return gulp.src(path.build.css, {read: false}).pipe(clean());
});

//development
gulp.task('sass:dev', function () {
    return gulp.src(path.src.sass)
        .pipe(plumber(plumberCfg))
        .pipe(sourcemaps.init())
        .pipe(bulkSass())
        .pipe(sass())
        .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

// production
gulp.task('sass:prod', function () {
    return gulp.src(path.src.sass)
        .pipe(plumber(plumberCfg))
        .pipe(bulkSass())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(gulp.dest(path.build.css));
});

//---------------------------------------//
// Спрайты
//---------------------------------------//

//спрайты
gulp.task('sprite:default', function () {
    var spriteData =
        gulp.src(path.src.spr.default, {read: false})
            .pipe(plumber(plumberCfg))
            .pipe(spritesmith(spriteDefaultCfg))
    spriteData.img.pipe(gulp.dest(path.build.img));   // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(path.src.styles));  // путь, куда сохраняем стили
    return spriteData;
});

gulp.task('clean:1x', function (cb) {
    return gulp.src(path.src.spr.retina1x, {read: false}).pipe(clean());
});

gulp.task('retina:resize', ['clean:1x'], function (cb) {
    var ret = gulp.src(path.src.spr.retina2x)
        .pipe(plumber(plumberCfg))
        .pipe(rename(function (path) {
            path.basename = path.basename.slice(0, -3);
        }))
        .pipe(imageResize(imgResizeCfg))
        .pipe(gulp.dest(path.src.spr.retina1x));

    return ret;
});

gulp.task('sprite:retina', ['retina:resize'], function () {
    var spriteData =
        gulp.src(path.src.spr.retina)
            .pipe(plumber(plumberCfg))
            .pipe(spritesmith(spriteMithRetinaCfg));
    spriteData.img.pipe(gulp.dest(path.build.img));
    spriteData.css.pipe(gulp.dest(path.src.styles));

    return spriteData;
});

gulp.task('sprite:svg', function () {
    gulp.src(path.src.spr.svg)
        .pipe(plumber(plumberCfg))
        .pipe(svgSprite(svgSymbol))
        .pipe(gulp.dest(path.build.svg));
});

//---------------------------------------//
// Оптимизация изображений
//---------------------------------------//
//Чистим pic
gulp.task('clean:pic', function (cb) {
    return gulp.src(path.build.pic, {read: false}).pipe(clean());
});
gulp.task('img:pic', function () {
    gulp.start('clean:pic');
    gulp.src(path.src.pic)
    // .pipe(imagemin({
    //     progressive: true,
    //     svgoPlugins: [{removeViewBox: false}],
    //     use: [pngquant()],
    //     interlaced: true
    // }))
        .pipe(gulp.dest(path.build.pic));
});
//Чистим img
gulp.task('clean:img', function (cb) {
    return gulp.src(path.build.img, {read: false}).pipe(clean());
});
var imgTimer;
gulp.task('img:img', function () {
    clearTimeout(imgTimer);
    gulp.start('clean:img');
    imgTimer = setTimeout(function () {
        gulp.start('sprite:retina');
        gulp.start('sprite:default');
        gulp.start('sprite:svg');

        return gulp.src(path.src.img)
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
            .pipe(gulp.dest(path.build.img));
    }, 300)


});


//---------------------------------------//
// Склеивание скриптов
//---------------------------------------//
gulp.task('scripts:dev', function () {
    return gulp.src(path.src.js)

        .pipe(include({
            hardFail: true,
            includePaths: [
                __dirname + '/',
                __dirname + '/bower_components',
                __dirname + '/node_modules',
                __dirname + '/src/static/scripts/'
            ]
        }))
        //.pipe(concat('scripts.js'))
        .pipe(removeEmptyLines({
            removeComments: true
        }))
        .pipe(gulp.dest(path.build.js));
});
// 
gulp.task('scripts:build', function () {
    return gulp.src(path.src.js)
        .pipe(include({
            hardFail: true,
            includePaths: [
                __dirname + '/',
                __dirname + '/bower_components',
                __dirname + '/node_modules',
                __dirname + '/src/static/scripts/'
            ]
        }))
        //.pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

//---------------------------------------//
// Перенос шрифтов
//---------------------------------------//

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

//---------------------------------------//
// Сборка svg html
//---------------------------------------//

gulp.task('clean:svgHtml', function (cb) {
    return gulp.src(path.build.svgHtml, {read: false}).pipe(clean());
});

gulp.task('svgHtml', function () {

    gulp.src(path.src.svgHtml)
        .pipe(plumber(plumberCfg))
        .pipe(fileinclude(fileIncludeCfg))
        .pipe(gulp.dest(path.build.svgHtml))
});

gulp.task('svgSpriteCompl', gulpsync.sync([
    'sprite:svg',
    'svgHtml'
]))

//---------------------------------------//
// Сборка html
//---------------------------------------//

//Чистим html
gulp.task('clean:html', function (cb) {
    return gulp.src(path.build.html, {read: false}).pipe(clean());
});

gulp.task('html:dev', function () {

    gulp.src(path.src.html)
        .pipe(plumber(plumberCfg))
        .pipe(fileinclude(fileIncludeCfgDev))
        .pipe(gulp.dest(path.build.root));

    gulp.src(path.src.svgHtml)
        .pipe(plumber(plumberCfg))
        .pipe(fileinclude(fileIncludeCfgDev))
        .pipe(gulp.dest(path.build.svgHtml))
});

// production
gulp.task('html:prod', function () {
    gulp.src(path.src.html)
        .pipe(plumber(plumberCfg))
        .pipe(fileinclude(fileIncludeCfgProd))
        .pipe(replace({
            patterns: [
                {
                    match: /(@@[a-zA-Z_]+)/g,
                    replacement: ' '
                }
            ]
        }))
        .pipe(htmltidy({
            indent: true
        }))
        .pipe(htmlbeautify(formatHTML))
        .pipe(gulp.dest(path.build.root));

    gulp.src(path.src.svgHtml)
        .pipe(plumber(plumberCfg))
        .pipe(fileinclude(fileIncludeCfgDev))
        .pipe(gulp.dest(path.build.svgHtml))
});

//ajax
gulp.task('ajax:dev', function () {
    gulp.src(path.src.ajax)
        .pipe(gulp.dest(path.build.root))
});

//---------------------------------------//
// watch
//---------------------------------------//

var sassTimer;
var htmlTimer;
gulp.task('watch', function () {
    watch(path.watch.html, function (event, cb) {
        gulp.start('html:dev');
        clearTimeout(htmlTimer);
        htmlTimer = setTimeout(function () {
            gulp.start('pagesList');
        }, 400)

    });
    watch([path.watch.sass, path.src.modules], function (event, cb) {
        clearTimeout(sassTimer);
        sassTimer = setTimeout(function () {
            gulp.start('sass:dev');
        }, 400);
    });
    watch(path.watch.js, function (event, cb) {
        gulp.start('scripts:dev');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.spr.svg], function (event, cb) {
        gulp.start('sprite:svg');
    });
    watch([path.watch.spr.default], function (event, cb) {
        gulp.start('sprite:default');
    });
    watch([path.watch.spr.retina2x], function (event, cb) {
        gulp.start('sprite:retina');
    });
    watch([path.watch.pic], function (event, cb) {
        gulp.start('img:pic');
    });
    watch(path.watch.img, function (event, cb) {
        gulp.start('img:img');
    });
});


//---------------------------------------//
// сервер
//---------------------------------------//
// development
gulp.task('webserver:dev', function () {
    browserSync([path.build.css, path.build.js], webserver.dev);
    setTimeout(function () {
        gulp.start('pagesList');
    }, 1000);
});

// production
gulp.task('webserver:prod', function () {

    browserSync(webserver.prod);

});

gulp.task('pagesList', function () {
    var p = fs.existsSync(paths.join(__dirname, './pages-list'));
    if (p) {
        function getFiles(dir, files_) {
            files_ = files_ || [];
            var files = fs.readdirSync(dir);
            for (var i in files) {
                var name = dir + '/' + files[i];
                if (fs.statSync(name).isDirectory()) {
                    getFiles(name, files_);
                } else {
                    files_.push(name);
                }
            }

            return files_;
        }

        function filterArray(array) {
            var res = [];
            var rx = /^.+\.html?$/;

            for (var i = 0; i < array.length; i++) {
                var elem = array[i];

                var match = rx.test(elem);
                if (match) {
                    var arr = elem.split('/');
                    if (arr.length == 2) {
                        res.push(arr[1]);
                    }

                }

            }

            return res;

        }

        var pathBuild = paths.join(__dirname, './build');
        var allFiles = getFiles(pathBuild);
        var elems = filterArray(allFiles);

        var stream = fs.createWriteStream("./build/ajax.pages-list.text");
        fs.writeFileSync('./build/ajax.pages-list.text', elems);
    }
});


// Режим разработки
gulp.task('develop', gulpsync.sync([
    'clean:html',
    'clean:css',
    'clean:pic',
    [

        'sass:dev',
        'img:pic',
        'img:img',
        'fonts:build',
        'scripts:dev',
        'sprite:retina',
        'sprite:default',
        'sprite:svg'

    ],
    'html:dev',
    'ajax:dev',
    'watch',
    'webserver:dev'
]));

// Режим production
gulp.task('production', gulpsync.sync([
    'clean',
    [
        'html:prod',
        'sass:prod',
        'img:pic',
        'img:img',
        'fonts:build',
        'scripts:build',
        'sprite:retina',
        'sprite:default',
        'sprite:svg'
    ]
]));


/*
key.json <= IGNORE IT !!!
{
  "host": "host",
  "user": "user",
  "pass": "1234"
}
*/


var keyFile = './key.json';

if (fs.existsSync(keyFile)) {
    var key = require('./key');

    gulp.task('deploy', function () {

        var conn = ftp.create({
            host: key.host,
            user: key.user,
            password: key.pass,
            parallel: 10,
            log: gutil.log
        });

        var globs = ['build/**/*.*'];

        return gulp.src(globs, {base: '', buffer: false})
        //.pipe(conn.newer('/')) // only upload newer files (don't work on windows)
            .pipe(conn.dest('/'))
            .pipe(notify({
                message: 'Finished deployment.',
                onLast: true
            }));
    });
} else {
    console.log('KEY_FILE DOES NOT EXIST => deploy task DISABLED');
}
