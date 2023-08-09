import twilio from "twilio";

export const sendWhatsAppMessage = async (phone, message) => {
    try {
      const client = new twilio.Twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'); // Reemplazar con tus credenciales de Twilio
  
      await client.messages.create({
        body: message,
        from: 'TWILIO_PHONE_NUMBER', // Reemplazar con tu número de Twilio
        to: phone,
      });
  
      console.log('Mensaje de WhatsApp enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el mensaje de WhatsApp:', error.message);
    }
  };
  