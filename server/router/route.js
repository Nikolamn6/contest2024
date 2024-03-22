import { Router } from "express";
const router = Router();
import multer from "multer";

/** controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';


// LOGIN ROUTES
/** POST  */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

/** GET */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) 
router.route('/createResetSession').get(controller.createResetSession)


/** PUT  */
router.route('/updateuser').put(Auth, controller.updateUser); 
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);
// END LOGIN ___________________________

// BLOG ____________________________________
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

// GALLERY_______________________________________________
const storageTwo = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/gallery");
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const uploadImageG = multer({ storage: storageTwo });
router.route('/postGallery').post(uploadImageG.single('image'), controller.postGallery);

// CHAT________________________________________________

/** GET  */
router.route("/chat").get(Auth, controller.fetchChats);

/** PОST  */
router.route("/chat").post(Auth, controller.accessChat);
router.route("/chat/group").post(Auth, controller.createGroupChat);

/** PUT  */
router.route("/chat/rename").put(Auth, controller.renameGroup);
router.route("/chat/groupremove").put(Auth, controller.removeFromGroup);
router.route("/chat/groupadd").put(Auth, controller.addToGroup);

// MESSAGES________________________________________________

/** GET  */
router.route("/message/:chatId").get(Auth, controller.allMessages);

/** PОST  */
router.route("/message").post(Auth, controller.sendMessage);



export default router;