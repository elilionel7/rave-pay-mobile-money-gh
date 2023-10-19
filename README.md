# rave-pay-mobile-money-gh
Mobile money payment in Ghana based on rave pay

## Usage

### Initiate Charge
- `npm i rave-pay-momogh`

-  Get `ravePublicKey` and `raveSecretKey` from flutterwave dashboard after registering.

-  Create a webhook on flutterwave dashboard  to send responses to after user has confirmed payments. Use that webhook url as `raveRedirectUrl`

```const raveRedirectUrl = 'http://127.0.0.1:3000/api/v1/payments/recievepay'
const ravePublicKey = 'FLWPUBK_TEST-352d05d1db792a7723959f5f5fb62fca-X'
const raveSecretKey = 'FLWSECK_TEST-53843f51526db031bc35c98571cd2b4d-X'

const GhMomo = require('rave-pay-momogh/services/ghMomo')

const momo = new GhMomo(raveSecretKey, ravePublicKey, raveRedirectUrl)

const payload = {
    currency: 'GHS',
    payment_type: 'mobilemoneygh',
    country: 'GH',
    amount: '50',
    email: 'user@example.com',
    phonenumber: '00000000',
    network: 'MTN',
    firstname: 'lio',
    lastname: 'gui',
    voucher: '128373', // only needed for Vodafone users.
    IP: '355426087298442',
    txRef: 'MC-' + Date.now(),
    orderRef: 'MC_' + Date.now(),
    is_mobile_money_gh: 1,
    redirect_url: 'https://rave-webhook.herokuapp.com/receivepayment',
    device_fingerprint: '69e6b7f0b72037aa8428b70fbe03986c'
  }

  try {
    const { data } = await momo.charge(payload)
    return res.json(data)
  } catch (error) {
    console.log(error)
  }

```

### Verify Payment
- Get `txRef` from the previous initiate charge endpoint
```
 const txRef = 'MC-1584415630221'
  try {
    const { data } = await momo.verifyPayment(txRef)
    return res.json(data)
  } catch (error) {
    console.log(error)
  }

  ```
