class DeleteSecretCommand {
  constructor({id, organisation}) {
    this.id = id;
    this.organisation = organisation;
  }
}

module.exports = DeleteSecretCommand;
