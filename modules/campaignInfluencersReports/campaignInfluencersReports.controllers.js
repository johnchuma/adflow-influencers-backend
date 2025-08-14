const { Op, fn, where } = require("sequelize");
const {
  CampaignInfluencerReport,
  CampaignInfluencer,
  User,
  Campaign,
  InfluencerDetail,
} = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const { get } = require("http");

const addCampaignInfluencerReport = async (req, res) => {
  try {
    let { urls, campaignInfluencerId } = req.body;
    const response = await CampaignInfluencerReport.create({
      urls,
      campaignInfluencerId,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getCampaignInfluencerReports = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await CampaignInfluencerReport.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        userId: id,
      },
      include: [
        {
          model: CampaignInfluencer,
          include: [
            {
              model: Campaign,
            },
            {
              model: User,
              include: [
                {
                  model: InfluencerDetail,
                },
              ],
            },
          ],
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
const getInfluencerReportsByCampaign = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    let totalApplications = 0, approvedInfluencers = 0, totalReach = 0, engagementRate = 0;
    console.log("Fetching reports for campaign:", id);
    // Get all CampaignInfluencer IDs for this campaign
    const campaignInfluencers = await CampaignInfluencer.findAll({
      where: { campaignId: id },
      attributes: ['id'],
      raw: true
    });
    const influencerIds = campaignInfluencers.map(ci => ci.id);
    totalApplications = influencerIds.length;
    approvedInfluencers = await CampaignInfluencer.count({
      where: {
        campaignId: id,
        status: "APPROVED",
      },
    });
    let instagramtotalReach = 0;
    let tiktoktotalReach = 0;
    let instagramEngagementRate = 0;
    let tiktokEngagementRate = 0;
    if (influencerIds.length > 0) {
      instagramtotalReach = await CampaignInfluencerReport.sum("instagramTotalViews", {
        where: {
          CampaignInfluencerId: influencerIds
        }
      });
      tiktoktotalReach = await CampaignInfluencerReport.sum("tiktokVideoViews", {
        where: {
          CampaignInfluencerId: influencerIds
        }
      });
      instagramEngagementRate = await CampaignInfluencerReport.sum("instagramEngagementRate", {
      where: {
        CampaignInfluencerId: influencerIds
      }
    });
      tiktokEngagementRate = await CampaignInfluencerReport.sum("tiktokEngagementRate", {
        where: {
          CampaignInfluencerId: influencerIds
        }
      });
    }
    
   
    instagramtotalReach = instagramtotalReach || 0;
    tiktoktotalReach = tiktoktotalReach || 0;
    totalReach = instagramtotalReach + tiktoktotalReach;
    engagementRate = (instagramEngagementRate + tiktokEngagementRate) / 2 || 0;
    //round engagementRate to 2 decimal places
    engagementRate = Math.round(engagementRate * 100) / 100;
    const response = await CampaignInfluencerReport.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        isPublished: true,
      },
      include: [
        {
          model: CampaignInfluencer,
          required: true,
          where: {
            campaignId: id,
          },

          include: [
            {
              model: Campaign,
            },
            {
              model: User,
              include: [
                {
                  model: InfluencerDetail,
                },
              ],
            },
          ],
        },
      ],
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
      totalApplications,
      approvedInfluencers,
      totalReach,
      engagementRate:`${engagementRate}%`
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInfluencerReportsByCampaignInfluencer = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await CampaignInfluencerReport.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include: [
        {
          model: CampaignInfluencer,
          required: true,
          where: {
            id: id,
          },
          include: [
            {
              model: Campaign,
            },
            {
              model: User,
              include: [
                {
                  model: InfluencerDetail,
                },
              ],
            },
          ],
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
const getAllCampaignInfluencerReports = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await CampaignInfluencerReport.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include: [
        {
          model: CampaignInfluencer,
          include: [
            {
              model: Campaign,
            },
            {
              model: User,
              include: [
                {
                  model: InfluencerDetail,
                },
              ],
            },
          ],
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

const getCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
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

const deleteCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
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
  addCampaignInfluencerReport,
  getCampaignInfluencerReports,
  deleteCampaignInfluencerReport,
  getAllCampaignInfluencerReports,
  getCampaignInfluencerReport,
  getInfluencerReportsByCampaign,
  updateCampaignInfluencerReport,
  getInfluencerReportsByCampaignInfluencer,
};
