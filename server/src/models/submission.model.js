import mongoose, {Schema} from "mongoose";


const submissionSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    questions: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

export const Submission = mongoose.model("Submission", submissionSchema)