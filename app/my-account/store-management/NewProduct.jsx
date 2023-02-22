import React from "react";

const newProduct = (props) => {
    return (
        <div className="addProduct">
            <h1>{props.title}</h1>
            <div className="formWrapper">
                <form>
					<div className="section">
						<div>
						<label htmlFor="name">שם המוצר</label>
						<input type="text" name="name" id="name" />
						</div>
						<div>
						<label htmlFor="price">מחיר</label>
						<input type="number" name="price" id="price" />
						</div>
					</div>
					<div className="section">
						<div>
							<label htmlFor="isOnSale">המוצר במבצע?</label>
							<select defaultValue={'false'} name="isOnSale" id="isOnSale">
								<option value='false'>לא</option>
								<option value='true'>כן</option>
							</select>
						</div>
						<div>
						<label htmlFor="saleprice">מחיר מבצע</label>
						<input type="number" name="saleprice" id="saleprice" />
						</div>
					</div>
					<div className="section">
						<div style={{width:'100%'}}>
							<label htmlFor="categoriesId">בחירת קטגוריה</label>
							<select defaultValue={'false'} name="categoriesId" id="categoriesId">
								<option value='catId1'>קטגוריה 1</option>
								<option value='catId2'>קטגוריה 2</option>
								<option value='catId3'>קטגוריה 3</option>
								<option value='catId4'>קטגוריה 4</option>
							</select>
						</div>
					</div>
					<div className="section">
						<div>
							<label htmlFor="mainImage">תמונה ראשית</label>
							<input type="file" name="mainImage" id="mainImage" />
						</div>
						<div>
							<label htmlFor="gallery">גלריית תמונות</label>
							<input type="file" multiple name="gallery" id="gallery" />
						</div>
					</div>
					<div className="section">
						<div>
							<label htmlFor="description">תיאור מלא</label>
							<textarea cols={2} name="description" id="description" />
						</div>
						<div>
						<label htmlFor="shortdescription">תיאור קצר</label>
							<textarea cols={2} name="shortdescription" id="shortdescription" />
							</div>
					</div>
					<button type="submit">הוספת המוצר לחנות</button>
                </form>
            </div>
        </div>
    );
};

export default newProduct;
