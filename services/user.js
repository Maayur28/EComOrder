const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.addtoOrder = async(product) => {
  return await model.addtoOrder(product);
};
userService.getfromOrder = async(userid) => {
  return await model.getfromOrder(userid);
};
module.exports = userService;
