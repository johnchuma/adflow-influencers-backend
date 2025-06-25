const { Op, fn } = require("sequelize");
const {
  User,
  InfluencerDetail,
  BusinessCategory,
  Sequelize,
} = require("../../models");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { errorResponse, successResponse } = require("../../utils/responses");
const { randomNumber } = require("../../utils/random_number");
const { sendOTPEmail } = require("../../utils/mail_controller");
require("dotenv").config();

const { sendWhatsappAuthSMS } = require("../../utils/send_whatsapp_sms");

const addUser = async (req, res) => {
  try {
    let { name, email, phone, role } = req.body;
    console.log(req.body);
    let user = await User.findOne({
      where: {
        [Op.or]: [
          {
            phone: phone || "",
          },
          {
            email: email || "",
          },
        ],
      },
    });
    if (user) {
      res.status(401).json({
        status: false,
        message: "Account already exist",
      });
    } else {
      const code = randomNumber();
      let wr;
      if (phone) {
        wr = await sendWhatsappAuthSMS({ phone, token: code });
      } else {
        wr = await sendOTPEmail({
          to: email,
          otp: code,
          subject: "Confirmation Code",
          username: name,
        });
      }
      console.log(wr);
      await User.create({
        name,
        phone,
        verificationCode: code,
        role,
        email,
      });

      successResponse(res, {
        message: "Verification code is sent successfully",
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const confirmCode = async (req, res) => {
  try {
    let { phone, email, code } = req.body;
    console.log(req.body);
    let user = await User.findOne({
      where: {
        [Op.or]: [
          {
            phone: phone || "",
          },
          {
            email: email || "",
          },
        ],
      },
    });
    console.log(user);
    if (user) {
      const result = user.verificationCode == code;
      if (result) {
        const tokens = generateJwtTokens(user);
        res.status(200).json({
          body: {
            tokens,
          },
          status: true,
        });
        await user.update({
          code: null,
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Wrong code or Already used",
        });
      }
    } else {
      res
        .status(404)
        .send({ status: false, message: "Account does not exist" });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getInfluencers = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await User.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [
        {
          model: InfluencerDetail,
        },
      ],
     
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const getMyInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};
const sendCode = async (req, res) => {
  try {
    let { phone, email } = req.body;
    let user = await User.findOne({
      where: {
        phone,
      },
    });
    if (user) {
      const code = randomNumber();
      let wr;
      if (phone) {
        wr = await sendWhatsappAuthSMS({ phone, token: code });
      } else {
        wr = await sendOTPEmail({
          to: email,
          otp: code,
          subject: "Confirmation Code",
          username: user.name,
        });
      }
      user = await user.update({
        verificationCode: code,
      });
      successResponse(res, {
        message: "Verification code is sent successfully",
      });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Account does not exist" });
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const response = await user.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const response = await user.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addUser,
  getInfluencers,
  confirmCode,
  deleteUser,
  getMyInfo,
  sendCode,
  updateUser,
};
