'use strict'

const assert = require('assert')

const DateTimeUtility = require('../lib/date-time-utility')

describe('DateTimeUtility', () => {
  const dateTimeUtility = new DateTimeUtility()

  it('returns current time in milliseconds', () => {
    assert.equal(dateTimeUtility.now().toString().length, 13)
  })

  it('returns current time in seconds', () => {
    assert.equal(dateTimeUtility.nowInSeconds().toString().length, 10)
  })

  it('returns current time in ISO 8601', () => {
    assert.equal(dateTimeUtility.nowInIso8601().length, 24)
  })

  it('parses time in ISO 8601 and retutns it in milliseconds', () => {
    // 2017-08-24T20:00:00.000Z
    assert.equal(
      dateTimeUtility.iso8601ToMilliseconds('2017-08-24T20:00:00.000Z'),
      1503604800000
    )
  })

  it('parses time in milliseconds and retutns it in ISO 8601', () => {
    // 2017-08-24T20:00:00.000Z
    assert.equal(
      dateTimeUtility.millisecondsToIso8601(1503604800000),
      '2017-08-24T20:00:00.000Z'
    )
  })

  it('converts time in milliseconds to seconds', () => {
    assert.equal(
      dateTimeUtility.millisecondsToSeconds(1503604800000),
      1503604800
    )
  })
})
