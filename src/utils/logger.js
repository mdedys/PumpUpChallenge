export default {
  log  : log,
  warn : warn
}


/**
 * Wrapper for console.log that only prints the message if not in test
 *
 * @param  {String[]} The message to be logged
 */
function log(message) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message)
  }
}


/**
 * Wrapper for console.warn that only prints the message if not in test
 *
 * @param  {String} The message to be logged
 */
function warn(message) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(message)
  }
}
