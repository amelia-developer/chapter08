import React, { useState, useEffect, useRef } from 'react';
import Header from './inc/Header';
import Star from './Star';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchWord } from '../api/searchApi';

const List = () => {
  const [displayData, setDisplayData] = useState([]); // 보여지는 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const [isLoading, setIsLoading] = useState(true); // 로딩
  const observerRef = useRef(null); // ref관찰대상

  const location = useLocation();
  const dataFromState = location.state?.data; // search에서 query로 전달받은 데이터

  const { data: cacheData } = useQuery({
    queryKey: ['resultSearchWord', location.state?.data?.searchQuery],
    queryFn: () => fetchSearchWord(location.state?.data?.searchQuery),
    enabled: !!location.state?.data, // location.state?.data가 있을때에만(=비어있지 않을때에만) 실행
  })

  const initialData = dataFromState || cacheData || []; // 밑에 return부에 캐시로 이미 불러져있는 데이터를 보여줄지, 통신으로 불러온데이터를 보여줄지, 둘다없으면 빈배열인지지
console.log(`Initial data는 = ${initialData}`)

  // INF[s] : '노출대상이 뷰포트와 교차하는지(handlerObserver)', '노출대상이 뷰포트에 진입하는지(handlerScroll)', 노출대상에 대한 세팅설정(setupObserver)
  //          (뷰포트에 진입하는지는 window.scroll사용할거고, 디바운드 또는 스로틀을 해줘야함_클라부하고려)

  // 노출대상이 뷰포트와 교차했는지 감지(스크롤끝에 닿았는지, 데이터로드할라고 페이지 증가, 데이터 추가로 보여줄라고 로딩설정)
  const handleObserver = (entries) => {
    const target = entries[0] // 노출대상의 dom엘리먼트임
    if (target.isIntersecting && !isLoading) {
  console.log('닿았음') // 스크롤 끝에 닿았을 때 로그 출력
      setIsLoading(true)
      setCurrentPage((prev) => {
  console.log('Current page 증가:', prev + 1)
        return prev + 1
      })
    }
  }

  // 노출대상에 대한 세팅(노출대상이 없을때, 노출대상이 있을때 어떤녀석을 노출대상으로 잡을건지)
  const setupObserver = () => {
    if (!observerRef.current) return; // 노출대상이 없으면 return(해당함수종료)

    const observer = new IntersectionObserver(handleObserver, { // handleObserver이라는 노출대상이 있으면
      root: document.querySelector('.box-wrap'),
      rootMargin: '30px',
      threshold: 0.1,
    })

    observer.observe(observerRef.current)
  console.log('Observer 설정 완료')
  }

  // [첫번째 useEffect의 역할] 
  // 1. 'return부에 보여질 initialData'에 변화가 있을때 맨처음 initialData를 5개씩 짜름
  // 2. 짜르는동안 로딩은 사라짐
  // 3. 현재페이지는 1로 세팅
  // 4. 관찰자에 대한 초기세팅(setupObserver)
  // 5. 새로운검색어 입력 시 스크롤 맨위로
  useEffect(() => {
    setDisplayData(initialData.slice(0, 5))
    setCurrentPage(1)
console.log('초기 데이터 설정:', initialData.slice(0, 5))
    setTimeout(() => {
      setIsLoading(false)
      console.log('초기 로드 완료')
      setupObserver()
    }, 1000) // 1초지연설정

    // 새로운 검색어 입력 시 스크롤 맨 위로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [initialData])
  
  // [두번째useEffect의 역할]
  // 1. 로딩이 새로 이루어 질때 노출대상이 뷰포트에 진입했는지
  // 2. 진입했다면, 스크롤은 200ms간격으로 실행됨
  // 3. 진입했다면, 타이머초기화됨
  // 4. 진입했다면, 로딩을 보여줌
  // 5. 진입했다면, 다음페이지를 위해 이전페이지+1을 함
  useEffect(() => {
    // 노출대상이 뷰포트에 진입했는지 감지(노출요소가 뷰포트에 도달했는지, 데이터로드할라고 페이지 증가, 데이터 추가로 보여줄라고 로딩설정)
    let timer
    const handleScroll = () => {
      const rect = observerRef.current.getBoundingClientRect() // 해당element의 크기와 뷰포트에 상대적 위치 정보 제공
      if(rect.top <= window.innerHeight) { 
        if (timer) return  // 타이머가 존재하면 중복 호출 방지
        timer = setTimeout(() => {
          timer = null // 타이머초기화
          setIsLoading(true)
          setCurrentPage((prev) => {
            return prev + 1
          })  
        }, 200) // 200ms간격으로 실행
      }  
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])

  // [세번째useEffect의 역할]
  // 1. 현재페이지가 1이면 return
  // 2. 현재페이지에 변화가 생길때, 데이터를 잘라내기위해 시작하는 인덱스와 잘라내는 끝 인덱스를 구함
  // 3. 구한 start, end를 '전개연산자'를 이용해서 displayData에 입힘
  useEffect(() => {
    if (currentPage === 1) return;

    const loadMoreData = () => {
      const start = (currentPage - 1) * 5 // 데이터를 잘라내기 시작하는 인덱스
      const end = currentPage * 5 // 데이터를 잘라내는 끝 인덱스
console.log(`로딩 데이터 범위: ${start} - ${end}`);
      const slicedData = initialData.slice(start, end)
      setDisplayData((prev) => [...prev, ...slicedData])
      setIsLoading(false)
    }

    loadMoreData()
  }, [currentPage])
  // INF[e]

  return (
    <>
      <Header />
      <div className="box-wrap">
        {displayData.map((item, idx) => (
          <div className="box" key={idx}>
            <div className="top">
              <div className="left">
                <img src={item.artworkUrl60} alt={item.trackName} />
                <div className="center">
                  <span className="title">{item.trackName}</span>
                  <span className="genre">{item.primaryGenreName}</span>
                </div>
              </div>
              <div className="right"><button type="button">받기</button></div>
            </div>
            <div className="middle"><Star item={item} /></div>
            <div className="bottom">
              <ul className="imgbox">
                {item.screenshotUrls.slice(0, 3).map((url, idx) => (
                  <li key={idx}><img src={url} alt="" /></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div ref={observerRef} style={{ height: '50px', backgroundColor: 'transparent' }}></div> {/* 관찰 대상 스타일 조정 */}
      </div>
    </>
  );
};

export default List;
