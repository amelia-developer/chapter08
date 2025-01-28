import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import StarDetail from './StarDetail'
import DetailHeader from './inc/DetailHeader'

const Detail = () => {
    const location = useLocation()

    const idx = location.state.idx
    const item = location.state.item
// console.log(`idx = ${JSON.stringify(idx)}`);
// console.log(`item = ${JSON.stringify(item)}`);

    const [moreText, setMoreText] = useState(false)
    const [showText, setShowText] = useState(false)

    // 현재날짜기준으로 releaseDate사이의 기간
    let now = new Date() // 현재시간
    let date = new Date(item.currentVersionReleaseDate) // 특정일기준 date객체생성
    
    const diffDate = Math.floor(Math.abs((now.getTime() - date.getTime())/(1000*60*60*24)))

    const onMoreDescription = () => {
        setMoreText(true)
    }
console.log(`moreText = ${JSON.stringify(moreText)}`);

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

    const onTopDownInfo = () => {
        setShowText(true)
    }

    return (
        <>
            <DetailHeader item={item}></DetailHeader>
            <div className='detail-wrap'>
                <div className='top'>
                    <div className='left'><img src={item.artworkUrl100} alt={item.trackName}/></div>
                    <div className='right'>
                        <span className='title'>{item.trackName}</span>
                        <span className='gubun'>{item.genres[1]}</span>
                        <button type="button">받기</button>
                    </div>
                </div>
                <div className='top-sub-menu'>
                    <ul>
                        <li>
                            <span className='title'>1.4만개의 평가</span>
                            <span className='sub-text1'>4.3</span>
                            <span className='sub-text2'><StarDetail item={item} /></span>
                        </li>
                        <li>
                            <span className='title'>연령</span>
                            <span className='sub-text1'>{item.trackContentRating}</span>
                            <span className='sub-text2'>세</span>
                        </li>
                        <li>
                            <span className='title'>차트</span>
                            <span className='sub-text1'>#38</span>
                            <span className='sub-text2'>{item.genres[0]}</span>
                        </li>
                        <li>
                            <span className='title'>개발자</span>
                            <span className='sub-text1'>😊</span>
                            <span className='sub-text2'>{item.artistName}</span>
                        </li>
                        <li>
                            <span className='title'>언어</span>
                            <span className='sub-text1'>{item.languageCodesISO2A[1]}</span>
                            <span className='sub-text2'>+1개 언어</span>
                        </li>
                    </ul>
                </div>
                <div className='news-box'>
                    <p>새로운 소식 &gt;</p>
                    <div className='top'>
                        <span className='text1'>버전 {item.version}</span>
                        <span className='text2'>{diffDate}일전</span>
                    </div>
                    <p className='text-releaseNote'>{item.releaseNotes}</p>
                </div>
                <div className='preview-box'>
                    <p>미리 보기</p>
                    <ul>
                        {
                            item.screenshotUrls.map((value, idx) => {
                                return <li key={idx}><img src={value} alt=""/></li>
                            })
                        }
                    </ul>
                    <div className='description-box'>
                        <p className={moreText ? 'text more' : 'text'}>
                            {item.description.split(/(?:\r\n|\r|\n)/g).map((value, index) => (
                                <React.Fragment key={index}> {/**React.fragment는 불필요한 태그를 제거하고, 그룹화하기위해 사용 */}
                                    {value}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                        {
                            moreText === false ? <button type='button' onClick={onMoreDescription}>더 보기</button> : null
                        }
                        
                    </div>
                </div>
                <div className='developer-info'>
                    <div className='left'>
                        <span className='text1'>{item.artistName}</span>
                        <span className='text2'>개발자</span>
                    </div>
                    <div className='right'><span className='text1'>&gt;</span></div>
                </div>
                <div className='review-box'>
                    <p className='title'>평가 및 리뷰 <span>&gt;</span></p>
                    <div className='inner'>
                        <div className='left'>
                            <span className='text1'>{item.averageUserRating.toFixed(1)}</span>
                        </div>
                        <div className='right'>
                            <span className='text1'><StarDetail item={item}/></span>
                            <span className='text2'>{decimal}개의 평가</span>
                        </div>
                    </div>
                </div>
                <div className='info-box'>
                    <p className='title'>정보</p>
                    <ul>
                        <li>
                            <span className='title'>카테고리</span>
                            <span className='text'>쇼핑</span>
                        </li>
                        <li className={showText ? 'on' : ''}>
                            <span className='title'>호환성</span>
                            <span className={showText ? 'text on' : 'text'}>이 iPhone에서 사용가능<button type='button' onClick={onTopDownInfo}>▽</button></span>
                            <ol>
                                <li>
                                    <span className='sub-title'>iPhone</span>
                                    <span className='sub-text'>iOS 14.0 이상 필요</span>
                                </li>
                                <li>
                                    <span className='sub-title'>iPad</span>
                                    <span className='sub-text'>ipadOS 14.0 이상 필요</span>
                                </li>
                                <li>
                                    <span className='sub-title'>iPad touch</span>
                                    <span className='sub-text'>iOS 14.0 이상 필요</span>
                                </li>
                                <li>
                                    <span className='sub-title'>Apple Vision</span>
                                    <span className='sub-text'>visionOS 1.0 이상 필요</span>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <span className='title'>연령 등급</span>
                            <span className='text'>{item.contentAdvisoryRating}</span>
                        </li>
                        <li>
                            <span className='title'>제공자</span>
                            <span className='text'>{item.artistName}</span>
                        </li>
                        <li>
                            <span className='title'>저작권</span>
                            <span className='text'>{item.sellerUrl}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
  )
}

export default Detail