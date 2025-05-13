const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Username field, required
    email: { type: String, required: true, unique: true }, // Email field, required and unique
    password: { type: String, required: true }, // Password field, required
    academics: { type: String, default: "" }, // Academics field, optional with default value
    hobbies: { type: String, default: "" }, // Hobbies field, optional with default value
    background: { type: String, default: "" }, // Background field, optional with default value
    nativeLanguage: { type: String, default: "" } // Native language field, optional with default value
});

// Pre-save middleware to hash the password before saving the user document
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Check if the password field is modified
        this.password = await bcrypt.hash(this.password, 8); // Hash the password with a salt factor of 8
    }
    next(); // Proceed to save the user document
});

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);