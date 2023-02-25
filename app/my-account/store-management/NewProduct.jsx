'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";


const NewProduct = (props) => {

	const [onSale, setOnSale] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [productState, setProductState] = useState();
	const highestProductIdentifier = props?.storeData?.products.reduce((prev, current) => {
		return (prev.productIdentifier > current.productIdentifier) ? prev : current
	  });

	const [product, setProduct] = useState({
		productIdentifier : highestProductIdentifier.productIdentifier + 1,
		name : '',
		mainImage : '',
		gallery : [],
		price : 0,
		onsale : false,
		saleprice : 0,
		storeId : props?.storeData?.id ? props?.storeData?.id : '',
		ordersIds : [],
		categoriesId : props?.storeData?.categoryId,
		shortdescription : '', 
		publishState : false,
		description : ''
	});

	const handleBoolean = (e) => {
		if (e.target.name === 'onsale') {
			setOnSale(e.target.value == 'true' ? true : false)
		} else if (e.target.name === 'publishState') {
			setProductState(e.target.value == 'true' ? true : false)
		}
		setProduct({ ...product, [e.target.name]: e.target.value == 'true' ? true : false });
	}

	const handleField = (e) => {
		let fieldValue = e.target.value;
		const fieldName = e.target.name;

		if (fieldName === 'price' || fieldName === 'saleprice') {
			fieldValue = parseInt(fieldValue)
		}
		setProduct({ ...product, [fieldName]: fieldValue });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true)
		setFailure(false)
		setSuccess(false)
		try {
			axios.post(`/api/products`, product).then((res) => {
				const theProduct = res.data.data;
				const currentProducts = props.storeData.products;
				let newProducts = currentProducts;
				setLoading(false)
				setFailure(false)
				setSuccess(true)
				setProduct({
					productIdentifier : highestProductIdentifier.productIdentifier + 1,
					name : '',
					mainImage : '',
					gallery : [],
					price : 0,
					onsale : false,
					saleprice : 0,
					storeId : props?.storeData?.id ? props?.storeData?.id : '',
					ordersIds : [],
					categoriesId : props?.storeData?.categoryId,
					shortdescription : '', 
					publishState : false,
					description : ''
				});
				newProducts.push(theProduct)
				props.updateProducts(newProducts);
				e.target.reset();
			})
		} catch (error) {
				setLoading(false)
				setFailure(true)
				setSuccess(false)
		}
	}

    return (
        <div className="addProduct">
            <h1>{props.title}</h1>
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
					<div className="section">
						<div>
						<label htmlFor="name">שם המוצר</label>
						<input required onChange={(e) => handleField(e)} type="text" name="name" id="name" />
						</div>
						<div>
						<label htmlFor="price">מחיר</label>
						<input required onChange={(e) => handleField(e)} type="number" name="price" id="price" />
						</div>
					</div>
					<div className="section">
						<div style={onSale ? {width:'50%'} : {width:'100%'}}>
							<label htmlFor="onsale">המוצר במבצע?</label>
							<select onChange={(e) => handleBoolean(e)} defaultValue={product.onsale} name="onsale" id="onsale">
								<option value='false'>לא</option>
								<option value='true'>כן</option>
							</select>
						</div>
						{onSale && <div style={{width:'50%'}}>
							<label htmlFor="saleprice">מחיר מבצע</label>
							<input required defaultValue={product?.saleprice} onChange={(e) => handleField(e)} type="number" name="saleprice" id="saleprice" />
						</div>}
					</div>
					<div className="section">
						<div style={{width:'100%'}}>
							<label htmlFor="publishState">סטטוס מוצר</label>
							<select onChange={(e) => handleBoolean(e)} required name="publishState" id="publishState">
								<option disabled selected value='choose'>נא לבחור סטטוס למוצר</option>
								<option value='true'>פרסום המוצר</option>
								<option value='false'>טיוטה</option>
							</select>
						</div>
					</div>
					<div className="section">
						<div>
							<label htmlFor="mainImage">תמונה ראשית</label>
							<input onChange={(e) => handleField(e)} type="file" name="mainImage" id="mainImage" />
						</div>
						<div>
							<label htmlFor="gallery">גלריית תמונות</label>
							<input onChange={(e) => handleField(e)} type="file" multiple name="gallery" id="gallery" />
						</div>
					</div>
					<div className="section">
						<div>
							<label htmlFor="description">תיאור מלא</label>
							<textarea onChange={(e) => handleField(e)} cols={2} name="description" id="description" />
						</div>
						<div>
						<label htmlFor="shortdescription">תיאור קצר</label>
							<textarea onChange={(e) => handleField(e)} cols={2} name="shortdescription" id="shortdescription" />
							</div>
					</div>
					<button type="submit">הוספת המוצר לחנות</button>
					{loading && 'שולח את המוצר...'}
					{success && `המוצר הועלה בהצלחה במצב "${productState ? 'פרסום' : 'טיוטה'}"`}
					{failure && 'שגיאה בהעלאת המוצר'}
                </form>
            </div>
        </div>
    );
};

export default NewProduct;
