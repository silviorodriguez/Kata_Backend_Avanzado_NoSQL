const { Router } = require('express');
const { userGet, userPost, userPut, userDel, loginUser } = require('../controllers/users.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');
const { protect } = require('../middlewares/authMiddleware')

const router = Router()

//CRUD 
router.post("/", celebrateValidator, userPost );//C
router.get("/", userGet);//R
router.put("/:id",  userPut, protect ); //U
router.delete("/:id", userDel, protect );//D
//login user
router.post("/login", loginUser);


module.exports = router