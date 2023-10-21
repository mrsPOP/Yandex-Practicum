const { CONFLICT_ERROR } = require('./statusCode');

class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
  }
}

module.exports = ErrorConflict;
