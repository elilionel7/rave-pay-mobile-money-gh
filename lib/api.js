// Wrapper for Ravepay API interactions, providing methods to initiate and verify payments.
const client = require('../utils/client');

class ApiCall {
  constructor(publicKey) {
    this.publicKey = publicKey;
  }
  async initiateCharge(encryptedPayload){
    try {
      const response = await client({
        url: '/flwv3-pug/getpaidx/api/charge',
        method: 'post',
        data: {
          PBFPubKey: this.publicKey,
          client: encryptedPayload,
          alg: '3DES-24'
        }
      });

    } catch (error) {
        throw error.response.data
    }
  }

  async verifyPay(txref, secretKey) {
    try {
      const response = await client({
        url: '/flwv3-pug/getpaidx/api/v2/verify',
        method: 'post',
        data: {
          txref: txref,
          SECKEY: secretKey
        }
      });
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

}
module.exports = ApiCall;
