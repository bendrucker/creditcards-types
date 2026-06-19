import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

test('type coverage', () => {
  const jsFiles = (dir) =>
    readdirSync(join(import.meta.dirname, dir)).filter((f) => f.endsWith('.js'))

  const types = jsFiles(join('..', 'types'))
  const tests = jsFiles('.')

  types.forEach((type) => assert.ok(tests.includes(type), type.split('.')[0]))
})
