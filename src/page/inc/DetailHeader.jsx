import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const DetailHeader = ({item}) => {
    const [topisShow, setTopisShow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const topHandleScroll = () => {
            const scrollPosition = window.scrollY // 현재스크롤위치

            if(scrollPosition >= 20) {
                setTopisShow(true)
            } else {
                setTopisShow(false)
            }
        }

        // 스크롤이벤트
        window.addEventListener('scroll', topHandleScroll)
        // 컴포넌트 언마운트시 스크롤이벤트리스너 제거
        return() => {
            window.removeEventListener('scroll', topHandleScroll)
        }
    }, [])

    const onList = () => {
        navigate(-1)
    }

    useEffect(() => {
        window.scrollTo(0, 0) // 상세 페이지에서는 무조건 맨 위로 스크롤
    }, [])
    
    return (
        <>
            <div className={topisShow ? 'detail-top-box on' : 'detail-top-box'}>
                <button type='button' className='btn-search' onClick={onList}>&lt; 검색</button>
                <img src={item.artworkUrl100} alt=""/>
                <button type='button' className='btn-open'>열기</button>
            </div>
        </>
    )
}

export default DetailHeader