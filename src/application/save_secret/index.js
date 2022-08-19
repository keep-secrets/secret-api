const Secret = require('../../domain/secret/Secret');
const AlreadyExistsSecretError = require('../../domain/secret/errors/already-exists-secret-error');
const SaveSecretResponse = require('./save-secret-response');

class SaveSecret {
  constructor({idGenerator, secretRepository, cipher}) {
    this.idGenerator = idGenerator;
    this.secretRepository = secretRepository;
    this.cipher = cipher;
  }

  async execute({payload, expireAt, organisation}) {
    this._assertOrganization(organisation);

    const id = this.idGenerator.generate();
    const getSecret = await this.secretRepository.findById(id);
    this._assertSecretExists(getSecret);

    const {iv, secretKey, secret} = this._encryptPayload(payload)

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expireAt * 60000);

    const secretDomain = new Secret({
      id,
      secret,
      organisation,
      iv,
      expireAt: expirationDate,
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    await this.secretRepository.save(secretDomain);
    return new SaveSecretResponse({id, secretKey});
  }

  _assertOrganization(organization){
    if(!organization) {
      throw new Error('Organization must be provided');
    }
  }

  _assertSecretExists(secret){
    if(secret) {
      throw new AlreadyExistsSecretError('Secret id already exists');
    }
  }

  _encryptPayload(payload){
    const secretEncrypted = this.cipher.encrypt(payload);
    const { iv, secretKey, secret } = secretEncrypted

    return { iv, secretKey, secret }
  }

}

module.exports = SaveSecret;
