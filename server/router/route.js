import { Router } from "express";
const router = Router();
import multer from "multer";

/** controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST  */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// POST AND FILES
const storageOne = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/blogs");
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const uploadBlog = multer({ storage: storageOne });
router.route('/postBlog').post(uploadBlog.single('image'), controller.postBlog);


/** GET */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) 
router.route('/createResetSession').get(controller.createResetSession)


/** PUT  */
router.route('/updateuser').put(Auth, controller.updateUser); 
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);



export default router;