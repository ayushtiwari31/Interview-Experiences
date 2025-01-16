import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {Submission} from "../models/submission.model.js"
import { ApiResponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";



const generateAndRefreshTokens=async(userId)=>{
    try {

        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken};
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token") 
    }
}



const registerUser=asyncHandler(async (req,res)=>{
   
    const {fullName,email,password}=req.body;
    
 
    if([fullName,email,password].some((field)=>
    field?.trim()==="")
    ){
     throw new ApiError(400,"All fields are compulsory")
    }
 
    const existedUser=await User.findOne({
    email 
    })
 
    if(existedUser){
     throw new ApiError(409,"User with email already existed ")
    }
 
   
 
    const user =await  User.create({
     fullName,
     email,
     password,
    })
 
    const createdUser=await User.findById(user._id).select("-password -refreshToken" )

    if(!createdUser)
    {
     throw new ApiError(500,"Something went wrong wile registering")
    }
 
    return res.status(200).json(
     new ApiResponse(200,createdUser,"User registered successfully")
     )
})

const loginUser=asyncHandler(async (req,res)=>{
    
    const {password,email}=req.body;
   
    if( !email)
    {
        throw new ApiError(400," email is required");
    }

    const user=await User.findOne({
        email
    })

    if(!user)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const isPasswordValid=user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken}=await generateAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )

})



const UserSubmission=asyncHandler(async (req,res)=>{
    const {name, country, company, questions}=req.body;
    
   
    const user=req.user
    
 
    if (!user) {
        throw new ApiError(401, "Unauthorized: No user found");
    }
    const newSubmission = new Submission({
        name,
        country,
        company,
        questions,
    });

    
    await newSubmission.save();

    user.submissions = user.submissions || [];
    user.submissions.push(newSubmission._id);
 
    await user.save();

    
    return res.status(200).json(
        new ApiResponse(200, user, "Form submitted successfully")
    );
})


const UserAllSubmissions=asyncHandler(async (req,res)=>{
   
    const user = await User.findById(req.user.id).populate('submissions');

    if (!user) {
        throw new ApiError(401, "Unauthorized: No user found");
    }

    return res.status(200).json(
        new ApiResponse(200, user.submissions, "Fetched all submissions successfully")
    );
})

const GetAllSubmissions = asyncHandler(async (req, res) => {
  
    const submissions = await Submission.find().lean();

    if (!submissions || submissions.length === 0) {
        throw new ApiError(404, "No submissions found");
    }

   
    const formattedSubmissions = submissions.map(submission => ({
        _id: submission._id,
        name: submission.name,
        country: submission.country,
        company: submission.company,
        questions: submission.questions,
        createdAt: submission.createdAt,
        updatedAt: submission.updatedAt,
    }));

    return res.status(200).json(
        new ApiResponse(200, formattedSubmissions, "All submissions retrieved successfully")
    );
});



const deleteUserSubmission = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const user = req.user; 

    if (!user) {
        throw new ApiError(401, "Unauthorized: No user found");
    }

   
    const userDoc = await User.findById(user._id);

    if (!userDoc) {
        throw new ApiError(404, "User not found");
    }

    
    const submissionIndex = userDoc.submissions.indexOf(id);

    if (submissionIndex === -1) {
        throw new ApiError(404, "Submission not found in user's submissions");
    }

  
    userDoc.submissions.splice(submissionIndex, 1);
    await userDoc.save();

    
    await Submission.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Submission deleted successfully")
    );
});


const updateUserSubmission = asyncHandler(async (req, res) => {
    const { name, country, company, questions } = req.body; 
    const { id } = req.params; 

    const submission = await Submission.findById(id);

    if (!submission) {
        throw new ApiError(404, "Submission not found");
    }

   
    const updatedData = { name, country, company, questions };
    console.log(updatedData)
    
    Object.assign(submission, updatedData);

   
    await submission.save();

    return res.status(200).json(
        new ApiResponse(200, submission, "Submission updated successfully")
    );
});




export {registerUser,loginUser,UserSubmission,GetAllSubmissions,UserAllSubmissions,
    deleteUserSubmission ,updateUserSubmission
}
 