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
  'https://html-microservice.herokuapp.com/https://www.health.govt.nz/about-ministry/legislation-and-regulation/regulatory-impact-statements/quality-improvement-agency-health-quality-and-safety-commission-functions-powers-and-funding'

it('health.govt.nz', async () => {
  const html = await readFile(resolve(__dirname, 'input.html'))
  const metadata = await metascraper({ html, url })
  snapshot(metadata)
})
