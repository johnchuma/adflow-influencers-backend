const { default: axios } = require("axios");
const { config } = require("dotenv");

const sendWhatsappAuthSMS = async ({ phone, token }) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "template",
      template: {
        name: "adflow_auth",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: token,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: token,
              },
            ],
          },
        ],
      },
    };
    console.log(payload);
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${process.env.ADFLOW_WHATSAPP_NUMBER_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

module.exports = { sendWhatsappAuthSMS };
