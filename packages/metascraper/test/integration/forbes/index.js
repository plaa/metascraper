'use strict'

const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')

const fs = require('fs')

const metascraper = require('../../..')([
  require('@plaa/metascraper-author')(),
  require('@plaa/metascraper-date')(),
  require('@plaa/metascraper-description')(),
  require('@plaa/metascraper-video')(),
  require('@plaa/metascraper-image')(),
  require('@plaa/metascraper-lang')(),
  require('@plaa/metascraper-logo')(),
  require('@plaa/metascraper-logo-favicon')(),
  require('@plaa/metascraper-publisher')(),
  require('@plaa/metascraper-title')(),
  require('@plaa/metascraper-url')(),
  require('@plaa/metascraper-readability')()
])

const readFile = promisify(fs.readFile)

const url =
  'http://www.forbes.com/sites/georgeanders/2015/09/30/facebook-veteran-grady-burnett-joins-hackerrank-as-coo'

it('forbes', async () => {
  const html = await readFile(resolve(__dirname, 'input.html'))
  const metadata = await metascraper({ html, url })
  snapshot(metadata)
})
