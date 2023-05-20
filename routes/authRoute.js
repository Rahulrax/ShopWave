import express from 'express';
import {registerController, loginController, testController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();


// routing
// Register || method post

router.post('/register', registerController);


// login // method post
router.post('/login', loginController);


// test route

router.get('/test', requireSignIn, isAdmin,testController);


export default router;