import express from "express"

const router = express.Router()


router.get("/store", (req, res) =>{
    return res.render("user/store")
})

export default router;