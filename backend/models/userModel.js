import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔹 BASIC
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, required: true },

    avatar: { type: String, default: "" },
    coverPhoto: { type: String, default: "" },

    bio: { type: String, maxLength: 150 },
    pronouns: { type: String },

    // 🔹 CONTACT
    website: { type: String },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      instagram: String,
    },
    phone: { type: String },
    secondaryEmail: { type: String },

    // 🔹 LOCATION & WORK
    currentCity: String,
    hometown: String,
    workplace: String,
    jobTitle: String,
    education: {
      college: String,
      school: String,
    },

    // 🔹 DISCOVERY
    interests: [String], // ["React", "Gaming"]
    relationshipStatus: String,
    hobbies: [String],

    // 🔹 SYSTEM
    authProvider: String,
    isVerified: Boolean,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
