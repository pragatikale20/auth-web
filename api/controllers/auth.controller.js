import User from '../modules/user model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import JWT from 'jsonwebtoken';
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'User with this email already exists'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(error);  // Forward error to error handler
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, 'Invalid credentials!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));

    const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' 
    });

    
    const { password: hashedPassword, ...userWithoutPassword } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        expires: new Date(Date.now() + 3600000)
      })
      .status(200)
      .json(userWithoutPassword); 
  } catch (error) {
    next(error);
  }
};
