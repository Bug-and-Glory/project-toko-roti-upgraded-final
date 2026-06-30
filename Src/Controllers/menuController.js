import connection from "../config/db.js";

const baseQuery = `
        SELECT
        p.id,
        p.name,
        p.price,
        p.img_url,
        sc.name   AS sub_category,
        mc.name   AS category,
        pd.description
      FROM products p
      JOIN sub_categories sc ON p.sub_category_id = sc.id
      JOIN master_categories mc ON sc.master_category_id = mc.id
      LEFT JOIN product_details pd ON p.id = pd.product_id`



const getAllProducts = async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      ${baseQuery}
      ORDER BY mc.name, sc.name, p.name
    `);

    res.status(200).json({
      success: true,
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka",
      })
    }

    const [rows] = await connection.execute(
      `
      ${baseQuery}
      WHERE p.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Produk dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'name' wajib diisi",
      });
    }

    const keyword = `%${name.trim()}%`;

    const [rows] = await connection.execute(
      `
      ${baseQuery}
      WHERE p.name LIKE ?
      ORDER BY p.name
      `,
      [keyword]
    );

    res.status(200).json({
      success: true,
      keyword: name.trim(),
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka",
      })
    }

    const [rows] = await connection.execute(
      `
      ${baseQuery}
      WHERE p.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Detail produk dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAllProducts, getProductById, searchProductByName, getProductDetail };