'use strict'

/**
 * This class provides utility methods related to date/time.
 */
class DateTimeUtility {
  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Returns current UTC time in milliseconds since the epoch.
   * @return {number} Current UTC time in milliseconds since the epoch.
   */
  now() {
    return new Date().getTime()
  }

  /**
   * Returns current UTC time in seconds since the epoch.
   * @return {number} Current UTC time in seconds since the epoch.
   */
  nowInSeconds() {
    return this.millisecondsToSeconds(this.now())
  }

  /**
   * Returns current time in ISO 8601.
   * @return {string} Current time in ISO 8601.
   */
  nowInIso8601() {
    return this.millisecondsToIso8601(this.now())
  }

  /**
   * Parses time in ISO 8601 and returns it in milliseconds since the epoch.
   * @param {string} iso8601 Time in ISO 8601. i.e. 2017-08-24T20:00:00.000Z
   * @return {number} Time in milliseconds since the epoch.
   */
  iso8601ToMilliseconds(iso8601) {
    return Date.parse(iso8601)
  }

  /**
   * Parses time in milliseconds since the epoch and returns it in ISO 8601.
   * @param {number} milliseconds Time in milliseconds since the epoch.
   * @return {string} Time in ISO 8601. i.e. 2017-08-24T20:00:00.000Z.
   */
  millisecondsToIso8601(milliseconds) {
    return new Date(milliseconds).toISOString()
  }

  /**
   * Converts a given time in milliseconds to seconds.
   * @param {number} milliseconds Time in milliseconds.
   * @return {number} Time in seconds.
   */
  millisecondsToSeconds(milliseconds) {
    return Math.floor(milliseconds / 1000)
  }
}

module.exports = DateTimeUtility
