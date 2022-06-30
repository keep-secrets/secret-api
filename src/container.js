const awilix = require('awilix');

const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const SaveSecret = require('./application/save_secret');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const Cipher = require('./domain/services/cipher');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
  crypto: awilix.asValue(crypto),
  uuidv4: awilix.asValue(uuidv4),
  saveSecret: awilix.asClass(SaveSecret),
  idGenerator: awilix.asFunction(idGenerator),
  tokenGenerator: awilix.asFunction(tokenGenerator),
  cipher: awilix.asClass(Cipher),
  secretRepository: awilix.asValue({findById: () => false, save: () => true})
});

module.exports = container;
