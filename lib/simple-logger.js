'use strict'

const winston = require('winston')

const DateTimeUtility = require('./date-time-utility')

/**
 * SimpleLogger is an abstract layer of logging for common logging use.
 */
class SimpleLogger {
  /**
   * @param {!Object} options
   * - name
   */
  constructor(options) {
    this.name = options.name

    this.dateTimeUtility = new DateTimeUtility()
    this.logger = winston.createLogger({
      levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
      },
      level: 'debug',
      transports: [
        new (winston.transports.Console)({
          // TODO: set to false due to MaxListenersExceededWarning issue
          handleExceptions: false,
          json: true,
        }),
      ],
      exitOnError: true,
    })
  }

  /**
   * Logs a message at fatal level.
   * @param {string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async fatal(message, error = null) {
    return this.log('fatal', message, error)
  }

  /**
   * Logs a message at error level.
   * @param {string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async error(message, error = null) {
    return this.log('error', message, error)
  }

  /**
   * Logs a message at warn level.
   * @param {string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async warn(message, error = null) {
    return this.log('warn', message, error)
  }

  /**
   * Logs a message at info level.
   * @param {string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async info(message, error = null) {
    return this.log('info', message, error)
  }

  /**
   * Logs a message at debug level.
   * @param {string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async debug(message, error = null) {
    return this.log('debug', message, error)
  }

  /**
   * Logs a message.
   * @private
   * @param {string} level Log level.
   * @param {?Object|string} message A message to log.
   * @param {?Error} error An error to log.
   * @return {!Promise<boolean>} Promise containing success/failure.
   */
  async log(level, message, error) {
    if (this.isTest()) {
      return false
    }

    let messageToLog = ''
    let objectToLog = {
      time: this.dateTimeUtility.nowInIso8601(),
      name: this.name,
    }

    if (typeof(message) === 'string') {
      messageToLog = message
    } else {
      objectToLog['message'] = message
    }

    if (error) {
      objectToLog['error'] = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      }
    }

    this.logger.log(level, messageToLog, objectToLog)
    return true
  }

  /**
   * Check if NODE_ENV is set to test.
   * @private
   * @return {boolean} True if NODE_ENV is set to test, false otherwise.
   */
  isTest() {
    // using process instead of Environment class to avoid circular
    // dependencies.
    return process.env.NODE_ENV === 'test'
  }
}

module.exports = SimpleLogger
