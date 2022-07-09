class FindSecretCommand {
  constructor({id, secretKey, token}) {
    this.id = id;
    this.secretKey = secretKey;
    this.token = token;
  }
}

module.exports = FindSecretCommand;
