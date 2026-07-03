import express from "express"

const router = express.Router()


router.get("/aboutUs", (req, res) =>{
    return res.render("user/about_us")
})

export default router