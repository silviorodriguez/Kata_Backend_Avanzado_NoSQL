const { Router } = require('express');
const { protect } = require('../middlewares/authMiddleware')

const { articleGet,articlePost,articlePut,articleDel } = require('../controllers/articles.controller')

const router = Router()

//CRUD 
router.post("/", protect, articlePost );//C
router.get("/", protect, articleGet );//R
router.put("/:id", protect, articlePut ); //U
router.delete("/:id", protect, articleDel );//D

module.exports = router