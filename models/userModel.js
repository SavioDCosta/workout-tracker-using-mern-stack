const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        // Add other relevant fields as needed
        // For example: profilePicture, dateOfBirth, etc.
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Instance method to compare hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
