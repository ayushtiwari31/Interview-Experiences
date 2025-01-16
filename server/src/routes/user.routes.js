import { Router } from "express";
import { 
    loginUser, registerUser, 
    UserSubmission,GetAllSubmissions,
    UserAllSubmissions,deleteUserSubmission, updateUserSubmission 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/submission").post(verifyJWT,UserSubmission)
router.route("/user_submissions").get(verifyJWT,UserAllSubmissions)
router.route("/all_submissions").get(GetAllSubmissions)
router.route("/user_submissions/:id").delete(verifyJWT, deleteUserSubmission);
router.route("/user_submissions/:id").post(verifyJWT, updateUserSubmission);



export default router