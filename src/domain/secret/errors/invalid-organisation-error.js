class InvalidOrganisationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidOrganisationError;
