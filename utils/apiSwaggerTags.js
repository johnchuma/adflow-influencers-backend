const usersTag = (req, res, next) => {
  // #swagger.tags = ['Users']
  next();
};
const metaTag = (req, res, next) => {
   // #swagger.ignore = true
  next();
};
const metaCampaignsTag = (req, res, next) => {
   // #swagger.ignore = true

  next();
};
const packagesTag = (req, res, next) => {
   // #swagger.ignore = true

  next();
};
const businessCategoriesTag = (req, res, next) => {
   // #swagger.ignore = true

  next();
};
module.exports = {
  usersTag,
  metaCampaignsTag,
  packagesTag,
  metaTag,
  businessCategoriesTag,
};
