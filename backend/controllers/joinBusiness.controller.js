export const joinBusiness = async (req, res, next) => {
  const { uniqueKey, userId } = req.body;

  try {
    const business = await Business.findOne({ uniqueKey });
    if (!business) return next(errorHandler(404, "Business not found"));

    business.employees.push(userId);
    await business.save();

    await User.findByIdAndUpdate(userId, {
      business: business._id,
      firstLogin: false,
    });

    res.status(200).json({ message: "Joined business successfully" });
  } catch (error) {
    next(error);
  }
};
