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
const sendWhatsappMessageAlert = async ({ phone, name, link, from }) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "template",
      template: {
        name: "new_message_alert",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: name,
              },
              {
                type: "text",
                text: link,
              },
              {
                type: "text",
                text: from,
              },
            ],
          },
        ],
      },
    };
    // console.log(payload);
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
const sendWhatsappInvoiceStatus = async ({ phone, name, status }) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "template",
      template: {
        name: "contract_statuses",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: name,
              },
              {
                type: "text",
                text: status,
              },
            ],
          },
        ],
      },
    };
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
    console.log("WhatsApp invoice status error:", error.response?.data || error.message);
    return error.response?.data;
  }
};

const sendWhatsappInvoicePaid = async ({ phone, name, invoiceNumber }) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "template",
      template: {
        name: "invoice_paid",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: name,
              },
              {
                type: "text",
                text: invoiceNumber,
              },
            ],
          },
        ],
      },
    };
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
    console.log("WhatsApp invoice paid error:", error.response?.data || error.message);
    return error.response?.data;
  }
};

module.exports = { sendWhatsappAuthSMS, sendWhatsappMessageAlert, sendWhatsappInvoiceStatus, sendWhatsappInvoicePaid };
