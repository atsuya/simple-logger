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

  // un-skip this test if there is a better way to test this...
  it.skip('takes message and error', async () => {
    assert.ok(await logger.fatal('message', new Error()))
    assert.ok(await logger.error('message', new Error()))
    assert.ok(await logger.warn('message', new Error()))
    assert.ok(await logger.info('message', new Error()))
    assert.ok(await logger.debug('message', new Error()))
  })

  it('returns false when NODE_ENV is set to test', async () => {
    const logger = new SimpleLogger({ name: 'test' })
    assert.equal(await logger.log('debug', 'test message'), false)
  })

  it('allows to set a level', async () => {
    let logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_FATAL,
    })
    assert.strictEqual(await logger.getLevel(), 'fatal')

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_ERROR,
    })
    assert.strictEqual(await logger.getLevel(), 'error')

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_WARN,
    })
    assert.strictEqual(await logger.getLevel(), 'warn')

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_INFO,
    })
    assert.strictEqual(await logger.getLevel(), 'info')

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_DEBUG,
    })
    assert.strictEqual(await logger.getLevel(), 'debug')
  })

  it('logs only when a specificed level <= a logger level', async () => {
    let logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_DEBUG,
    })
    assert.strictEqual(logger.shouldLog(SimpleLogger.LEVEL_FATAL), true)

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_INFO,
    })
    assert.strictEqual(logger.shouldLog(SimpleLogger.LEVEL_DEBUG), false)

    logger = new SimpleLogger({
      name: 'test',
      level: SimpleLogger.LEVEL_ERROR,
    })
    assert.strictEqual(logger.shouldLog(SimpleLogger.LEVEL_ERROR), true)
  })
})
