"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {AiFillEdit, AiOutlineClose} from 'react-icons/ai'
import EditBoard from "./storeProductsComps/EditBoard";
import Table from "./storeProductsComps/Table";
import { storage } from "app/firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { uuid as v4 } from 'uuidv4';
import EditProduct from "./EditProduct";
import Preview from "./storeProductsComps/Preview";


const StoreProducts = (props) => {
    const [products, setProducts] = useState(props?.storeData?.products);
	const [selectedRows, setSelectedRows] = useState([]);
	const [popup, setPopup] = useState();
	const [showEditBoard, setShowEditBoard] = useState();
	const [editAllProperties,setEditAllProperties] = useState({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [fieldChange, setFieldChange] = useState();

	useEffect(() => {
		const getFreshProducts = async () => {
			const getProducts = await axios.get(`/api/products/${props?.storeData?.id}`);
			const theProducts = await getProducts.data.products;
			setProducts(await theProducts);
		}
		getFreshProducts();
	},[props?.storeData])

	
	const trimString = (str, maxLength) => {
		let trimmed;
		str?.length > maxLength ? trimmed = str.substring(0, maxLength) + "..." : trimmed = str
		return trimmed
	  }


	  const popupStructure = (type, contentElm) => {
		return (<div className="popupWrapper"><div className={`popup ${type}`}><i onClick={() => setPopup(false)} className="closePopup"><AiOutlineClose/></i>{contentElm}</div></div>)}

	const handleDeleteProduct = (id, productName, rowElm) => {
		const deletionPopup = <><h3>מוחק את המוצר &quot;{productName}&quot;...</h3></>
		const deleteConfirmPopup = <><h3 style={{margin: '0'}}>המוצר &quot;{productName}&quot; נמחק בהצלחה</h3></>
		const deleteErrorPopup = <><h3>התרחשה שגיאה במחיקת המוצר..</h3><p>יש לרענן את העמוד ולנסות שנית.</p></>
		let oldProducts = props.storeData.products;
		let newProducts = [];
		setPopup(popupStructure('',deletionPopup));

		axios.delete(`/api/products/${id}`).then((res) => {
			if (res.data.deleted === true) {
				oldProducts.forEach((prod) => {
					if (prod.id !== id) {
						newProducts.push(prod)
					}
				})/////////////////////////////////////////////// end of foreach
				props.updateProducts(newProducts);
				setPopup(popupStructure('',deleteConfirmPopup));
				rowElm.style.background = 'red';
				setTimeout(() => {rowElm.remove();setPopup(false)}, 1500); // timeout for UI
			} else {
				setPopup(popupStructure('',deleteErrorPopup));
			}
		})
	}

	const handleDeleteButton = (id, productName, rowElm) => {
		console.log(id)
		const deletePopupContent = 
		<>
		<h3>האם את/ה בטוח/ה שברצונך למחוק את המוצר &quot;{productName}&quot;?</h3>
		<p >פעולה זו אינה ניתנת לשחזור</p>
		<div>
			<button onClick={(e) => handleDeleteProduct(id, productName, rowElm) } className="delete">כן</button>
			<button onClick={() => setPopup(false)} className="dontDelete">לא</button>
		</div></>

		setPopup(popupStructure('deletePopup', deletePopupContent))
	}




	
	
	const handleImages = (e, productId) => {
		e.preventDefault();
		let closestSection
		let inputUpload;
		console.log('e.target.name')
		console.log(e.target)

		
		// if (e.target.name === 'single') {
		// 	console.log("here")
		// 	closestSection = e.target.closest('.section'); 
		// 	const inputUpload = closestSection.querySelector('input#singleImage').click()
		
		// } else if (e.target.name === 'multiple') {
			// 	console.log("here2")
			// 	closestInput = e.target.closest('input#multiple')
			// 	console.log(closestInput.querySelector(''))
			// }
			
			

	}

	const updateProductApiCall = (productId, obj) => {
		
	}

	
	const handleSubmit = async (e, productId, newObj) => {
		e.preventDefault();
		const oldGalleryImages = [];
		const galleryImagesToConvert = [];
	  
		if (newObj.gallery) {
		  newObj.gallery.map((image) => {
			if (typeof image === 'string') {
				oldGalleryImages.push(image)
			} else {
				galleryImagesToConvert.push(image)
			}
		  })
	  
		  try {
			const imageUploadPromises = galleryImagesToConvert.map((image) => {
					const imageRef = ref(storage, `images/users/userId_${props.userData.id}/storeId_${props.storeData.id}/productId_${productId}/${image.name+'_'+v4()}`);
					return uploadBytes(imageRef, image);
			});
			const snapshots = await Promise.all(imageUploadPromises);
			const urls = await Promise.all(snapshots.map((snapshot) => getDownloadURL(snapshot.ref)));
	  
			console.log('uploaded images:', urls);
			newObj.gallery = [...oldGalleryImages, ...urls]
	  
		  } catch (error) {
			console.error('Error uploading images:', error);
		  }
		}

		if (newObj.mainImage) {
			const imageRef = ref(storage, `images/users/userId_${props.userData.id}/storeId_${props.storeData.id}/productId_${productId}/${newObj.mainImage.name+'_'+v4()}`);
				
			try {
			const uploadTaskSnapshot = await uploadBytes(imageRef, newObj.mainImage);
			const url = await getDownloadURL(uploadTaskSnapshot.ref);
			newObj.mainImage = url;
			} catch (error) {
			console.error('Error uploading main image:', error);
			}
		}
		console.log('updated object:', newObj);

		try {
			const response = await axios.put(`/api/products/${productId}`, newObj);
			console.log('received updateProductApiCall response:', response.data);
			let newProducts = [];
			products.map((product) => {
				if (product.id === productId) {
					product = response.data;
					newProducts.push(product.data)
				} else {
					newProducts.push(product)
				}
			})
			props.updateProducts(newProducts)
			setProducts(newProducts)
			setPopup(popupStructure('singleProductEdit', <EditProduct handleSubmit={handleSubmit} getEditAllProperties={getEditAllProperties} setEditAllProperties={setEditAllProperties} product={response.data.data} success={'המוצר עודכן בהצלחה, סוגר את החלון'} />))
			setTimeout(() => {
				setPopup(false)
			}, 1500);
			return response.data.data; // updated product
		  } catch (error) {
			console.error('Error updating product:', error);
			return undefined;
		  }

	  };
	  
				
	  



	const handleEditSingleProd = (productId, row) => {
		const product = products.find(p => p.id === productId);
		

		setPopup(popupStructure('singleProductEdit', <EditProduct handleSubmit={handleSubmit} getEditAllProperties={getEditAllProperties} setEditAllProperties={setEditAllProperties} product={product} row={row} />))
	}

	// also when cell checkbox is clicked //
	const handleCell = (e) => {
		setShowEditBoard(false)
		const target = e.target;
		const row = target.closest("tr");
		const productId = row.id;
		const cellName = target.closest("td").className;
		const productName = row.querySelector(".title").innerText;
		let newSelectedRows = selectedRows;
		let currentProduct;
		products.forEach((product) => {
			if (product.id === productId) {
				currentProduct = product
			}
		}) 

		
		if (target.checked) {
			newSelectedRows.push(row)
			setSelectedRows(newSelectedRows);
		} else {
			newSelectedRows = newSelectedRows.filter(item => {
				if (item.id === row.id) {
				  return false; // Exclude the row from the filtered array
				}
				return true // include else
			  });
			setSelectedRows(newSelectedRows);
		}

		switch (cellName) {
			case 'actions':
				
				if (target.closest("i").getAttribute("name") === 'delete') {
					handleDeleteButton(productId, productName, row);
				} else { // edit
					handleEditSingleProd(productId, row)
				}
				break;
				case 'mainImage':
				case 'shortDesc':
				case 'longDesc':
				case 'gallery':
					setPopup(popupStructure('previewPopup', <Preview currentProduct={currentProduct} cellName={cellName} cellData={row.querySelector(`.${cellName}`)} />))
					break;
			default:
				break;
		}
	}

	// select and unselect all - function
	const handleSelectionAll = (e) => {
		setShowEditBoard(false)
		const state = e.target.checked
		const table = e.target.closest('table');
		const tbodyArr = Array.from(table.querySelector('tbody').children);
		tbodyArr.forEach((row) => {
			row.children[0].children[0].checked = state
		})
		if (state) {
			setSelectedRows(tbodyArr) // add all
		} else {
			setSelectedRows([]) // clear all
		}
	}


	const [showSingleDataEditor,setShowSingleDataEditor] = useState();

	const handleEditAllSelected = (e) => {
		const table = document.querySelector('table');
		const tbodyArr = Array.from(table.querySelector('tbody').children);
		const selectedArray = selectedRows;
		if (selectedRows.length == 1) {
			setShowEditBoard(!showEditBoard)
			setShowSingleDataEditor();
		}
		if (selectedRows.length > 1) {
			setShowEditBoard(!showEditBoard)
		}
	}
	
	const handleDeleteAllSelected = (e) => {
		const table = document.querySelector('table');
		const tbodyArr = Array.from(table.querySelector('tbody').children);
	}
	
	
	
	const handleEditAllSave = async (e) => {
		setLoading("מעדכן את המוצרים");
		setSuccess(false);
		
		const selectedRowsArr = selectedRows.map(row => row.id);
		const updatedProducts = [];
		
		try {
			await Promise.all(selectedRowsArr.map(async id => {
				const product = products.find(p => p.id === id);
				const response = await axios.put(`/api/products/${id}`, editAllProperties);
				updatedProducts.push(response.data.data);
				setLoading(`מעדכן את המוצר - "${product.name}"`);
			}));/////////////////////////////////////////////// end of api calls and map
			const newProducts = products.map(product => {
				const updatedProduct = updatedProducts.find(updated => updated.id === product.id);
				return updatedProduct ? updatedProduct : product;
			});
			
			setProducts(newProducts);
			setSuccess(true);
			setLoading(false);
			setShowEditBoard(!showEditBoard)
		  	setSelectedRows([]);
		  props.updateProducts(newProducts);
		} catch (error) {
		  setLoading(false);
		  setFailure("התרחשה שגיאה, יש לרענן את הדפדפן ולנסות שנית");
		}
	  };
	  
	  const getEditAllProperties = (obj) => {
		setEditAllProperties(obj)
	  }



    return (
        <div className="manageProducts">
            <h1>{props.title}</h1>
			<div className="handlers">
				<button style={selectedRows.length == 0 ? {background:'#cea965', cursor:'not-allowed'} : null} onClick={(e) => handleEditAllSelected(e)} className="editChecked">{showEditBoard ? 'סגירת העריכה' : 'עריכת כל המסומנים'}</button>
				<button style={selectedRows.length == 0 ? {cursor:'not-allowed'} : null} onClick={(e) => handleDeleteAllSelected(e)} className="deleteChecked">מחיקת כל המסומנים</button>
			</div>
			{popup && popup}
			{showEditBoard && 
				<EditBoard setEditAllProperties={setEditAllProperties} handleEditAllSave={handleEditAllSave} getEditAllProperties={getEditAllProperties} selectedRows={selectedRows} failure={failure} loading={loading} success={success}  />
			}
            {!products ? (
                "טוען את המוצרים"
            ) : (
                <Table fieldChange={fieldChange} handleSelectionAll={handleSelectionAll} trimString={trimString} handleCell={handleCell} products={products} />
            )}
        </div>
    );
};

export default StoreProducts;
