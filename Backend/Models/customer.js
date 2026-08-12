import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
        trim: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    address: {
        vill: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        post: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        ps: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        dist: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        pin: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        }
    },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
