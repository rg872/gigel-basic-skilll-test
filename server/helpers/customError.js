const CustomError = function (message, status) {
  this.message = message
  this.status = status
}

CustomError.prototype = new Error()

module.exports = CustomError