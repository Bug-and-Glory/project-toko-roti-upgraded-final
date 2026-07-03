import { Product, Order } from "../../models/index.js";

// Render halaman dashboard admin + kirim semua data statistik yang dibutuhkan view
export const getDashboard = async (req, res, next) => {
  try {
    const [totalMenu, totalOrder, totalRevenue, recentOrders] = await Promise.all([
      countTotalMenu(),
      countTotalOrder(),
      sumTotalRevenue(),
      getRecentOrders(),
    ]);

    res.render("admin/dashboard", {
      title: "Dashboard",
      admin: req.session.admin || null,
      totalMenu,
      totalOrder,
      totalRevenue: formatRupiah(totalRevenue),
      totalHistory: totalOrder, // "riwayat" mengacu ke seluruh order yang tercatat
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

// Hitung jumlah produk/menu yang terdaftar
const countTotalMenu = async () => {
  return Product.count();
};

// Hitung jumlah seluruh order yang pernah masuk
const countTotalOrder = async () => {
  return Order.count();
};

// Jumlahkan total_amount dari semua order untuk dapat total pendapatan
const sumTotalRevenue = async () => {
  const total = await Order.sum("total_amount");
  return total || 0;
};

// Ambil 5 transaksi terbaru untuk ditampilkan di tabel "Riwayat Transaksi Terbaru"
const getRecentOrders = async () => {
  return Order.findAll({
    attributes: ["order_id", "customer_name", "order_date", "total_amount"],
    order: [["order_date", "DESC"]],
    limit: 5,
  });
};

// Format angka jadi string angka ber-titik ala format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};