const { successResponse, errorResponse } = require("../../utils/responses");
const {Campaign,CampaignInfluencer, User,Payment} = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment")
const clientOverviewStats = async(req,res)=>{
   try {
    const {id} = req.user;
    let activeCampaigns,totalInfluencers,totalBudget,avgROI = 0;
   activeCampaigns = await  Campaign.count({
        where:{
            userId:id
        }
    })
    totalInfluencers = await User.count({
        where:{
            role:"influencer"
        }
    })
    totalBudget = await Campaign.sum("budget",{
        where:{
            userId:id
        }
})
    successResponse(res,{activeCampaigns,totalInfluencers,totalBudget,avgROI})
   } catch (error) {
    errorResponse(res, error);
    
   }

}
const influencerOverviewStats = async(req,res)=>{
   try {
    const {id} = req.user;
    let activeBriefs,completedCampaigns,totalEarning,avgRating = 0;
   activeBriefs = await  CampaignInfluencer.count({
        where:{
            status:"APPROVED",
            userId:id
        },
        
    })
      completedCampaigns = await  CampaignInfluencer.count({
        where:{
            status:"COMPLETED",
            userId:id
        },

       
    })
   
    totalEarning = await Payment.sum("amount",{
        include:[{
        model:Campaign,
        attributes:[],
        include:[{
            model:CampaignInfluencer,
            attributes:[],
            where:{
                userId:id
            },
            required:true
        }]
        }]
    })
    successResponse(res,{activeBriefs,completedCampaigns,totalEarning:totalEarning||0,avgRating})
   } catch (error) {
    errorResponse(res, error);
    
   }

}
module.exports = {clientOverviewStats,influencerOverviewStats}