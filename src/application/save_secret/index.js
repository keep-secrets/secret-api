const Secret = require('../../domain/secret/Secret');

class SaveSecret {
  constructor({idGenerator, secretRepository, tokenGenerator, cipher}) {
    this.idGenerator = idGenerator;
    this.tokenGenerator = tokenGenerator;
    this.secretRepository = secretRepository;
    this.cipher = cipher;
  }

  async execute({payload, expireAt}) {
    const {id, token} = this._generateIdAndToken()

    const getSecret = await this.secretRepository.findById(id);
    this._assertSecretExists(getSecret);

    const {iv, secretKey, secret} = this._encryptPayload(payload)

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expireAt * 60000);

    const secretDomain = new Secret({
      id,
      secret,
      token,
      iv,
      expireAt: expirationDate,
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    await this.secretRepository.save(secretDomain);
    return {id, secretKey, token}
  }

  _generateIdAndToken(){
    const id = this.idGenerator.generate();
    const token = this.tokenGenerator.generate();

    return {id, token}
  }

  _assertSecretExists(secret){
    if(secret) {
      throw new Error('Secret id already exists'); // ToDo: create custom error
    }
  }

  _encryptPayload(payload){
    const secretEncrypted = this.cipher.encrypt(payload);
    const { iv, secretKey, secret } = secretEncrypted

    return { iv, secretKey, secret }
  }

}

module.exports = SaveSecret;
