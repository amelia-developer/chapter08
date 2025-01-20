import React from 'react'

const Star = ({item}) => {
    const downloadScore = item.averageUserRatingForCurrentVersion
    // 별1개당 2,000
    const ratingToPercent = {
        width: `${(downloadScore / 5) * 100}%`
    }

    // userRatingCurrentVersion 의 숫자 포맷팅
    const number = Number(item.userRatingCountForCurrentVersion)
    let decimal = 0
    if(number >= 10000) {
        decimal = (number / 10000).toFixed(1) + '만'
    } else if (number >= 1000) {
        decimal = (number / 1000).toFixed(1) + '천' 
    } else {
        decimal = number
    }
    
    return (
        <>
            <div className='rate-box'>
                <div className='star-rating'>
                    <div className='star_rating_fill' style={ratingToPercent}>
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
                <span className='text-average'>{decimal}</span>
            </div>
            <span className='text-seller-name'>{item.sellerName}</span>
            <span className='text-genre'>{item.genres[0]}</span> {/**장르가 배열로 담겨져있는데, 배열의 첫번째를 가져옴 */}
        </>
    )
}

export default Star