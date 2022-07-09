const InvalidSecretError = require('./errors/invalid-secret-error');
const InvalidOrganisationError = require('./errors/invalid-organisation-error');

class Secret {
  constructor({id, secret, organisation, iv, expireAt, createdAt, updatedAt}) {
    this._createdAt = createdAt;
    this._id = id;
    this._secret = secret;
    this._organisation = organisation;
    this._iv = iv;
    this._expireAt = expireAt;
    this._updatedAt = updatedAt;
  }

  assertOrganization(organisationToCompare){
    if(this.organisation !== organisationToCompare) {
      throw new InvalidOrganisationError('Your organisation cannot see this secret');
    }
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if(!value) {
      throw new InvalidSecretError('Field id in Secret cannot be empty');
    }
    this._id = value;
  }

  get secret() {
    return this._secret;
  }

  set secret(value) {
    if(!value) {
      throw new InvalidSecretError('Field secret in Secret cannot be empty');
    }

    this._secret = value;
  }

  get organisation() {
    return this._organisation;
  }

  set organisation(value) {
    if(!value) {
      throw new InvalidSecretError('Field organisation in Secret cannot be empty');
    }

    this._organisation = value;
  }

  get iv() {
    return this._iv;
  }

  set iv(value) {
    if(!value) {
      throw new InvalidSecretError('Field iv in Secret cannot be empty');
    }

    this._iv = value;
  }

  get expireAt() {
    return this._expireAt;
  }

  set expireAt(value) {
    if(!value) {
      throw new InvalidSecretError('Field expireAt in Secret cannot be empty');
    }

    this._expireAt = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(value) {
    if(!value) {
      throw new InvalidSecretError('Field updatedAt in Secret cannot be empty');
    }

    this._updatedAt = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    if(!value) {
      throw new InvalidSecretError('Field createdAt in Secret cannot be empty');
    }

    this._createdAt = value;
  }
}

module.exports = Secret;
