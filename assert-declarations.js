const fs = require('fs')

fs.readdirSync('./types').forEach((filename) => {
  if (!fs.existsSync(`./types/${filename.replace('.js', '.d.ts')}`)) {
    process.exitCode = 1
    console.log(`missing declaration file for ${filename}`)
  }
})
