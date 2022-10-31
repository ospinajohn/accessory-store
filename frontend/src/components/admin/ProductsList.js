import {MDBDataTable} from 'mdbreact';
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProducts} from '../../actions/productActions';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductsList = () => {
	const {products, loading, error} = useSelector((state) => state.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const setProducts = () => {
		const data = {
			columns: [
				{
					label: 'Product ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc',
				},
				{
					label: 'Price',
					field: 'price',
					sort: 'asc',
				},
				{
					label: 'Stock',
					field: 'stock',
					sort: 'asc',
				},
				{
					label: 'Seller',
					field: 'seller',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};
		products.forEach((product) => {
			data.rows.push({
				id: product._id,
				name: product.name,
				price: product.price,
				stock: product.stock,
				seller: product.Seller,
				actions: (
					<Fragment>
						<Link
							to={`/admin/product/${product._id}`}
							className="btn btn-primary py-1 px-2"
						>
							<i className="fa fa-pencil"></i>
						</Link>
						<button className="btn btn-danger py-1 px-2 ml-2">
							<i className="fa fa-trash"></i>
						</button>
					</Fragment>
				),
			});
		});
		return data;
	};

	return (
		<Fragment>
			<MetaData title={'All Products'} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">Productos registrados</h1>
						{loading ? (
							<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
						) : (
              // Mostrar los datos de data en la tabla
							<MDBDataTable
								data={setProducts()}
								className="px-3"
								bordered
								striped
								hover
							/>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductsList;
