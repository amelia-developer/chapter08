import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchWord } from '../../api/searchApi';

const Header = () => {
  const [inSearchWord, setInSearchWord] = useState('')
  const [resultSearchWord, setResultSearchWord] = useState('')
  const [loadingTimeout, setLoadingTimeout] = useState(false) // 로딩 시간 설정 상태 추가
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSearchWord = (e) => {
    setInSearchWord(e.target.value)
  };

  const { data, isLoading, isFetching } = useQuery(
    {
      queryKey: ['resultSearchWord', resultSearchWord],
      queryFn: async () => {
        const result = await fetchSearchWord(resultSearchWord);
        return result;
      },
      enabled: !!resultSearchWord,
      refetchOnWindowFocus: false, // 포커스 시 새로고침 금지
      staleTime: 0, // 0은 데이터를 자주 갱신하도록 (캐시된 데이터라도 새로 불러옴), 5000을 하면 5초동안 캐시된 데이터 유효
      cacheTime: 10 * 60 * 1000 // 10분동안 캐시 유지
    }
  );

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setResultSearchWord(inSearchWord);
    // queryClient.invalidateQueries(['resultSearchWord'])
  }

  useEffect(() => {
    if (resultSearchWord && data) {
      queryClient.invalidateQueries(['resultSearchWord'])
      navigate(`/list`, { state: { data } })
    }
  }, [resultSearchWord, data, navigate])

  useEffect(() => {
    let timer;
    if (isFetching) {
      timer = setTimeout(() => {
        setLoadingTimeout(true)
      }, 3000) // 3초 후에 로딩 화면을 유지하도록 설정
    } else {
      setLoadingTimeout(false) // 로딩이 끝나면 로딩 상태 해제
    }

    // 컴포넌트가 언마운트되거나 isFetching 변경 시 타이머 클리어
    return () => clearTimeout(timer)
  }, [isFetching])


  const onCancel = () => {
    alert(`search화면으로 돌아갑니다`)
    navigate(`/`)
  }

  if(isLoading || (isFetching && !loadingTimeout)) {
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
  return (
    <header>
      <form onSubmit={onSearchSubmit}>
        <label>
          <input type='search' placeholder='게임, 앱, 스토리 등' onChange={onSearchWord} value={inSearchWord} /> 
          <button type="submit" className='btn-search'><span>🔍</span></button>
        </label>
      </form>
      <button type="button" className='btn-cancel' onClick={onCancel}><span>취소</span></button>
    </header>
  );
};

export default Header;
