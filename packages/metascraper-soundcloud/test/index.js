'use strict'

const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')
const fs = require('fs')

const metascraper = require('@plaa/metascraper')([
  require('@plaa/metascraper-soundcloud')(),
  require('@plaa/metascraper-author')(),
  require('@plaa/metascraper-date')(),
  require('@plaa/metascraper-description')(),
  require('@plaa/metascraper-image')(),
  require('@plaa/metascraper-lang')(),
  require('@plaa/metascraper-logo')(),
  require('@plaa/metascraper-logo-favicon')(),
  require('@plaa/metascraper-publisher')(),
  require('@plaa/metascraper-title')(),
  require('@plaa/metascraper-url')()
])

const readFile = promisify(fs.readFile)

describe('@plaa/metascraper-soundcloud', () => {
  it('song', async () => {
    const html = await readFile(resolve(__dirname, 'fixtures/song.html'))
    const url = 'https://soundcloud.com/beautybrainsp/beauty-brain-swag-bandicoot'

    const metadata = await metascraper({ html, url, escape: false })
    snapshot(metadata)
  })
})
