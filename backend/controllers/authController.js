import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import userModel from '../models/authModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import tokenEnviado from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

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

// logaut de usuario
export const logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logout',
	});
});

// Obtener el perfil del usuario
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Olvidar contraseña, recuperar contraseña
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findOne({email: req.body.email});

	if (!user) {
		return next(new ErrorHandler('Usuario no encontrado', 404));
	}

	// Generar el token
	const resetToken = user.getResetPasswordToken();

	await user.save({validateBeforeSave: false});

	// Enviar el email
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/password/reset/${resetToken}`;

	const mensaje = `Hola!\n\nTu link para ajustar una nueva contraseña es el 
    siguiente: \n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\nVetyShop Store`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'VetyShop Recuperación de la contraseña',
			mensaje,
		});
		res.status(200).json({
			success: true,
			message: `Correo enviado a: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({validateBeforeSave: false});
		return next(new ErrorHandler(error.message, 500));
	}
});

// Resetear la contraseña
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hashar el token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await userModel.findOne({
		resetPasswordToken,
		resetPasswordExpire: {$gt: Date.now()},
	});

	if (!user) {
		return next(new ErrorHandler('Token no válido o expirado', 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Las contraseñas no coinciden', 400));
	}

	// Establecer la nueva contraseña
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	tokenEnviado(user, 200, res);
});