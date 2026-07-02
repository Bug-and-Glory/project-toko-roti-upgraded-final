// import express from "express";
// import * as historyController from "../../controllers/user/historyController.js";

// const router = express.Router();

// router.get("/history", historyController.getHistory);

// export default router;


import express from "express";
import * as historyController from "../../controllers/user/historyController.js";

const router = express.Router();

router.get("/history", historyController.getAllHistory);
router.get("/history/:id", historyController.getHistoryById);

export default router;