import userModel from '../models/authModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';


// Crear un usuario
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await userModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/1',
            url: 'https://res.cloudinary.com/dxqjyqz8p/image/upload/v1620000000/avatars/1.png',
        },
    });

    res.status(201).json({
        success: true,
        user,
    });
})