const { Op, fn } = require("sequelize");
const { CampaignInfluencer,Campaign,User,InfluencerDetail } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addCampaignInfluencer = async (req, res) => {
  try {
    let {
      title,
      description,
      budget,
      targetAudiance,
      includeTesting,
      objectives,
      deliverables,
      requirements,
    } = req.body;

    const response = CampaignInfluencer.create({
      title,
      description,
      budget,
      targetAudiance,
      includeTesting,
      objectives,
      deliverables,
      requirements,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getCampaignInfluencers = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await CampaignInfluencer.findAndCountAll({
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
const getInfluencerPendingApplications = async (req, res) => {
  try {
    const { id } = req.user;
    const {campaignId} = req.query
    console.log(campaignId)

    const response = await CampaignInfluencer.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include:[
         {
          model:Campaign,
          where:{
            id:campaignId
          }
        
      },{
        model:User,//influencer
        include:[InfluencerDetail]
    
      }],
      where: {
       status:"PENDING"
      },
    });
    console.log("count",response.count)
    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInfluencerApprovedApplications = async (req, res) => {
  try {
    const { id } = req.user;
    const {campaignId} = req.query
    console.log(campaignId)
    const response = await CampaignInfluencer.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include:[
         {
          model:Campaign,
          where:{
            id:campaignId
          }
         }
      ,{
        model:User,//influencer
        include:[InfluencerDetail]
    
      }],
      where: {
       status:"APPROVED"
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
const getInfluencerRejectedApplications = async (req, res) => {
  try {
    const { id } = req.user;
    const {campaignId} = req.query
    console.log(campaignId)

    const response = await CampaignInfluencer.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include:[{
          model:Campaign,
          where:{
            id:campaignId
          }
        
      },{
        model:User,//influencer
        include:[InfluencerDetail]
    
      }],
      where: {
       status:"REJECTED"
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
const getCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CampaignInfluencer.findOne({
      where: {
        id,
      },
    });
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const data = await CampaignInfluencer.findOne({
      where: {
        id,
      },
    });
    const response = await data.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CampaignInfluencer.findOne({
      where: {
        id,
      },
    });
    const response = await data.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addCampaignInfluencer,
  getCampaignInfluencers,
  deleteCampaignInfluencer,
  getCampaignInfluencer,
  getInfluencerPendingApplications,
  getInfluencerApprovedApplications,
  getInfluencerRejectedApplications,
  updateCampaignInfluencer,
};
