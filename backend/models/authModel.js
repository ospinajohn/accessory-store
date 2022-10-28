import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Por favor ingrese el nombre'],
		maxLength: [120, 'El nombre no puede exceder los 120 caracteres'],
	},
	email: {
		type: String,
		required: [true, 'Por favor ingrese el email'],
		unique: true,
		validate: [validator.isEmail, 'Por favor ingrese un email válido'],
	},
	password: {
		type: String,
		required: [true, 'Por favor ingrese la contraseña'],
		minLength: [8, 'La contraseña debe tener al menos 8 caracteres'],
		select: false, // no se mostrará en la respuesta
	},
	role: {
		type: String,
		default: 'user',
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// incritar contraseña
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);
