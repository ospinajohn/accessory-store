export const getProducts = (req, res, next) => {
	try {
		res.status(200).json({
			success: true,
			msg: 'Show all products',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error en el servidor',
			error: err,
		});
	}
};
