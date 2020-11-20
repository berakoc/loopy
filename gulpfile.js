const { src, dest, series } = require('gulp')
const del = require('del')
const run = (command) => require('gulp-run')(command, {})
const uglify = require('gulp-uglify')

const clear = (cb) => {
    del('dist')
    cb()
}

const compileTypeScript = () => {
    return run('tsc').exec()
}

const minify = () => {
    return src('dist/loopy.js').pipe(uglify()).pipe(dest('dist'))
}

const finish = (cb) => {
    console.log('Build is ready.')
    cb()
}

exports.default = series(clear, compileTypeScript, minify, finish)
