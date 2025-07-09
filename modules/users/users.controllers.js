const { Op, fn } = require("sequelize");
const {
  User,
  InfluencerDetail,
  BusinessCategory,
  Sequelize,
  ClientDetail
} = require("../../models");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { errorResponse, successResponse } = require("../../utils/responses");
const { randomNumber } = require("../../utils/random_number");
const { sendOTPEmail } = require("../../utils/mail_controller");
require("dotenv").config();

const { sendWhatsappAuthSMS } = require("../../utils/send_whatsapp_sms");
const { default: axios } = require("axios");
const { name } = require("ejs");

const addUser = async (req, res) => {
  try {
    let { name, email, phone,company, role } = req.body;

    const {from} = req.query;
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
      const user = await User.create({
          name,
          phone,
          verificationCode: code,
          role,
          email,
        });
      if(user.role == "client"){
        await ClientDetail.create({
          userId:user.id,
          company
        })
      }
      await axios.post("https://api.kwanza.io/users",{
        role:"influencer",
        phone,
        name,
        email:name
      }).catch((e)=>{
        console.log(e)
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
    console.log(user.dataValues);
    console.log(code)
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
          verificationCode: null,
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
    const { keyword,} = req.query;
  
    console.log(keyword,req.limit,req.offset)
    console.log(req.limit)
    const response = await User.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where:{
         name:{
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [
        {
          model: InfluencerDetail,
          required:true
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
      include:[ClientDetail]
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
      console.log(user)
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
    const {phone} = req.query;
    const user = await User.findOne({
      where: {
        [Op.or]:[{
          id,
        },{
          phone
        }]
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
