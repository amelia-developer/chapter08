import React, {useEffect, useState} from 'react'
import Header from './inc/Header'
import { useSelector } from 'react-redux'
import Star from './Star'

const List = () => {
  // 상태구독
  const searchWord = useSelector(state => state.search.searchWord)
// console.log(`searchWord = ${JSON.stringify(searchWord)}`)

  // 로딩상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    setIsLoading(true)

    // 검색 결과 로딩이 끝난 후 로딩 상태를 false로 변경
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // 임의의 딜레이(0.5초)를 추가해 로딩 표시

    return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 정리
  }, [searchWord])

  if(isLoading) {
    return  <div id="container">
              <div className="stick"></div>
              <div className="stick"></div>
              <div className="stick"></div>
              <div className="stick"></div>
              <div className="stick"></div>
              <div className="stick"></div>
              <h1 className="tit-Loadng">Loading...</h1>
            </div>
  }

  if (!Array.isArray(searchWord)) {
    // searchWord가 null이거나 배열이 아닐 경우 처리
    return <p>No search results available.</p>
  }

  return (
    <>
      <Header></Header>
      <div className='box-wrap'>
      {
        searchWord.map((item, idx) => {
          const sliceImg = item.screenshotUrls.slice(0,3) // 0번째부터 2번째까지(원본배열 안건드림)
          return  <div className='box' key={idx}>
                    <div className='top'>
                        <div className='left'>
                          <img src={item.artworkUrl60} alt={item.trackName}/>
                          <div className='center'>
                            <span className='title'>{item.trackName}</span>
                            {/* <span className='subtext'>{item.shortDescription}</span> */}
                            <span className='genre'>{item.primaryGenreName}</span>
                          </div>
                        </div>                
                        <div className='right'><button type='button'>받기</button></div>
                    </div>
                    <div className='middle'><Star item={item}></Star></div>
                    <div className='bottom'>
                      <ul className='imgbox'>
                        {
                          sliceImg.map((value, idx) => {
                            return <li key={idx}><img src={value} alt=""/></li>
                          })
                        }                        
                      </ul>
                    </div>
                  </div>
          })
      }
      </div>
    </>
  )
}

export default List
