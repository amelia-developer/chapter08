import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { fetchSearchWord } from '../../api/searchApi'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const [inSearchWord, setInSearchWord] = useState('')
    const [resultSearchWord, setResultSearchWord] = useState('')
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const onSearchWord = (e) => {
        setInSearchWord(e.target.value)
    }

    const {data} = useQuery(
        {
            queryKey: ['resultSearchWord', resultSearchWord],
            queryFn: async() => {
                const result = await fetchSearchWord(resultSearchWord)
                return result
            },
            enabled: !!resultSearchWord,
            refetchOnWindowFocus: false,
            staleTime: 5*60*1000,
            cacheTime: 10*60*1000
        }
    )

    const onSearchSubmit = async(e) => {
        e.preventDefault()
        setResultSearchWord(inSearchWord)
        queryClient.invalidateQueries(['resultSearchWord'])
    }

    useEffect(() => {
        if(resultSearchWord && data) {
            navigate(`/list`, {state: {data}}) 
        }
// console.log(`testtesttest`)
    }, [resultSearchWord, data])

    return (
        <header>
            <form onSubmit={onSearchSubmit}>
                <label>
                    <input type='search' placeholder='게임, 앱, 스토리 등' onChange={onSearchWord} value={inSearchWord}/> 
                    <button type="submit" className='btn-search'><span>🔍</span></button>
                </label>
            </form>
            <button type="button" className='btn-cancel'><span>취소</span></button>
        </header>
    )
}

export default Header