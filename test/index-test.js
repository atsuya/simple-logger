'use strict'

const assert = require('assert')

describe('Index', () => {
  it('exports classes', () => {
    const index = require('../lib/')

    assert.ok(index.SimpleLogger)
  })
})
