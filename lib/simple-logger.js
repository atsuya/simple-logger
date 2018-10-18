'use strict'

const winston = require('winston')

const DateTimeUtility = require('./date-time-utility')

const LEVEL_FATAL = 'fatal'
const LEVEL_ERROR = 'error'
const LEVEL_WARN = 'warn'
const LEVEL_INFO = 'info'
const LEVEL_DEBUG = 'debug'
const LEVELS = {
  [LEVEL_FATAL]: 0,
  [LEVEL_ERROR]: 1,
  [LEVEL_WARN]: 2,
  [LEVEL_INFO]: 3,
  [LEVEL_DEBUG]: 4,
}

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
    this.level = options.hasOwnProperty('level') ? options.level : LEVEL_DEBUG

    this.dateTimeUtility = new DateTimeUtility()
    this.logger = winston.createLogger({
      levels: LEVELS,
      level: this.level,
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
   * @return {string} LEVEL_FATAL
   */
  static get LEVEL_FATAL() {
    return LEVEL_FATAL
  }

  /**
   * @return {string} LEVEL_ERROR
   */
  static get LEVEL_ERROR() {
    return LEVEL_ERROR
  }

  /**
   * @return {string} LEVEL_WARN
   */
  static get LEVEL_WARN() {
    return LEVEL_WARN
  }

  /**
   * @return {string} LEVEL_INFO
   */
  static get LEVEL_INFO() {
    return LEVEL_INFO
  }

  /**
   * @return {string} LEVEL_DEBUG
   */
  static get LEVEL_DEBUG() {
    return LEVEL_DEBUG
  }

  /**
   * Returns a level.
   * @return {string} Level.
   */
  async getLevel() {
    return this.level
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
    if (!this.shouldLog(level)) {
      return false
    }

    const objectToLog = {
      level: level,
      time: this.dateTimeUtility.nowInIso8601(),
      name: this.name,
      message: message,
    }
    if (error) {
      objectToLog['error'] = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      }
    }

    this.logger.log(objectToLog)
    return true
  }

  /**
   * Checks if NODE_ENV is set to test.
   * @private
   * @return {boolean} True if NODE_ENV is set to test, false otherwise.
   */
  isTest() {
    // using process instead of Environment class to avoid circular
    // dependencies.
    return process.env.NODE_ENV === 'test'
  }

  /**
   * Checks if a logger should log for a given level.
   * @private
   * @param {string} level A level to log at.
   * @return {boolean} True if the logger should log, false otherwise.
   */
  shouldLog(level) {
    return LEVELS[level] <= LEVELS[this.level]
  }
}

module.exports = SimpleLogger
