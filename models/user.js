const dbModel = require("../utilities/connection");

let userModel = {};

userModel.addtoOrder = async (prod) => {
  let model = await dbModel.getOrderConnection();
  let getorder = await model.findOne({ userid: prod.userid });
  if (!getorder) {
    let obj = {};
    obj.userid = prod.userid;
    delete prod.userid;
    obj.orderItem = [];
    let addorder = await model.create(obj);
    if (addorder) {
      {
        let addprod = await model.updateOne(
          { userid: obj.userid },
          { $push: { orderItem: prod } }
        );
        if (addprod.nModified > 0) return true;
        else {
          let err = new Error();
          err.status = 500;
          err.message =
            "Sorry! Server is busy,Please try removing from wishlist after sometime";
          throw err;
        }
      }
    } else {
      let err = new Error();
      err.status = 500;
      err.message =
        "Sorry! Server is busy,Please try removing from wishlist after sometime";
      throw err;
    }
  } else {
    let id = prod.userid;
    delete prod.userid;
    let pushitem = await model.updateOne(
      { userid: id },
      { $push: { orderItem: prod } }
    );
    if (pushitem.nModified > 0) {
      return true;
    } else {
      let err = new Error();
      err.status = 500;
      err.message =
        "Sorry! Server is busy,Please try removing from wishlist after sometime";
      throw err;
    }
  }
};
userModel.getfromOrder = async (userid) => {
  let model = await dbModel.getOrderConnection();
  let count = await model.findOne({ userid: userid }, { orderItem: 1, _id: 0 });
  if (!count) {
    let obj = {};
    obj.userid = userid;
    obj.orderItem = [];
    let addorder = await model.create(obj);
    return [];
  } else {
    if (count.orderItem.length > 0) {
      const sorted = count.orderItem.sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      );
      return sorted;
    } else return [];
  }
};
module.exports = userModel;
