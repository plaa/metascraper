'use strict'

const { $filter, title } = require('@plaa/metascraper-helpers')

const wrap = rule => ({ htmlDom }) => {
  const value = rule(htmlDom)
  return title(value)
}

const ld = rule => ({ jsonLd }) => {
  const value = rule(jsonLd)
  return title(value)
}

module.exports = () => ({
  title: [
    ld(ld => ld.headline),
    wrap($ => $('meta[property="og:title"]').attr('content')),
    wrap($ => $('meta[name="twitter:title"]').attr('content')),
    wrap($ => $('.post-title').text()),
    wrap($ => $('.entry-title').text()),
    wrap($ => $('h1[class*="title" i] a').text()),
    wrap($ => $('h1[class*="title" i]').text()),
    wrap($ => $filter($, $('title')))
  ]
})
