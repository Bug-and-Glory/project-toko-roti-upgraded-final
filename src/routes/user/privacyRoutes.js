import express from "express"

const router = express.Router()


router.get("/privacy", (req, res) =>{
    return res.render("user/privacy")
})

export default router;