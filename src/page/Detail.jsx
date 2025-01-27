import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import StarDetail from './StarDetail'

const Detail = () => {
    const location = useLocation()

    const idx = location.state.idx
    const item = location.state.item
console.log(`idx = ${JSON.stringify(idx)}`);
console.log(`item = ${JSON.stringify(item)}`);

    const [moreText, setMoreText] = useState(false)

    // 현재날짜기준으로 releaseDate사이의 기간
    let now = new Date() // 현재시간
    let date = new Date(item.currentVersionReleaseDate) // 특정일기준 date객체생성
    
    const diffDate = Math.floor(Math.abs((now.getTime() - date.getTime())/(1000*60*60*24)))

    const onMoreDescription = () => {
        setMoreText(true)
    }
console.log(`moreText = ${JSON.stringify(moreText)}`);
// TODO:Detail에서 상단 헤더부분해야함
    return (
        <>
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
                    {/**TODO:여기개발자정보보여주는것부터 */}
                </div>
            </div>
        </>
  )
}

export default Detail