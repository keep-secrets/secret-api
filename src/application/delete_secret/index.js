const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');

class DeleteSecret {
  constructor({secretRepository}) {
    this.secretRepository = secretRepository;
  }

  async execute({id, organisation}){
    this._assertOrganization(organisation);

    const findSecret = await this.secretRepository.findById(id);

    this._assertSecretExists({secret: findSecret});
    findSecret.assertOrganization(organisation)
    await this.secretRepository.delete(id);
  }

  _assertOrganization(organization){
    if(!organization) {
      throw new Error('Organization must be provided');
    }
  }

  _assertSecretExists({secret}){
    if(!secret){
      throw new NotFoundSecretError('Secret not found');
    }
  }

}

module.exports = DeleteSecret;
