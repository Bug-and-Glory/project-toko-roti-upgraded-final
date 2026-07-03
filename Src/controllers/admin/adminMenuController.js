import { Op } from "sequelize";
import sequelize from "../../config/db.js";
import {
  Product,
  ProductDetail,
  SubCategory,
  MasterCategory,
} from "../../models/index.js";

// Include relasi yang dipakai berulang buat nampilin kategori & deskripsi
const baseInclude = [
  {
    model: SubCategory,
    as: "Product_SubCategory",
    attributes: ["id", "name"],
    include: [
      { model: MasterCategory, as: "Sub_MasterCategory", attributes: ["id", "name"] },
    ],
  },
  {
    model: ProductDetail,
    as: "Product_ProductDetail",
    attributes: ["description"],
  },
];

// Halaman "Lihat Menu" - list semua menu, bisa dicari nama & difilter kategori
export const getLihatMenu = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const include = baseInclude.map((item) => {
      if (item.as === "Product_SubCategory" && category) {
        return { ...item, where: { name: category } };
      }
      return item;
    });

    const menuList = await Product.findAll({
      where,
      include,
      order: [["name", "ASC"]],
    });

    const categories = await SubCategory.findAll({ attributes: ["id", "name"] });

    res.render("admin/lihat-menu", {
      title: "Lihat Menu",
      admin: req.session.admin || null,
      menuList,
      categories,
      search: search || "",
      category: category || "",
    });
  } catch (error) {
    next(error);
  }
};

// Halaman "Kelola Menu" - list menu + data kategori buat dropdown form tambah
export const getKelolaMenu = async (req, res, next) => {
  try {
    const message = req.session.message || "";
    req.session.message = "";

    const menuList = await Product.findAll({ include: baseInclude, order: [["name", "ASC"]] });
    const categories = await SubCategory.findAll({ attributes: ["id", "name"] });

    res.render("admin/kelola-menu", {
      title: "Kelola Menu",
      admin: req.session.admin || null,
      menuList,
      categories,
      message,
    });
  } catch (error) {
    next(error);
  }
};

// Tambah menu baru (Product + ProductDetail dibungkus transaction)
export const addMenu = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { name, price, category, description, image } = req.body;

    // Validasi field wajib
    if (!name || !name.trim()) {
      await t.rollback();
      req.session.message = "Nama menu harus diisi";
      return res.redirect("/admin/kelola-menu");
    }

    if (!category || !category.trim()) {
      await t.rollback();
      req.session.message = "Kategori harus dipilih";
      return res.redirect("/admin/kelola-menu");
    }

    if (!image || !image.trim()) {
      await t.rollback();
      req.session.message = "Link gambar harus diisi";
      return res.redirect("/admin/kelola-menu");
    }

    // Validasi harga: wajib angka & harus lebih dari 0
    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      await t.rollback();
      req.session.message = "Harga harus berupa angka dan lebih dari 0";
      return res.redirect("/admin/kelola-menu");
    }

    const subCategory = await SubCategory.findOne({ where: { name: category } });
    if (!subCategory) {
      await t.rollback();
      req.session.message = "Kategori tidak ditemukan";
      return res.redirect("/admin/kelola-menu");
    }

    const product = await Product.create(
      {
        sub_category_id: subCategory.id,
        name: name.trim(),
        price: parsedPrice,
        img_url: image.trim(),
      },
      { transaction: t },
    );

    if (description) {
      await ProductDetail.create(
        { product_id: product.id, description },
        { transaction: t },
      );
    }

    await t.commit();

    req.session.message = "Menu berhasil ditambahkan";
    res.redirect("/admin/kelola-menu");
  } catch (error) {
    await t.rollback();
    next(error);
  }
};