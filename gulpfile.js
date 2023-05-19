
/*

	gulp start -> start gulp with open in new tab browser
	gulp -> (default) start gulp WITHOUT open in new tab browser

*/


const { src, dest, watch, parallel, series } = require('gulp');


const scss			= require('gulp-sass')(require('sass')),
	  fs			= require('fs'),
	  concat		= require('gulp-concat'),
	  replace		= require('gulp-replace'),
	  avif			= require('gulp-avif'),
	  webp			= require('gulp-webp'),
	  imagemin		= require('gulp-imagemin'),
	  newer			= require('gulp-newer'),
	  beautify		= require('gulp-beautify'),
	  browserSync	= require('browser-sync').create(),
	  uglify		= require('gulp-uglify-es').default,
	  autoprefixer	= require('gulp-autoprefixer'),
	  del			= require('del'),
	  include		= require('gulp-file-include'),
	  cssbeautify	= require('gulp-cssbeautify'),
	  minCSS		= require('gulp-cssmin'),
	  mediaGroup	= require('gulp-group-css-media-queries'),
	  ttf2woff		= require('gulp-ttf2woff'),
	  ttf2woff2		= require('gulp-ttf2woff2'),
	  zipArchive	= require('gulp-zip');





function cleanDist() {
	return del('dist')
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		notify: false,
		open: false,
	})
}

function browsersyncStart() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		notify: false,
	})
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function images() {
	return src(['app/img/**/*.*', '!app/img/**/*.webp', '!app/img/**/*.svg'])
	.pipe(newer('dist/img'))
	.pipe(avif({ quality: 50 }))

	.pipe(src('app/img/**/*.*'))
	.pipe(newer('dist/img'))
	.pipe(webp())

	.pipe(src('app/img/**/*.*'))
	.pipe(newer('dist/img'))
	.pipe(imagemin())


	.pipe(dest('dist/img'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function scriptsLib() {
	return src([
		'node_modules/swiper/swiper-bundle.min.js', // Слайдер
		'node_modules/intl-tel-input/build/js/intlTelInput.min.js', // TEL input
		//'node_modules/vanilla-lazyload/dist/lazyload.min.js', // Lazyload img | npm i vanilla-lazyload --save-dev | https://www.npmjs.com/package/vanilla-lazyload
		'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js', // Полифил для window.scroll() | npm i smoothscroll-polyfill --save-dev
		//'node_modules/clipboard/dist/clipboard.min.js', // Копирование в буфер обмена | npm i clipboard --save-dev | https://www.npmjs.com/package/clipboard
		'node_modules/aos/dist/aos.js', // Анимация | npm i aos --save-dev | https://www.npmjs.com/package/aos
		'node_modules/slim-select/dist/slimselect.min.js', // Select | npm i slim-select --save-dev | https://www.npmjs.com/package/slim-select
		'node_modules/vanillajs-datepicker/dist/js/datepicker.min.js', // Datepicker
		'node_modules/vanillajs-datepicker/dist/js/locales/uk.js', // Datepicker
		//'node_modules/sticky-js/dist/sticky.min.js' // Sticky | npm i sticky-js --save-dev | https://www.npmjs.com/package/sticky-js
		//'node_modules/nouislider/dist/nouislider.min.js', // Кастомный input[range] | npm i nouislider --save-dev | https://www.npmjs.com/package/nouislider
		//'node_modules/fslightbox/index.js', // Галерея | npm i fslightbox --save-dev | https://www.npmjs.com/package/fslightbox
		//'node_modules/chart.js/dist/chart.min.js', // График | npm i chart.js --save-dev | https://www.npmjs.com/package/chart.js
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function scriptsMin() {
	return src('app/js/main.js')
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src('app/js/main.js')
	.pipe(scriptsMin())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function htmlCompilation() {
	return src(['app/*.html'])
	.pipe(include())
	.pipe(beautify.html({ indent_size: 1, indent_char: "	" }))
	.pipe(replace(/<!-- CRITICAL_CSS -->/, function(s) {
		var style = fs.readFileSync('dist/css/style-critical.min.css');
		return '<!-- critical-start -->\n\u0009<style>' + style + '</style>\n\u0009<!-- critical-end -->';
	}))
	.pipe(dest('dist'))
	.pipe(browserSync.stream())
}

function htmlComponents() {
	return src('app/html/**/_*.html')
	.pipe(include())
	.pipe(htmlCompilation())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(mediaGroup())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			cascade: false
		}))
		.pipe(minCSS())
		.pipe(concat('style.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function criticaLStyles() {
	return src('app/scss/style-critical.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(mediaGroup())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			cascade: false
		}))
		.pipe(minCSS())
		.pipe(concat('style-critical.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function stylesOriginal() {
	return src(['dist/css/style.min.css', 'dist/css/style-critical.min.css'])
		.pipe(concat('style.css'))
		.pipe(cssbeautify())
		.pipe(dest('dist/css'))
}

function stylesLib() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/swiper/swiper-bundle.min.css', // Слайдер
		'node_modules/slim-select/dist/slimselect.css', // Select
		'node_modules/intl-tel-input/build/css/intlTelInput.min.css', // TEL input
		'node_modules/vanillajs-datepicker/dist/css/datepicker.min.css', // Datepicker
		'node_modules/aos/dist/aos.css', // Анимация
		//'node_modules/nouislider/dist/nouislider.css', // Кастомный input[range]
	])
	.pipe(concat('libs.css'))
	.pipe(dest('dist/css'))
}

function criticalReplace() {
	return src('dist/**/*.html')
	.pipe(replace(/<!-- CRITICAL_CSS -->/, function(s) {
		var style = fs.readFileSync('dist/css/style-critical.min.css');
		return '<style>' + style + '</style>';
	}))
	.pipe(dest('dist'));
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function ttf2woffConvert() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(dest('dist/css'))
}

function ttf2woff2Convert() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('dist/css'))
}

function fonts() {
	return src('app/css/*.woff', 'app/css/*.woff2')
		.pipe(dest('dist/css'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function json() {
	return src('app/json/*.json')
		.pipe(dest('dist/json'))
}

function video() {
	return src('app/video/*')
		.pipe(dest('dist/video'))
}

function audio() {
	return src('app/audio/*')
		.pipe(dest('dist/audio'))
}

let package = fs.readFileSync('package.json'),
	name;

	package = JSON.parse(package);
	name = package.name;

function delFolder() {
	return del(`${name}`)
}

function createFolder() {
	return src(['./**', '!./node_modules/**', '!./package-lock.json', `!./${name}.zip`])
		.pipe(dest(`./${name}`))
}

function createZip() {
	return src(`./${name}/**`)
		.pipe(zipArchive(`${name}.zip`))
		.pipe(dest(`./`))
}

function zipDel() {
	return del(`${name}`);
}

function sprites() {
	return src(`app/img/sprites.svg`)
		.pipe(dest(`dist/img`))
}

function watching() {
	watch(['app/scss/**/*.scss'], series(styles, criticaLStyles, stylesOriginal));
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/json/*.json'], json);
	watch(['app/video/*.*'], video);
	watch(['app/audio/*.*'], audio);
	watch(['app/img/sprites.svg'], sprites);
	watch(['app/*.html'], htmlCompilation);
	watch(['app/html/**/_*.html'], htmlComponents);
}

exports.images = images;
exports.criticalReplace = criticalReplace;
exports.styles = styles;
exports.criticaLStyles = criticaLStyles;
exports.stylesOriginal = stylesOriginal;
exports.watching = watching;
exports.browsersyncStart = browsersyncStart;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsMin = scriptsMin;
exports.scriptsLib = scriptsLib;
exports.cleanDist = cleanDist;
exports.stylesLib = stylesLib;
exports.ttf2woffConvert = ttf2woffConvert;
exports.ttf2woff2Convert = ttf2woff2Convert;
exports.fonts = fonts;
exports.htmlComponents = htmlComponents;
exports.htmlCompilation = htmlCompilation;
exports.createFolder = createFolder;
exports.delFolder = delFolder;
exports.createZip = createZip;
exports.zipDel = zipDel;

exports.fonts = series(ttf2woffConvert, ttf2woff2Convert, fonts);
exports.folder = series(delFolder, createFolder);
exports.zip = series(createFolder, createZip, zipDel);
exports.start = parallel(stylesLib, styles, watching, scriptsLib, scriptsMin, scripts, htmlCompilation, json, sprites, browsersyncStart);
exports.default = parallel(stylesLib, styles, watching, scriptsLib, scriptsMin, scripts, htmlCompilation, json, sprites, browsersync);
