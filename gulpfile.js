const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const rename = require('gulp-rename')

const clear = (cb) => {
    del('dist')
    cb()
}

const transpile = () => {
    return src('src/loopy.js').pipe(babel()).pipe(dest('dist'))
}

const renameOutputFile = () => {
    return src('dist/loopy.js').pipe(rename('index.js')).pipe(dest('dist'))
}

const removeReplica = (cb) => {
    del('dist/loopy.js')
    cb()
}

const finish = (cb) => {
    console.log('Build is ready.')
    cb()
}

exports.default = series(clear, transpile, renameOutputFile, removeReplica, finish)
