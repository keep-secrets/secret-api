const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');
const FindSecretReponse = require('./find-secret-response');

class FindSecret {
  constructor({secretRepository, cipher}) {
    this.secretRepository = secretRepository;
    this.cipher = cipher;
  }

  async execute({id, secretKey, token}){
    const findSecret = await this.secretRepository.findById(id)
    this._assertSecretExists({secret: findSecret});
    this._checkToken({token, secret: findSecret});

    const revealSecret = this._decrypt({secret: findSecret, secretKey});
    await this.secretRepository.delete(id);

    return new FindSecretReponse({revealSecret});
  }

  _assertSecretExists({secret}){
    if(!secret){
      throw new NotFoundSecretError('Secret not found');
    }
  }

  _checkToken({token, secret}){
    if(token.toString().trim() != secret.token.toString().trim()){
      throw new Error('Wrong token');
    }
  }

  _decrypt({secret, secretKey}){
    const hash = { content: secret._secret, secretKey, iv: secret._iv }
    return this.cipher.decrypt(hash);
  }
}

module.exports = FindSecret
