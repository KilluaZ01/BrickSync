import Business from "../models/business.model.js";
import User from "../models/user.model.js";

export const setupBusiness = async (req, res, next) => {
  const { businessName, businessLocation, userId } = req.body;
  const uniqueKey = generateUniqueKey(); // Implement this utility function to generate a unique key

  try {
    const newBusiness = new Business({
      name: businessName,
      location: businessLocation,
      uniqueKey,
      admin: userId,
    });

    const savedBusiness = await newBusiness.save();

    await User.findByIdAndUpdate(userId, {
      business: savedBusiness._id,
      role: "admin",
      firstLogin: false,
    });

    res.status(201).json({ message: "Business setup successful", uniqueKey });
  } catch (error) {
    next(error);
  }
};
