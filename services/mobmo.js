const Encryption = require('./../lib/encryption');
const ApiCall = require('./../lib/api');

/**
 * Mobmo - Handles payment operations for Ghana mobile money.
 * This class integrates the Encryption and API call functionalities
 * to provide an interface for initiating and verifying payments.
 */

class Mobmo {
  constructor(secretKey, publicKey, redirectUrl) {
    this.secretKey = secretKey;
    this.publicKey = publicKey;
    this.redirectUrl = redirectUrl;
    this.api = new ApiCall(publicKey);
  }

  async charge(payload) {
    payload.PBFPubKey = this.publicKey;
    payload.redirect_url = this.redirectUrl;

    let encryptInstance = new Encryption(this.secretKey);
    let encryptedData = encryptInstance.encryptdata(JSON.stringify(payload));

    try {
      const response = await this.api.initiateCharge(encryptedData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(txRef) {
    try {
      const response = await this.api.verifyPay(txRef, this.secretKey);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Mobmo;
