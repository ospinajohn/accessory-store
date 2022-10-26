import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import {ProductDetails} from './components/products/ProductDetails';

function App() {
	return (
		<Router>
			<div className="App">
				{/* Asi importamos el componete Header para que se muestre en la pagina*/}
				<Header />
				<div className="container container-fluid">
					<Routes>
						{/* Ejmeplo o guia de ruta para el componente Home */}
						<Route path="/" element={<Home />} />
						<Route path="/Home" element={<Home />} />
						{/* Guia de como poner la ruta de admin */}
						{/* <Route path="/admin/...etc" element={<admin />} /> */}
						<Route path="/product/:id" element={<ProductDetails />} />
					</Routes>
				</div>
				<Footer />
				{/* Asi importamos el componete Footer para que se muestre en la pagina*/}
			</div>
		</Router>
	);
}

export default App;
