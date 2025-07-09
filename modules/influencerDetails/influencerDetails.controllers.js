const { Op, fn } = require("sequelize");
const { InfluencerDetail,User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addInfluencerDetail = async (req, res) => {
  try {
   let data = req.body
    const response = await InfluencerDetail.create(data);
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getInfluencerDetails = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await InfluencerDetail.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        userId: id,
      },
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



const getInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await InfluencerDetail.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let response;
    if(id == "adflow"){
      let data = req.body;
      let userDetails = data.User
      delete data.id;
      delete data.uuid;
      delete data.userId;
      delete data.UserId;
      delete data.createdAt;
      delete data.updatedAt;
      delete userDetails.id;
      delete userDetails.uuid;
      delete userDetails.password;
      delete userDetails.createdAt;
      delete userDetails.updatedAt;
      delete data.User;
      console.log("received", data,userDetails)
         const user = await User.findOne({
               where:{
                phone:userDetails.phone
               },
               include:[InfluencerDetail]
         })
         if(user){
          console.log("user is registered")
            if(user.InfluencerDetail){
              console.log("User registered and have Influencer Details")
               const infDet = await InfluencerDetail.findOne({
                where: {
                  id:user.InfluencerDetail.id,
                },
              });
               await infDet.update({
                  ...data,
                });
            }else{
              console.log("User registered but do not have influencer details")
              await InfluencerDetail.create({
                  ...data,
                  userId:user.id
              })
            }
         }else{
          console.log("user was not registered")
          const user = await User.create({
              ...userDetails
          })
          console.log("adding influencer details")
           await InfluencerDetail.create({
                  userId:user.id,
                  ...data
              })
         }
    }else{
       const user = await InfluencerDetail.findOne({
          where: {
            id,
          },
        });
        response = await user.update({
          ...req.body,
        });
    }
    
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await InfluencerDetail.findOne({
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

module.exports = {
  addInfluencerDetail,
  getInfluencerDetails,
  deleteInfluencerDetail,
  getInfluencerDetail,
  updateInfluencerDetail,
};
