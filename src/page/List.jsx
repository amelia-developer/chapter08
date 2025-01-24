import React, {useEffect, useState, useRef} from 'react'
import Header from './inc/Header'
import Star from './Star'
import {useLocation} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchSearchWord } from '../api/searchApi'

const List = () => {
  // 로딩상태
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const dataFromState = location.state?.data // search컴포넌트에서 전달받은 데이터

  // 만약state에 데이터가 없다면, 캐시에서 데이터를 가져오기 위해 useQuery사용
  const {data: cacheData} = useQuery(
    {
      queryKey: ['resultSearchWord', location.state?.data?.searchQuery], // 캐시된 데이터를 위한 key(location.state.data객체의 속성 중 하나가 searchQuery임)
      queryFn: async() => {
        if(!dataFromState) {
          // state에 데이터가 없으면 캐시에서 데이터를 불러옴
          const result = await fetchSearchWord(location.state?.data?.searchQuery)
          return result
        }
        return dataFromState
      },
      enabled: !!location.state?.data // 데이터가 있을때만 쿼리실행
    }
  )

  const initialData = dataFromState || cacheData // state에서 데이터가 없으면 캐시된 데이터를 사용

  // INF[s]
  const observerRef = useRef()
  const [displayData, setDisplayData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if(initialData) {
      const newData = initialData.slice(0, currentPage * 10)
      setDisplayData(newData) // 새 데이터를 덮어쓰는 방식
    }
  }, [initialData, currentPage])

  useEffect(() => {
    if(!observerRef.current) {
      console.log(`observerRef.current가 아직도 null임null임null임`)
      return // observer초기화 방지
    }

      if (!initialData || initialData.length === 0) {
        console.log('observerRef.current is null')
        return
      }

    const observer = new IntersectionObserver((entries) => {
console.log('Observer entries:', entries); // 스크롤 이벤트가 발생하는지 확인
console.log(entries[0]); // 이걸 추가해서 observer가 트리거 되는지 확인
      if(entries[0]?.isIntersecting) {
        // setCurrentPage((prev) => prev + 1)
        setCurrentPage((prev) => {
console.log(`previous page = ${JSON.stringify(prev)}`);
          // 데이터를 모두 로드한 경우 관찰중지
          if(prev >= Math.ceil(initialData.length / 10)) {
            console.log(`모든데이터 로드 완료!!!`)
            return prev; // 모든 데이터가 로드되었을 때는 현재 페이지 유지
          }
          const nextPage = prev + 1
console.log(`nextPage = ${JSON.stringify(nextPage)}`);
          return nextPage; // 새로운 페이지로 증가
        })
      }
    }, {
        threshold: 0,  // 더 민감하게
        rootMargin: '100px',  // 더 넓게
      })

    if(observerRef.current) {
      observer.observe(observerRef.current)
    } else {
      console.log(`observerRef.current가 null이거나 올바르지 않음`)
    }

    return () => {
      if(observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [initialData.length, currentPage])

console.log(`displayData = ${JSON.stringify(displayData)}`);
// INF[e]
  
  useEffect(()=> {
    setIsLoading(true)

    // 검색 결과 로딩이 끝난 후 로딩 상태를 false로 변경
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // 임의의 딜레이(0.5초)를 추가해 로딩 표시

    return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 정리
  }, [initialData])

  if(!initialData) {
    return <p>No data found. Please perform a search first.</p>
  }

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
// console.log(`displayData = ${JSON.stringify(displayData)}`);
// console.log('initialData:', initialData);
  return (
    <>
      <Header></Header>
      <div className='box-wrap'>
      {displayData.length === 0 && <p>Loading more items...</p>}
      {
        displayData.map((item, idx) => {
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
      <div ref={observerRef} className="observerTarget"></div>
      </div>
    </>
  )
}

export default List
