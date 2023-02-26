import React from 'react'

const Loader = (props) => {
  return (
    <div className='Loader'>
      {props?.title ? props.title : 'טוען...'}
    </div>
  )
}

export default Loader
