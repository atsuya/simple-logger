'use strict'

const assert = require('assert')

const SimpleLogger = require('../lib/simple-logger')

describe('SimpleLogger', () => {
  let logger = null

  beforeEach(() => {
    logger = new SimpleLogger({ name: 'test-logger' })
  })

  afterEach(() => {
    logger = null
  })

  it('provides log levels', () => {
    assert.ok(logger.fatal)
    assert.ok(logger.error)
    assert.ok(logger.warn)
    assert.ok(logger.info)
    assert.ok(logger.debug)
  })

  //it('takes message and error', async () => {
  //  assert.ok(await logger.fatal('message', new Error()))
  //  assert.ok(await logger.error('message', new Error()))
  //  assert.ok(await logger.warn('message', new Error()))
  //  assert.ok(await logger.info('message', new Error()))
  //  assert.ok(await logger.debug('message', new Error()))
  //})

  it('returns false when NODE_ENV is set to test', async () => {
    const logger = new SimpleLogger({ name: 'test' })
    assert.equal(await logger.log('debug', 'test message'), false)
  })
})
