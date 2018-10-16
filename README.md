# simple-logger

A very simple logger for node. Just for myself.

# How to use

```javascript
const logger = new SimpleLogger({
  name: 'test logger',
  level: SimpleLogger.INFO, // `level` is optional; DEBUG is default.
})

// All logging methods are async.
await logger.fatal('this is so fatal') // logs the message as FATAL.
logger.fatal('this is so fatal, no wait') // the same as above but no `await` so the call doesn't wait

await logger.fatal('something happened', new Error('ouch')) // an Error object can be passed as the 2nd param.
await logger.fatal({ unko: 'wow', geri: 'awesome' }) // an object can be passed as the 1st param.

// FATAL being the lowest value and DEBUG being the highest value.
await logger.info('this is info') // this will be logged because INFO <= INFO is true.
await logger.debug('this is debug') // this won't be logged because DEBUG <= INFO is not true.
```