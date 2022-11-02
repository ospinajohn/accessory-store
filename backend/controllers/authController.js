import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import userModel from '../models/authModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import tokenEnviado from '../utils/jwtToken.js';

// Crear un usuario
export const registerUser = catchAsyncErrors(async (req, res, next) => {
	const {name, email, password} = req.body;

	const user = await userModel.create({
		name,
		email,
		password,
		avatar: {
			public_id: 'avatars/1',
			url: 'https://res.cloudinary.com/dxqjyqz8p/image/upload/v1620000000/avatars/1.png',
		},
	});
	tokenEnviado(user, 201, res);
});

// Login de usuario
export const loginUser = catchAsyncErrors(async (req, res, next) => {
	const {email, password} = req.body;

	// Verificar si el email y el password son correctos
	if (!email || !password) {
		return next(new ErrorHandler('Por favor, introduce email y password', 400));
	}

	// Buscar usuario en la base de datos
	const user = await userModel.findOne({email}).select('+password');

	if (!user) {
		return next(new ErrorHandler('Usuario no encontrado', 404));
	}

	// Comprobar si la contraseña es correcta
	const passwordOk = await user.comparePassw(password);

	if (!passwordOk) {
		return next(new ErrorHandler('Contraseña incorrecta', 401));
	}

	tokenEnviado(user, 200, res);
});
