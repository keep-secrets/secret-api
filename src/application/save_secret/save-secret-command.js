class SaveSecretCommand {
  constructor({payload, organisation, expireAt}) {
    this.payload = payload;
    this.organisation = organisation;
    this.expireAt = expireAt;
  }
}

module.exports = SaveSecretCommand;
