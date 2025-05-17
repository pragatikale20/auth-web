import User from '../models/user.model.js'; // Import the User model
import { errorHandler } from '../utils/error.js';

// Update user function
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json('You can only update your own account!');
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete user function
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json('You can only delete your own account!');
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
};
