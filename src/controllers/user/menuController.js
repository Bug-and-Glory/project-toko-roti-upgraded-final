import { Op } from "sequelize";
import {
  Product,
  ProductDetail,
  SubCategory,
  MasterCategory,
} from "../../models/index.js";

// Include yang digunakan berulang
const baseInclude = [
  {
    model: SubCategory,
    as: "Product_SubCategory",
    attributes: ["id", "name"],
    include: [
      {
        model: MasterCategory,
        as: "Sub_MasterCategory",
        attributes: ["id", "name"],
      },
    ],
  },
  {
    model: ProductDetail,
    as: "Product_ProductDetail",
    attributes: ["description"],
  },
];

// ===============================
// Get All Products
// ===============================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: baseInclude,
      order: [
        [
          {
            model: SubCategory,
            as: "Product_SubCategory",
          },
          {
            model: MasterCategory,
            as: "Sub_MasterCategory",
          },
          "name",
          "ASC",
        ],
        [
          {
            model: SubCategory,
            as: "Product_SubCategory",
          },
          "name",
          "ASC",
        ],
        ["name", "ASC"],
      ],
    });

    return res.render("user/menu")
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get Product By ID
// ===============================
const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka",
      });
    }

    const product = await Product.findByPk(id, {
      include: baseInclude,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Produk dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Search Product By Name
// ===============================
const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'name' wajib diisi",
      });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name.trim()}%`,
        },
      },
      include: baseInclude,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      keyword: name.trim(),
      total: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get Product Detail
// ===============================
const getProductDetail = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka",
      });
    }

    const product = await Product.findByPk(id, {
      include: baseInclude,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Detail produk dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  getAllProducts,
  getProductById,
  searchProductByName,
  getProductDetail,
};