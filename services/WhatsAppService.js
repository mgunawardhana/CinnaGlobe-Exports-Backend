const twilio = require('twilio');
require('dotenv').config();

class WhatsAppService {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.client = twilio(this.accountSid, this.authToken);
    this.fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  }

  async sendWhatsAppMessage(toWhatsAppNumber, filePath) {
    try {
      const message = await this.client.messages.create({
        from: `whatsapp:${this.fromWhatsAppNumber}`,
        to: `whatsapp:${toWhatsAppNumber}`,
        mediaUrl: [`${process.env.SERVER_URL}/${filePath}`],
      });
      console.log(`WhatsApp message SID: ${message.sid}`);
      return message;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }
}

module.exports = WhatsAppService;