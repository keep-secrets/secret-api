class FindSecretCommand {
  constructor({id, secretKey, organisation}) {
    this.id = id;
    this.secretKey = secretKey;
    this.organisation = organisation;
  }
}

module.exports = FindSecretCommand;
