class Cipher {
  constructor({ crypto }) {
    this.crypto = crypto;
  }

  encrypt(text) {
    console.log(text)
    const secretKey = this.crypto.randomBytes(32);
    const iv = this.crypto.randomBytes(16);
    const cipher = this.crypto.createCipheriv('aes-256-ctr', secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return {
      iv: iv.toString('hex'),
      secret: encrypted.toString('hex'),
      secretKey: secretKey.toString('hex'),
    }
  }

}


module.exports = Cipher
