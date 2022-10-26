import React, {Fragment, useEffect, useState} from 'react';
import {Carousel} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {clearErrors, getProductDetails} from '../../actions/productActions';
import MetaData from '../layout/MetaData';

export const ProductDetails = () => {
	const {loading, product, error} = useSelector((state) => state.productDetails);
	const {id} = useParams();
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		dispatch(getProductDetails(id));
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, id]);

	const increaseQty = () => {
		const contador = document.querySelector('.count');

		if (contador.valueAsNumber >= product.inventario) return;

		const qty = contador.valueAsNumber + 1;
		setQuantity(qty);
	};

	const decreaseQty = () => {
		const contador = document.querySelector('.count');

		if (contador.valueAsNumber <= 1) return;

		const qty = contador.valueAsNumber - 1;
		setQuantity(qty);
	};

	return (
		<Fragment>
			<MetaData title={product.name}></MetaData>
			<div className="row d-flex justify-content-around">
				<div className="col-12 col-lg-5 img-fluid" id="product_image">
					<Carousel pause="hover">
						{product.images &&
							product.images.map((image) => (
								<Carousel.Item key={image.public_id}>
									<img
										className="d-block w-100"
										src={image.url}
										alt={product.title}
									/>
								</Carousel.Item>
							))}
					</Carousel>
				</div>
				<div className="col-12 col-lg-5 mt-5">
					<h3>{product.name}</h3>
					<p id="product_id">ID del producto {product._id}</p>
					<hr />
					<div className="rating-outer">
						<div
							className="rating-inner"
							style={{
								width: `${(product.rating / 5) * 100}%`,
							}}
						></div>
					</div>
					<span id="no_de_reviews">({product.numOfReviews} Reviews)</span>
					<hr />
					<p id="product_price">${product.price}</p>
					<div className="stockCounter d-inline">
						<span className="btn btn-danger minus" onClick={decreaseQty}>
							-
						</span>
						<input
							type="number"
							className="form-control count d-inline"
							value={quantity}
							readOnly
						/>
						<span className="btn btn-primary plus" onClick={increaseQty}>
							+
						</span>
					</div>
					<button
						type="button"
						id="cart_btn"
						className="btn btn-primary d-inline ml-4"
						disabled={product.stock === 0}
					>
						Añadir al carrito
					</button>
					<hr />
					<p>
						{' '}
						Estado:{' '}
						<span
							id="stock_status"
							className={product.stock > 0 ? 'greenColor' : 'redColor'}
						>
							{product.stock > 0 ? 'En stock' : 'Agotado'}
						</span>
					</p>
					<hr />
					<h4 className="mt-2">Descripción:</h4>
					<p>{product.description}</p>
					<hr />
					<p id="product_seller mb-3">
						Vendido por: <strong>{product.seller}</strong>
					</p>
					<button
						id="review_btn"
						type="button"
						className="btn btn-primary mt-4"
						data-toggle="modal"
						data-target="#ratingModal"
					>
						Dejar una reseña
					</button>
					<div className="alert alert-danger mt-5" type="alert">
						Inicia Sesión para dejar tu review
					</div>

					{/* Agregar comentarios */}
					<div className="row mt-2 mb-5">
						<div className="rating w-50">
							<div
								className="modal fade"
								id="ratingModal"
								tabIndex="-1"
								role="dialog"
								aria-labelledby="ratingModalLabel"
								aria-hidden="true"
							>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5
												className="modal-title"
												id="ratingModalLabel"
											>
												Deja tu reseña
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close"
											>
												<span aria-hidden="true">&times;</span>
											</button>

											<div className="modal-body">
												<ul className="stars">
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
												</ul>

												<textarea
													name="review"
													id="review"
													className="form-control mt3"
												></textarea>

												<button
													className="btn my-3 float-right review-btn px-4 text-white"
													data-dismiss="modal"
													aria-label="Close"
												>
													Enviar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
