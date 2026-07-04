import Admin from "./admin.js";
import Comment from "./comment.js";
import MasterCategory from "./masterCategory.js";
import Order from "./order.js";
import OrderDetail from "./orderDetail.js";
import Product from "./product.js";
import ProductDetail from "./productDetail.js";
import SubCategory from "./subCategory.js";
import User from "./user.js";

// Relasi MasterCategory dan SubCategory
MasterCategory.hasMany(SubCategory, {
  foreignKey: "master_category_id",
  as: "Master_SubCategory",
});

SubCategory.belongsTo(MasterCategory, {
  foreignKey: "master_category_id",
  as: "Sub_MasterCategory",
});

// Relasi Sub Category dan Product
SubCategory.hasMany(Product, {
  foreignKey: "sub_category_id",
  as: "SubCategory_Product",
});

Product.belongsTo(SubCategory, {
  foreignKey: "sub_category_id",
  as: "Product_SubCategory",
});

// Relasi Product dan ProductDetail
Product.hasOne(ProductDetail, {
  foreignKey: "product_id",
  as: "Product_ProductDetail",
});

ProductDetail.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductDetail_Product",
});

// Relasi User dan Order
User.hasMany(Order, {
  foreignKey: "user_id",
  as: "User_Order",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "Order_User",
});

// Relasi Order dan Order Detail
Order.hasMany(OrderDetail, {
  foreignKey: "order_id",
  as: "Order_OrderDetail",
});

OrderDetail.belongsTo(Order, {
  foreignKey: "order_id",
  as: "OrderDetail_Order",
});

// Relasi Product dan OrderDetail

Product.hasMany(OrderDetail, {
  foreignKey: "product_id",
  as: "Product_OrderDetail",
});

OrderDetail.belongsTo(Product, {
  foreignKey: "product_id",
  as: "OrderDetail_Product",
});

// Relasi User dan Comment
User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "User_Comment",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "Comment_User",
});

export {
  Admin,
  Comment,
  MasterCategory,
  Order,
  OrderDetail,
  Product,
  ProductDetail,
  SubCategory,
  User,
};
