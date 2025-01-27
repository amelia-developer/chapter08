import React from 'react'
import { useLocation } from 'react-router-dom'
import StarDetail from './StarDetail'

const Detail = () => {
    const location = useLocation()

    const idx = location.state.idx
    const item = location.state.item
console.log(`idx = ${JSON.stringify(idx)}`);
console.log(`item = ${JSON.stringify(item)}`);

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
                        <span className='text2'>3일전</span>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Detail