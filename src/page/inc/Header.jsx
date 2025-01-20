import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { fetchSearchWord } from '../../api/searchApi'
import { inputSearchWord } from '../../redux/searchAction'
import { useDispatch } from 'react-redux'

const Header = () => {
    const [inSearchWord, setInSearchWord] = useState('')
    const [resultSearchWord, setResultSearchWord] = useState('')
    
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const onSearchWord = (e) => {
        setInSearchWord(e.target.value)
    }

    const {data} = useQuery(
        {
            queryKey: ['resultSearchWord', resultSearchWord],
            queryFn: async() => {
                const result = await fetchSearchWord(resultSearchWord)
                dispatch(inputSearchWord(result))
                return result
            },
            enabled: !!resultSearchWord,
            refetchOnWindowFocus: false,
            staleTime: 0,
            cacheTime: 0 
        }
    )

    const onSearchSubmit = async(e) => {
        e.preventDefault()
        setResultSearchWord(inSearchWord)
        queryClient.invalidateQueries(['resultSearchWord'])
    }

    useEffect(() => {
        if(resultSearchWord && data) {
            window.location.reload()
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