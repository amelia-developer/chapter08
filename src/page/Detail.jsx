import React from 'react'
import { useLocation } from 'react-router-dom'

const Detail = () => {
    const location = useLocation()

    const idx = location.state.idx
    const item = location.state.item
console.log(`idx = ${JSON.stringify(idx)}`);
console.log(`item = ${JSON.stringify(item)}`);

    return (
    <>

    </>
  )
}

export default Detail