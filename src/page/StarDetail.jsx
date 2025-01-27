import React from 'react'

const StarDetail = ({item}) => {
    const downloadScore = item.averageUserRatingForCurrentVersion

    // 별1개당 2,000
    // const ratingToPercent = {
    //     width: `${(downloadScore / 5) * 100}%`
    // }

    return (
        <>
            <div className='rate-box'>
                <div className='star-rating'>
                    <div className='star_rating_fill' style={{ width: `${(downloadScore / 5) * 100}%`}}>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                    </div>
                    <div className='star_rating_base'>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StarDetail
