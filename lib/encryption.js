// Encryption utility for securely transforming payload data using 3DES-CBC and a derived key.
// Designed specifically for Ravepay's data protection requirements.

const forge = require("node-forge");
const md5 = require("md5");

class Encryption {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  encryptdata(payload) {
    const iv = forge.random.getBytesSync(8);
    let cipher = forge.cipher.createCipher(
      "3DES-CBC",
      forge.util.createBuffer(this.getKey())
    );
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(payload, "utf-8"));
    cipher.finish();

    const encrypted = iv + cipher.output.getBytes();
    return forge.util.encode64(encrypted);
  }

  getKey() {
    let keymd5 = mds(this.secretKey);
    let keymd5last12 = keymd5.substring(keymd5.length, -12);
    let seckeyadjusted = this.secretKey.replace("FLWSECK-", "");
    let seckeyadjustedfirst12 = seckeyadjusted.substring(0, 12);

    return seckeyadjustedfirst12 + keymd5last12;

  }
}
module.exports = Encryption
