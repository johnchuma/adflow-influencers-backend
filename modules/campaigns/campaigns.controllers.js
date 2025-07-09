const { Op, fn } = require("sequelize");
const { Campaign,CampaignInfluencer,InfluencerDetail,User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addCampaign = async (req, res) => {
  try {
    let {
      title,
      description,
      budget,
      duration,
      targetAudience,
      includeTesting,
      objectives,
      deliverables,
      requirements,
      selectedInfluencers
    } = req.body;
    const user = req.user;
    console.log('Request body:', req.body);

    // Create the campaign
    const response = await Campaign.create({
      title,
      description,
      budget,
      duration,
      targetAudience,
      includeTesting,
      objectives,
      userId: user.id,
      deliverables,
      requirements,
    });
    console.log(selectedInfluencers)
    let influencers = selectedInfluencers || []; // Fallback to empty array if undefined
    if (influencers.length === 0) {
      console.log("No selected influencers provided, fetching influencers with role 'influencer'");
      influencers = await User.findAll({
        where: { role: "influencer" },
        attributes: ['id'], // Only fetch the ID to optimize
      }).then(users => users.map(user => user.id)); // Extract IDs
    }

    console.log('Influencers:', influencers);

    // Map influencers to payload for CampaignInfluencer
    const payload = influencers.map((item) => ({
      userId: item, // item is already a UUID string
      campaignId: response.id,
    }));

    console.log('Payload for CampaignInfluencer:', payload);

    // Insert into CampaignInfluencer table
    if (payload.length > 0) {
      await CampaignInfluencer.bulkCreate(payload);
    } else {
      console.log('No influencers to insert into CampaignInfluencer');
    }

    successResponse(res, response);
  } catch (error) {
    console.error('Error in addCampaign:', error);
    errorResponse(res, error);
  }
};
const getClientCampaigns = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    console.log(keyword,id)
    const response = await Campaign.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order:[["createdAt","DESC"]],
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
const getInfluencerNewCampaigns = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await Campaign.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order:[["createdAt","DESC"]],
      include: [
        {
          model: CampaignInfluencer,
          include:[{
            model:User,
            include:[InfluencerDetail]
          }],

          where: {
            userId: id,
            status:"SENT"
          },
          required:true
        },
        User
      ],
      attributes:{
        exclude:["userId","UserId"]
      }
    });

    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, error);
  }
};
const getInfluencerActiveCampaigns = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.user;
    console.log(keyword,id)
  
    const response = await Campaign.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order:[["createdAt","DESC"]],
      include: [
        {
          model: CampaignInfluencer,
          include:[{
            model:User,
            include:[InfluencerDetail]
          }],
          where: {
            userId: id,
            status:"APPROVED"
          },
          required:true
        },
        User
      ],
      attributes:{
        exclude:["userId","UserId"]
      }
    });
    console.log(response.count)
    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInfluencerCompletedCampaigns = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.user;
    console.log(keyword,id)
   
    const response = await Campaign.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order:[["createdAt","DESC"]],
      include: [
        {
          model: CampaignInfluencer,
          include:[{
            model:User,
            include:[InfluencerDetail]
          }],

          where: {
            userId: id,
            status:"COMPLETED"
          },
          required:true
        },
        User
      ],
      attributes:{
        exclude:["userId","UserId"]
      }
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
const getCampaignInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
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

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
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
  addCampaign,
  getClientCampaigns,
  deleteCampaign,
  getInfluencerNewCampaigns,
  getInfluencerActiveCampaigns,
  getInfluencerCompletedCampaigns,
  getCampaignInfo,
  updateCampaign,
};
