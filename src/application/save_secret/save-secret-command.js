class SaveSecretCommand {
  constructor({payload, organisation, expireAt}) {
    this.payload = payload;
    this.organisation = organisation;
    this.expireAt = expireAt;
    console.log('::organisation', organisation);
  }
}

module.exports = SaveSecretCommand;
