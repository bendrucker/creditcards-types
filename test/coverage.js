'use strict'

const test = require('tape')
const fs = require('fs')
const path = require('path')
const parallel = require('run-parallel')

test('type coverage', function (t) {
  const types = path.resolve(__dirname, '..', 'types')
  const tests = path.resolve(__dirname, '..', 'test')

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
      type => t.ok(results.tests.indexOf(type) >= 0, type.split('.')[0])
    )
    t.end()
  }
})
