import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { fetchSearchWord } from '../api/searchApi'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [inSearchWord, setInSearchWord] = useState('')
    const [resultSearchWord, setResultSearchWord] = useState('')

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const onSearchWord = (e) => {
        setInSearchWord(e.target.value)
    }

    // 쿼리 실행
    // A. useQuery는 데이터를 서버에서 가져오는 목적
    const {data} = useQuery( // useQuery(서버에서 데이터 가져오기 위한 함수)
        {
            queryKey: ['resultSearchWord', resultSearchWord], // resultSearchWord가 변경되면 쿼리 실행
            queryFn: async() => {
                const result = await fetchSearchWord(resultSearchWord) // 쿼리 함수, 비동기함수로 검색어에 맞는 데이터를 가져옴
// console.log(`result = ${JSON.stringify(result)}`);
                return result // 쿼리데이터를 반환
            },
            enabled: !!resultSearchWord, // resultSearchWord가 비어있지 않을 때만 쿼리 실행
            refetchOnWindowFocus: false,  // 화면 포커스 시 다시 불러오지 않도록 설정
            staleTime: 5*60*1000, // 데이터가 즉시 stale 상태로 간주되도록 설정 -> 데이터가 5분동안 최신으로 간주주
            cacheTime: 10*60*1000 // 이전캐시쿼리가 바로 삭제 -> 데이터는 10분동안 캐시에서 유지
        }
    )

    const onSearchSubmit = async(e) => {
        e.preventDefault() // 폼 기본 전송 금지
        setResultSearchWord(inSearchWord) // 검색어를 resultSearchWord로 설정
        queryClient.invalidateQueries(['resultSearchWord']) // 캐시를 강제로 리셋
    }

    useEffect(() => {
        if (resultSearchWord && data) {
// console.log(`data는 = ${JSON.stringify(data)}`)
            navigate(`/list`, {state: {data}}) // 데이터를 state로 전달해서 list컴포넌트로 이동
        }
    }, [resultSearchWord, data])
    
    return (
        <>
            <div className='search-box'>
                <form onSubmit={onSearchSubmit}>
                    <input type='search' placeholder='게임, 앱, 스토리 등' onChange={onSearchWord} value={inSearchWord} />
                    <button type='submit'>검색</button>
                </form>
            </div> 
        </>
    )
}

export default Search
