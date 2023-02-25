import React, { useEffect, useState } from 'react'

const EditBoard = (props) => {

    const [editAllProperties, setEditAllProperties] = useState({});

    const sendEditAllProperties = (obj) => {
        props.getEditAllProperties(obj)
    }

    useEffect(() => {
        sendEditAllProperties(editAllProperties)   
    })

  return (
    <div className="editBoard">
					<div>
						<div className="productNames">
							<h4>מוצרים שנבחרו</h4>
							<ul style={{listStyle:'disc', textAlign:'right'}}>
								{props.selectedRows.map((row) => {
									console.log()
									return (
										<li style={{fontSize:'0.9rem'}} key={row.id}>{row.children[3].innerText}</li>
									)
								})}
							</ul>
						</div>
						<div className="statusChange">
							<h4>שינוי מצב פרסום</h4>
							<select defaultValue='none' onChange={(e) => setEditAllProperties({ ...editAllProperties, publishState: e.target.value == 'true' ? true : false }) } name="" id="">
								<option selected disabled value='none'>שינוי מצב פרסום</option>
								<option value="true">פרסום</option>
								<option value="false">טיוטה</option>
							</select>
						</div>
						<div className="priceChange">
							<h4>שינוי מחיר</h4>
							<input onChange={(e) => setEditAllProperties({ ...editAllProperties, price: parseInt(e.target.value) })} type="number" />
						</div>
						<div className="salepriceChange">
							<h4>שינוי מצב מבצע</h4>
							<select defaultValue='none' onChange={(e) => setEditAllProperties({ ...editAllProperties, onsale: e.target.value == 'true' ? true : false }) } name="" id="">
								<option selected disabled value='none'>המוצר במבצע?</option>
								<option value="true">כן</option>
								<option value="false">לא</option>
							</select>
						</div>
						<div className="salepriceChange">
							<h4>שינוי מחיר מבצע</h4>
							<input onChange={(e) => setEditAllProperties({ ...editAllProperties, saleprice: parseInt(e.target.value) })} type="number" />
						</div>
					</div>
					<button onClick={(e) => props.handleEditAllSave(e)}>שמירה</button>
					{props.failure && 'התרחשה שגיאה בשליחת הנתונים'}
					{props.loading && props.loading}
					{props.success && 'הנתונים נשמרו בהצלחה!'}
				</div>
  )
}

export default EditBoard
