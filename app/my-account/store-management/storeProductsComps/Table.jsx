import Image from 'next/image';
import React, { useEffect } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

const Table = (props) => {


	useEffect(() => {
		console.log('use effect in table')
	},[props?.products])

  return (
    <div className="tableWrapper">
					<table cellSpacing={0}>
						<thead >
							<tr>
								<th><input onClick={(e) => props.handleSelectionAll(e)} style={{marginLeft:'10px'}} type='checkbox'/></th>
								{/* <th>מזהה</th> */}
								<th>תמונה ראשית</th>
								<th>שם המוצר</th>
								<th>מחיר <small>(לפני מע&quot;מ)</small></th>
								<th>במבצע?</th>
								<th>מחיר מבצע <br /><small>(לפני מע&quot;מ)</small></th>
								<th>פורסם?</th>
								<th>מכירות</th>
								<th>תיאור קצר</th>
								<th>תיאור מלא</th>
								<th>גלרייה</th>
								<th>פעולות</th>
							</tr>
						</thead>
						<tbody>
						{props?.products.map((product) => {
							return (
								<tr id={product.id} key={product.id}>
									<td className="checkbox"><input onClick={(e) => props.handleCell(e)} type="checkbox" name="select" id={product.id} /></td>
									{/* <td style={{textAlign:'center'}} className="identifier">{product.productIdentifier}</td> */}
									<td style={{padding:'0'}} className="mainImage"><div style={{justifyContent:'center'}}>{product.mainImage ? <><Image src={product.mainImage} width={100} height={100} alt={product.name + ' Main Image'}/><span className="icons"><i onClick={(e) => props.handleCell(e)} className="watchIcon" title="צפייה">{<AiOutlineEye/>}</i></span></> : 'אין תמונה ראשית'}</div></td>
									<td className="title">{product.name}</td>
									<td className="price">{product.price} ₪</td>
									<td className="onsaleq">{product.onsale ? <i className="checkIcon"><AiFillCheckCircle/></i> : <i className="closeIcon"><AiFillCloseCircle/></i> }</td>
									<td style={{textAlign:'center'}} className="saleprice"><span style={{textAlign:'right', width:'100%'}}>{product.saleprice} ₪</span></td>
									<td className="publishq">{product.publishState ? <i className="checkIcon"><AiFillCheckCircle/></i> : <i className="closeIcon"><AiFillCloseCircle/></i> }</td>
									<td className="salesq">{"{salecount}"}</td>
									<td className="shortDesc"><div>{product.shortdescription ? <><span className="shortDesc">{props.trimString(product.shortdescription, 20)}</span> <span className="icons"><i onClick={(e) => props.handleCell(e)} className="watchIcon" title="צפייה">{<AiOutlineEye/>}</i></span></> : 'אין תיאור קצר'}</div></td>
									<td className="longDesc"><div>{product.description ? <><span className="longDesc">{props.trimString(product.description, 20)}</span> <span className="icons"><i onClick={(e) => props.handleCell(e)} className="watchIcon" title="צפייה">{<AiOutlineEye/>}</i></span></> : 'אין תיאור מלא'}</div></td>
									<td className="gallery">{product.gallery.length > 0 ? <span className="icons" style={{justifyContent:'center'}}><i onClick={(e) => props.handleCell(e)} className="watchIcon" title="צפייה">{<AiOutlineEye/>}</i></span> : 'גלרייה ריקה'}</td>
									<td className="actions">
                                        <span className='icons'>
                                            <i onClick={(e) => props.handleCell(e)} name="edit" className="editIcon" title="עריכה">{<AiOutlineEdit/>}</i>
                                            <i onClick={(e) => props.handleCell(e)} name="delete" className="deleteIcon" title='מחיקה' >{<AiOutlineDelete/>}</i>
                                        </span>
                                    </td>
								</tr>
							)
						})}
						</tbody>
					</table>
				</div>
  )
}

export default Table
