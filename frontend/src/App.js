import React from 'react';
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
	return (
		<div className="App">
			<Header />{/* Asi importamos el componete Header para que se muestre en la pagina*/}
            {/* Esta seccion de dabajo creo que va en un components llamado Home */}
			<div className="container container-fluid">
				<h1 id="products_heading">Productos</h1>
				<section id="products" className="container mt-5">
					<div className="row">
						<div className="col-sm-12 col-md-6 col-lg-3 my-3">
							<div className="card p-3 rounded">
								<img
									className="img-responsive"
									src="http://placehold.it/500x300"
									alt=""
								></img>
								<div className="card-body d-flex flex-column">
									<h5 className="card-title">
										<a href="#">Producto 1</a>
									</h5>
									<div className="ratings mt-auto">
										<div className="rating-outer">
											<div className="rating-inner"></div>
										</div>
										<span id="no_of_reviews">
											(5 Reviews)
										</span>
									</div>
									<p className="card-text">$49.99</p>
									<a
										href="#"
										id="view_btn"
										className="btn btn-block"
									>
										Ver Detalles
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />{/* Asi importamos el componete Footer para que se muestre en la pagina*/}
		</div>
	);
}

export default App;
