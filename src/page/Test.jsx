import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { testResult } from '../api/searchApi';
import { inputSearchResult } from '../redux/searchAction'; // 새로운 액션 import

const Test = () => {
  const result = useSelector(state => state.search.testResult);
  const dispatch = useDispatch();
  // 로딩상태
  const [isLoading, setIsLoading] = useState(true)

  const [limit, setLimit] = useState(3); // limit 상태 추가
  const observerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치 상태 추가

  useEffect(() => {
    dispatch(testResult(limit)); // 처음에는 limit 값을 전달하여 호출
  }, [dispatch, limit]);

  // 무한스크롤[s]
  const loadSearchFetch = async () => {
    try {
      const response = await testResult(limit); // limit 값을 전달하여 호출
      console.log('API 응답 데이터:', response); // 응답 데이터 디버깅

      // 응답 데이터에서 data와 results가 존재하는지 확인
      const newResult = response.data?.results;
      console.log('newResult:', newResult);

      if (Array.isArray(newResult) && newResult.length > 0) {
        dispatch(inputSearchResult([...result, ...newResult]));
      } else {
        console.log('더 이상 불러올 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  };

  useEffect(() => {
    const observerElement = observerRef.current;

    if (!observerElement) {
      console.error('Observer 요소를 못찾음');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setScrollPosition(window.scrollY); // 스크롤 위치 저장
          setLimit(prevLimit => prevLimit + 5); // limit 증가,
          loadSearchFetch(); // 데이터 로드
          console.log('스크롤됨');
        }
      });
    }, {
      threshold: 0.1
    }); // 적절한 값으로 설정

    observer.observe(observerElement);

    return () => {
      if (observerElement) {
        observer.unobserve(observerElement);
      }
    };
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때만 실행

  useEffect(() => {
    if (!isLoading) {
      loadSearchFetch(); // 데이터 로드
    }
  }, [limit]); // limit가 변경될 때마다 데이터 로드

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [result, scrollPosition]);

  return (
    <div>
      <ul>
        {result.map((value, idx) => (
          <li key={idx}><img src={value.imageUrl} alt={`Image ${idx}`} /></li>
        ))}
      </ul>
      <div className="observer" style={{ height: "100px", backgroundColor: "green" }} ref={observerRef}></div>
    </div>
  );
};

export default Test;
