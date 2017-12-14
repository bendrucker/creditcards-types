'use strict'

var test = require('tape')
var fs = require('fs')
var path = require('path')
var parallel = require('run-parallel')

test('type coverage', function (t) {
  var types = path.resolve(__dirname, '..', 'types')
  var tests = path.resolve(__dirname, '..', 'test')

  parallel({
    types: ListModules(types),
    tests: ListModules(tests)
  }, onResults)

  function ListModules (dirname) {
    return function listModules (callback) {
      fs.readdir(dirname, function (err, files) {
        if (err) return callback(err)
        callback(null, files.filter(f => f.endsWith('.js')))
      })
    }
  }

  function onResults (err, results) {
    if (err) return t.end(err)
    results.types.forEach(
      type => t.ok(results.tests.includes(type), type.split('.')[0])
    )
    t.end()
  }
})
