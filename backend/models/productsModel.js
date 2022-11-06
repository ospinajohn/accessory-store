import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Por favor, introduzca el nombre del producto'], // requerido y mensaje de error
		trim: true, // Elimina espacios en blanco
		maxLength: [
			120,
			'El nombre del producto no puede superar los 120 caracteres',
		], // maximo de caracteres
	},
	price: {
		type: Number,
		required: [true, 'Por favor, introduzca el precio del producto'],
		maxLength: [8, 'El precio del producto no puede superar los 8 caracteres'],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, 'Por favor, introduzca la descripción del producto'],
	},
	rating: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, 'Por favor, seleccione una categoría para este producto'],
		enum: {
			values: [
				'Alimento seco',
				'Alimento húmedo',
				'Accesorios',
				'Cuidado e Higiene',
				'Juguetes',
				'Medicamentos',
				'Snacks',
				'Otros',
			],
		},
	},
	seller: {
		type: String,
		required: [
			true,
			'Por favor, registre o selecione el vendedor del producto',
		],
	},
	stock: {
		type: Number,
		required: [true, 'Por favor, introduzca la cantidad de stock del producto'],
		maxLength: [5, 'El stock del producto no puede superar los 5 caracteres'],
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			customerName: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		// fecha de creacion
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Products', productsSchema);
