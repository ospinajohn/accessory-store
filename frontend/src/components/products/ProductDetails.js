import React, {Fragment} from 'react';
import MetaData from '../layout/MetaData';

const productDetails = () => {
	return (
		<Fragment>
			<MetaData title={'Detalle del producto'}></MetaData>
			<div className="row d-flex justify-content-around">
				<div className="col-12 col-lg-5 img-fluid" id="product_image">
					<img
						src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png"
						alt="Phone 1"
						className="img-fluid"
					/>
				</div>
				<div className="col-12 col-lg-5 mt-5">
					<h3>Nombre del producto</h3>
					<p id="product_id">ID del producto</p>
					<hr />
					<div className="rating-outer">
						<div className="rating-inner"></div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default productDetails;
