import React, {Fragment} from 'react';

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
					<div className="input-group">
						<input
							type="text"
							id="search_field"
							className="form-control"
							placeholder="Que desea buscar..."
						/>
						<div className="input-group-append">
							<button id="search_btn" className="btn">
								<i className="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
					<button className="btn btn-danger px-4 text-white login-header-btn float-right">
						Iniciar de sesión
					</button>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
