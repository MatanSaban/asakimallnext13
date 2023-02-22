import React from 'react'

const StoreMain = (props) => {
  return (
    <div className='storeMain'>
      <h1>{props.title}</h1>
      <p>
        היי {props.userData?.firstname}, ברוך/ה הבא/ה לממשק ניהול החנות שלך בעסקימול! 
        <br />
        כאן תוכל/י להוסיף מוצרים לחנות, לשנות את הגדרות החנות והעיצוב ועוד.
      </p>
      {
        props?.userData?.hasStore && 
        <div className='storeData'>
          <h2>פרטי החנות</h2>
			<div className='storeDetails'>
				<div>
					<h4>שם החנות</h4>
					<p>{props.storeData?.name}</p>
				</div>
				<div>
					<h4>כמות מוצרים</h4>
					<p>{props.storeData?.products.length} מוצרים</p>
				</div>
				<div>
					<h4>כמות מכירות</h4>
					{/* <p>{props.storeData?.name}</p> */}
				</div>
				<div>
					<h4>כמות מוצרים שנמכרו</h4>
					{/* <p>{props.storeData?.name}</p> */}
				</div>
				<div>
					<h4>סה&quot;כ הכנסות</h4>
					{/* <p>{props.storeData?.name}</p> */}
				</div>
			</div>
			<div className='storePromotions'>
				{
					props.storeData?.products.length === 0 && 
					<>
						<div className='noProducts'>
							<h3>עוד לא הוספת מוצרים לחנות..</h3>
							<p>
								אז רק רצינו להגיד שלא כדאי לחכות עם זה ולהוסיף כמה שיותר מהר 
								<br />
								כדי לנצל את החשיפה הגבוהה של חנות חדשה באתר..
							</p>
							<button>הוספת המוצר הראשון שלי</button>
						</div>
						<div className='promotions'>
							<h3>כבר ניסית את הקידום שלנו?</h3>
							<p>
								בטח שמעת על קידום ממומן עד היום..
								<br />
								אז גם לנו יש, ופעם ראשונה בהנחה של 80%!
							</p>
							<button>התחלת קידום ב80% הנחה</button>
						</div>
					</>
				}
			</div>
        </div>
      }
    </div>
  )
}

export default StoreMain
