// eslint-disable-next-line
const consoleError = console.error.bind(console)
// eslint-disable-next-line
console.error = (errObj, ...args) => {
  if ((process.env.NODE_ENV === 'development' && args.includes('findDOMNode')) || args.includes('eventKey')) {
    return
  }
  consoleError(errObj, ...args)
}
