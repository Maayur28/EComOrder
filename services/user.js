const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.addtoOrder = async (product) => {
  if (validator.addtoOrder(product)) return await model.addtoOrder(product);
  else {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.getfromOrder = async (userid) => {
  if (validator.getfromOrder(userid)) return await model.getfromOrder(userid);
  else {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
module.exports = userService;
