import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Zoom = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // const zoomImg = location.state?.value
    const item = location.state?.item

    const onCloseZoom = () =>{
        navigate(-1)    
    }
    return (
        <div className='detail-wrap zoom'>
            <button type='button' onClick={onCloseZoom}>완료</button>
            <div className='zoom-box'>
                <ul>
                    {
                        item.screenshotUrls.map((value, idx) => {
                            return <li key={idx}><img src={value} alt=""/></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Zoom