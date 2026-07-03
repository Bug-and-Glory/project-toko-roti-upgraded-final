  // import { Op } from "sequelize";
// import {
//   Product,
//   ProductDetail,
//   SubCategory,
//   MasterCategory,
// } from "../../models/index.js";

// // Include yang digunakan berulang
// const baseInclude = [
//   {
//     model: SubCategory,
//     as: "Product_SubCategory",
//     attributes: ["id", "name"],
//     include: [
//       {
//         model: MasterCategory,
//         as: "Sub_MasterCategory",
//         attributes: ["id", "name"],
//       },
//     ],
//   },
//   {
//     model: ProductDetail,
//     as: "Product_ProductDetail",
//     attributes: ["description"],
//   },
// ];

// // Label tampilan & urutan subkategori di halaman menu
// const DISPLAY_NAMES = {
//   "Roti & Pastry": "PASTRY",
//   "Cake & Dessert": "CAKE",
//   "Cookies & Snack": "COOKIES",
//   Savory: "SAVORY",
//   Coffee: "COFFEE",
//   "Non-Coffee": "NON-COFFEE",
// };
// const FOOD_SUBCATS = ["Roti & Pastry", "Cake & Dessert", "Cookies & Snack", "Savory"];
// const DRINK_SUBCATS = ["Coffee", "Non-Coffee"];

// const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "-");

// // ===============================
// // Get All Products
// // ===============================
// const getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       include: baseInclude,
//       order: [
//         [
//           { model: SubCategory, as: "Product_SubCategory" },
//           { model: MasterCategory, as: "Sub_MasterCategory" },
//           "name",
//           "ASC",
//         ],
//         [{ model: SubCategory, as: "Product_SubCategory" }, "name", "ASC"],
//         ["name", "ASC"],
//       ],
//     });

//     // Kelompokkan produk per sub kategori
//     const grouped = {};
//     products.forEach((p) => {
//       const subName = p.Product_SubCategory ? p.Product_SubCategory.name : "Lainnya";
//       if (!grouped[subName]) grouped[subName] = [];
//       grouped[subName].push(p);
//     });

//     // Susun urutan section sesuai DISPLAY_NAMES, cuma yang ada produknya
//     const orderedSubcats = Object.keys(DISPLAY_NAMES).filter((key) => grouped[key]);

//     const firstFood = orderedSubcats.find((key) => FOOD_SUBCATS.includes(key));
//     const firstDrink = orderedSubcats.find((key) => DRINK_SUBCATS.includes(key));

//     const sections = orderedSubcats.map((subName) => ({
//       subCategory: subName,
//       displayName: DISPLAY_NAMES[subName],
//       slug: slugify(subName),
//       isFirstFood: subName === firstFood,
//       isFirstDrink: subName === firstDrink,
//       products: grouped[subName],
//     }));

//     // Kartu kategori bagian atas: FOOD 1 kartu/subkategori, DRINK maks 2 gambar/subkategori
//     const foodCategories = FOOD_SUBCATS.filter((key) => grouped[key]).map((key) => ({
//       name: key,
//       displayName: DISPLAY_NAMES[key],
//       slug: slugify(key),
//       img: grouped[key][0].img_url,
//     }));

//     const drinkCategories = [];
//     DRINK_SUBCATS.filter((key) => grouped[key]).forEach((key) => {
//       grouped[key].slice(0, 2).forEach((p) => {
//         drinkCategories.push({
//           name: key,
//           displayName: DISPLAY_NAMES[key],
//           slug: slugify(key),
//           img: p.img_url,
//         });
//       });
//     });

//     return res.render("user/menu", {
//       title: "Menu",
//       user: req.session.user || null,
//       sections,
//       foodCategories,
//       drinkCategories,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // ===============================
// // Get Product By ID
// // ===============================
// const getProductById = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "ID harus berupa angka",
//       });
//     }

//     const product = await Product.findByPk(id, {
//       include: baseInclude,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: `Produk dengan id ${id} tidak ditemukan`,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // ===============================
// // Search Product By Name
// // ===============================
// const searchProductByName = async (req, res) => {
//   try {
//     const { name } = req.query;

//     if (!name || name.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "Query parameter 'name' wajib diisi",
//       });
//     }

//     const products = await Product.findAll({
//       where: {
//         name: {
//           [Op.like]: `%${name.trim()}%`,
//         },
//       },
//       include: baseInclude,
//       order: [["name", "ASC"]],
//     });

//     res.status(200).json({
//       success: true,
//       keyword: name.trim(),
//       total: products.length,
//       data: products,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // ===============================
// // Get Product Detail
// // ===============================
// const getProductDetail = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "ID harus berupa angka",
//       });
//     }

//     const product = await Product.findByPk(id, {
//       include: baseInclude,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: `Detail produk dengan id ${id} tidak ditemukan`,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export {
//   getAllProducts,
//   getProductById,
//   searchProductByName,
//   getProductDetail,
// };



import { Op } from "sequelize";
import {
  Product,
  ProductDetail,
  SubCategory,
  MasterCategory,
} from "../../models/index.js";

const displayNames = {
  "Roti & Pastry": "PASTRY",
  "Cake & Dessert": "CAKE",
  "Cookies & Snack": "COOKIES",
  Savory: "SAVORY",
  Coffee: "COFFEE",
  "Non-Coffee": "NON-COFFEE",
};

const createSlug = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "-");
};

const baseInclude = [
  {
    model: SubCategory,
    as: "Product_SubCategory",
    attributes: ["id", "name", "img_url", "master_category_id"],
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

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: baseInclude,
      order: [
        ["sub_category_id", "ASC"],
        ["name", "ASC"],
      ],
    });

    const sectionMap = new Map();

    products.forEach((product) => {
      const subCategory = product.Product_SubCategory;
      const masterCategory = subCategory.Sub_MasterCategory;

      if (!sectionMap.has(subCategory.id)) {
        sectionMap.set(subCategory.id, {
          id: subCategory.id,
          name: subCategory.name,
          displayName: displayNames[subCategory.name] || subCategory.name.toUpperCase(),
          slug: createSlug(subCategory.name),
          img: subCategory.img_url,
          masterName: masterCategory.name,
          products: [],
          isFirstFood: false,
          isFirstDrink: false,
        });
      }

      sectionMap.get(subCategory.id).products.push(product);
    });

    const sections = Array.from(sectionMap.values());

    let firstFoodFound = false;
    let firstDrinkFound = false;

    sections.forEach((section) => {
      if (section.masterName === "Makanan" && !firstFoodFound) {
        section.isFirstFood = true;
        firstFoodFound = true;
      }

      if (section.masterName === "Minuman" && !firstDrinkFound) {
        section.isFirstDrink = true;
        firstDrinkFound = true;
      }
    });

    const foodCategories = sections.filter(
      (section) => section.masterName === "Makanan"
    );

    const drinkCategories = sections.filter(
      (section) => section.masterName === "Minuman"
    );

    res.render("user/menu", {
      title: "Menu — YumYum Bakery",
      foodCategories,
      drinkCategories,
      sections,
    });
  } catch (err) {
    console.log("GET MENU ERROR:", err);
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const product = await Product.findByPk(id, {
      include: baseInclude,
    });

    if (!product) {
      return res.redirect("/menu");
    }

    res.render("user/order", {
      title: "Order",
      product,
    });
  } catch (err) {
    console.log("GET PRODUCT BY ID ERROR:", err);
    next(err);
  }
};

export const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name || ""}%`,
        },
      },
      include: baseInclude,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};