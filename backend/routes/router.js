const express = require('express');

const userControler = require('../controllers/userController');

const userMiddleWare = require('../middlewares/userMiddleWare');

const router = express.Router();

router.get('/users',userControler.getAllUsers);
router.post('/postUser',userMiddleWare.userPostValidate,userControler.postUser);
router.put('/updateUser/:ID',userControler.putUser);
router.delete('/deleteUser/:ID',userControler.deleteUser);

module.exports = router;