import React, {Fragment} from 'react';
import {Search} from './Search';

const Header = () => {
	return (
		<Fragment>
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<img src="images/logo.png" alt="logo" />
					</div>
				</div>

				<div className="col-12 col-md-6 mt-2 mt-md-0">
					{/* aqui va buscar */}
					<Search />
				</div>
				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center text-white ">
					<i className="fa fa-shopping-cart text-white"></i>
					<span className="ml-1" id="cart_items ">
						2
					</span>
					<button className="btn btn-danger px-4 text-white login-header-btn float-right">
						Iniciar de sesión
					</button>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
