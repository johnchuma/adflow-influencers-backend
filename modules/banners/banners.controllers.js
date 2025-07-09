const { Op, fn } = require("sequelize");
const { Banner,CampaignInfluencer,Campaign,User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addBanner = async (req, res) => {
  try {
    let {
      campaignInfluencerId,
      title,description,type,platform,file
    } = req.body;

    const response = Banner.create({
     campaignInfluencerId,
      title,description,type,platform,file
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getBanners = async (req, res) => {
  try {
    const { keyword,status,campaignInfluencerId,campaignId } = req.query;
    const {id,role}= req.user;
    console.log(status)
    console.log(role,id)
  let filter = {
        model:CampaignInfluencer,
        where:{
          userId:id,
          id:campaignInfluencerId
        }
      }
    if(role == "client"){
      filter = {
        model:CampaignInfluencer,
        required:true,
       include:[{

        model:Campaign,
        where:{
          id:campaignId
        },
        required:true
       },User]
      }
    }
    const response = await Banner.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include:[filter],
      where: {
        status
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

const getBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({
      where: {
        id,
      },
    });
    successResponse(res, banner);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({
      where: {
        id,
      },
    });
    const response = await banner.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({
      where: {
        id,
      },
    });
    const response = await banner.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addBanner,
  getBanners,
  deleteBanner,
  getBanner,
  updateBanner,
};
