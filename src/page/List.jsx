import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './inc/Header';
import Star from './Star';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchWord } from '../api/searchApi';

const List = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로드 완료 상태
  const [displayData, setDisplayData] = useState([]); // 보여지는 데이터
  const observerRef = useRef(null); // ref 관찰 대상
  const [touchBottom, setTouchBottom] = useState(false); // 스크롤이 끝에 닿았는지 여부
  const scrollPositionRef = useRef(null); // 스크롤 위치 저장용 ref

  const location = useLocation()
  const navigate = useNavigate()

  const searchQuery = location.state?.data?.searchQuery;
  const dataFromState = location.state?.data; // search에서 query로 전달받은 데이터

  const { data: cacheData } = useQuery({
    queryKey: ['resultSearchWord', searchQuery],
    queryFn: () => fetchSearchWord(searchQuery),
    enabled: !!location.state?.data, // location.state?.data가 있을 때에만 실행
  });

  // 검색어 없이, 주소 걍 복붙해서 새창으로 박을때
  useEffect(() => {
    if (!location.state?.data) {
      alert("잘못된 접근입니다. 메인 페이지로 이동합니다.")
      navigate("/", { replace: true }) // replace: true로 뒤로 가기 방지
    }
  }, [location.state, navigate])

  // if (!location.state?.data) return null; // location.state가 없으면 렌더링하지 않음
  
  // const initialData = dataFromState || cacheData || []
  const initialData = useMemo(() => { // useMemo로 감싸서 initialData의 불필요한 재계산 방지
    return dataFromState || cacheData || []
  }, [dataFromState, cacheData])

  useEffect(() => {
    if (initialData.length > 0) {
      setIsDataLoaded(true)
    }
  }, [initialData])

  // 사용자의 스크롤위치랑 페이징번호를 로컬스토리지에 저장
  useEffect(() => {
    if (isDataLoaded) {      
      const savedScrollPosition = localStorage.getItem('scrollPosition')
      const savedCurrentPage = localStorage.getItem('currentPage')
      // 로컬스토리지에서 가져온 스크롤 위치와 현재 페이지 번호가 유효하면 그 값으로 설정
      if (savedScrollPosition !== null && !isNaN(savedScrollPosition) && savedCurrentPage !== null && !isNaN(savedCurrentPage)) {
        // scrollPositionRef.current = parseInt(savedScrollPosition, 10)
        const scrollPosition = parseInt(savedScrollPosition, 10)
        const restoredPageNumber = parseInt(savedCurrentPage, 10)

        setCurrentPage(restoredPageNumber)
        setDisplayData(initialData.slice(0, restoredPageNumber * 5))

        setTimeout(() => {
          // window.scrollTo(0, scrollPositionRef.current)
          window.scrollTo(0, scrollPosition)
console.log(`scrollPosition = ${JSON.stringify(scrollPosition)}`)
          localStorage.removeItem('scrollPosition')
          localStorage.removeItem('currentPage')
        }, 300)
      } else {
        setDisplayData(initialData.slice(0, 5))
        window.scrollTo(0, 0) // 리스트상단 검색영역에서 검색어 입력시에 스크롤top 0으로
      }
    }
  }, [isDataLoaded, initialData])

  useEffect(() => {
    const handleScroll = () => {
      if (observerRef.current) {
        const { top } = observerRef.current.getBoundingClientRect();

        if (top <= window.innerHeight && !touchBottom) {
          console.log(`스크롤이 화면 끝에 닿았음`);
          setCurrentPage((prev) => prev + 1);
          setTouchBottom(true);
        }

        if (top > window.innerHeight && touchBottom) {
          setTouchBottom(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [touchBottom]);

  useEffect(() => {
    if (currentPage === 1) return

    const loadMoreData = () => {
      const start = (currentPage - 1) * 5
      const end = currentPage * 5
      const slicedData = initialData.slice(start, end)
      setDisplayData((prev) => [...prev, ...slicedData])
    }

    loadMoreData()
  }, [currentPage, initialData])

 // 검색어가 바뀌면 로컬스토리지 초기화
  useEffect(() => {
    if (searchQuery !== location.state?.data?.searchQuery) {
      localStorage.removeItem('scrollPosition')
      localStorage.removeItem('currentPage')
      setCurrentPage(1)
      setDisplayData([])
      scrollPositionRef.current = null
    }
  }, [searchQuery, location.state?.data?.searchQuery])

  const onDetail = (idx, item) => {
    const scrollPosition = window.scrollY
    localStorage.setItem('scrollPosition', scrollPosition)
    localStorage.setItem('currentPage', currentPage)

    navigate(`/detail`, {
      state: { idx, item }
    })
  }
  
  return (
    <>
      <Header />
      <div className="box-wrap">
        {displayData.map((item, idx) => (
          <div className="box" key={idx} onClick={() => onDetail(idx, item)}>
            <div className="top">
              <div className="left">
                <img src={item.artworkUrl60} alt={item.trackName} />
                <div className="center">
                  <span className="title">{item.trackName}</span>
                  <span className="genre">{item.primaryGenreName}</span>
                </div>
              </div>
              <div className="right">
                <button type="button">받기</button>
              </div>
            </div>
            <div className="middle">
              <Star item={item} />
            </div>
            <div className="bottom">
              <ul className="imgbox">
                {item.screenshotUrls.slice(0, 3).map((url, idx) => (
                  <li key={idx}><img src={url} alt="" /></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div id="observer" ref={observerRef} style={{ height: '50px', backgroundColor: 'transparent' }}></div>
      </div>
    </>
  );
};

export default List;
