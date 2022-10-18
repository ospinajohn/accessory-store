import React, {Fragment} from 'react';

const Home = () => {
	return (
		<Fragment>
			<h1 className="large text-primary">Ultimos productos</h1>
			<section id="products" className="container mt-5">
				<div className="row">
					{/* Inicio de tarjeta */}
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
						<div className="card p-3 rounded">
							{/* imagen */}
							<img
								className="card-img-top mx-auto"
								src="/images/111102018_ed-min.jpg"
								alt="Bueno"
							/>
							{/* Titulo */}
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">
									<a href="http://localhost:3000/">Producto 1</a>
								</h5>
								{/* Valoracion de estrellas */}
								<div className="ratings mt-auto">
									<div className="rating-outer">
										<div className="rating-inner"></div>
									</div>
									<span id="no_of_reviews">(5 Reviews)</span>
								</div>
								{/* Descripcion del producto */}
								{/* <p className="card-text">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quisquam, quod.
								</p> */}
								{/* Precio */}
								<div className="card-footer d-flex justify-content-between">
									<p className="text-danger font-weight-bold">
										<small>$49.99</small>
									</p>
									{/* Boton de agregar al carrito */}
									<form action="http://localhost:3000/">
										<button
											id="cart"
											type="button"
											className="btn btn-warning px-3 ml-4"
										>
											<i className="fa fa-shopping-cart"></i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					{/* Fin de tarjeta */}
					{/* Inicio de tarjeta */}
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
						<div className="card p-3 rounded">
							{/* imagen */}
							<img
								className="card-img-top mx-auto"
								src="./images/comida_para_perro_y_gato_monello.jpg"
								alt="gold"
							/>
							{/* Titulo */}
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">
									<a href="http://localhost:3000/">Producto 1</a>
								</h5>
								{/* Valoracion de estrellas */}
								<div className="ratings mt-auto">
									<div className="rating-outer">
										<div className="rating-inner"></div>
									</div>
									<span id="no_of_reviews">(5 Reviews)</span>
								</div>
								{/* Descripcion del producto */}
								{/* <p className="card-text">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quisquam, quod.
								</p> */}
								{/* Precio */}
								<div className="card-footer d-flex justify-content-between">
									<p className="text-danger font-weight-bold">
										<small>$49.99</small>
									</p>
									{/* Boton de agregar al carrito */}
									<form action="http://localhost:3000/">
										<button
											id="cart"
											type="button"
											className="btn btn-warning px-3 ml-4"
										>
											<i className="fa fa-shopping-cart"></i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					{/* Fin de tarjeta */}
					{/* Inicio de tarjeta */}
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
						<div className="card p-3 rounded">
							{/* imagen */}
							<img
								className="card-img-top mx-auto"
								src={"/images/706460249484.jpg"}
								alt="Natural gold"
							/>
							{/* Titulo */}
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">
									<a href="http://localhost:3000/">Producto 1</a>
								</h5>
								{/* Valoracion de estrellas */}
								<div className="ratings mt-auto">
									<div className="rating-outer">
										<div className="rating-inner"></div>
									</div>
									<span id="no_of_reviews">(5 Reviews)</span>
								</div>
								{/* Descripcion del producto */}
								{/* <p className="card-text">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quisquam, quod.
								</p> */}
								{/* Precio */}
								<div className="card-footer d-flex justify-content-between">
									<p className="text-danger font-weight-bold">
										<small>$49.99</small>
									</p>
									{/* Boton de agregar al carrito */}
									<form action="http://localhost:3000/">
										<button
											id="cart"
											type="button"
											className="btn btn-warning px-3 ml-4"
										>
											<i className="fa fa-shopping-cart"></i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					{/* Fin de tarjeta */}
					{/* Inicio de tarjeta */}
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
						<div className="card p-3 rounded">
							{/* imagen */}
							<img
								className="card-img-top mx-auto"
								src="/images/111102018_ed-min.jpg"
								alt="Naturla"
							/>
							{/* Titulo */}
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">
									<a href="http://localhost:3000/">Producto 1</a>
								</h5>
								{/* Valoracion de estrellas */}
								<div className="ratings mt-auto">
									<div className="rating-outer">
										<div className="rating-inner"></div>
									</div>
									<span id="no_of_reviews">(5 Reviews)</span>
								</div>
								{/* Descripcion del producto */}
								{/* <p className="card-text">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quisquam, quod.
								</p> */}
								{/* Precio */}
								<div className="card-footer d-flex justify-content-between">
									<p className="text-danger font-weight-bold">
										<small>$49.99</small>
									</p>
									{/* Boton de agregar al carrito */}
									<form action="http://localhost:3000/">
										<button
											id="cart"
											type="button"
											className="btn btn-warning px-3 ml-4"
										>
											<i className="fa fa-shopping-cart"></i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					{/* Fin de tarjeta */}
				</div>
			</section>
		</Fragment>
	);
};

export default Home;
