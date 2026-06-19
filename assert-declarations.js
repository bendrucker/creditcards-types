import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

test('declarations', () => {
  const typesDir = join(import.meta.dirname, 'types')
  readdirSync(typesDir)
    .filter((filename) => filename.endsWith('.js'))
    .forEach((filename) => {
      const declaration = filename.replace('.js', '.d.ts')
      assert.ok(
        existsSync(join(typesDir, declaration)),
        `missing declaration file for ${filename}`
      )
    })
})
