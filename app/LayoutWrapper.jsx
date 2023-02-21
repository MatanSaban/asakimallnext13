import React from 'react'

function LayoutWrapper(props) {
    console.log(props)
    return (
        <div>{props.children}</div>
    )
}

export default LayoutWrapper