export default {
  log: log,
  warn: warn
}

function log( message ) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message)
  }
}

function warn(message) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(message)
  }
}
