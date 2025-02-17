import { TwilioProvider } from '@builderbot/provider-twilio';

const twilioProvider = new TwilioProvider({
    accountSid: process.env.ACCOUNT_SID,
    authToken: process.env.AUTH_TOKEN,
    vendorNumber: process.env.VENDOR_NUMBER,
});

export { twilioProvider };