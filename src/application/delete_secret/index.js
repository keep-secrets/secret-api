class DeleteSecret {
  constructor({secretRepository}) {
    this.secretRepository = secretRepository;
  }

  async execute({id, token}){
    const findSecret = await this.secretRepository.findById(id);

    this._assertSecretExists({secret: findSecret});
    this._checkToken({token, secret: findSecret});
    await this.secretRepository.delete(id);
  }

  _assertSecretExists({secret}){
    if(!secret){
      throw new Error('secret not found')
    }
  }

  _checkToken({token, secret}){
    if(token.toString().trim() != secret.token.toString().trim()){
      throw new Error('Wrong token');
    }
  }
}

module.exports = DeleteSecret;
