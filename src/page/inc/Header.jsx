import React from 'react'

const Header = () => {
    return (
        <header>
            <form>
                <label>
                    <input type='search' placeholder='게임, 앱, 스토리 등'/>   
                    <button type="submit" className='btn-search'><span>🔍</span></button>           
                </label>
            </form>
            <button type="button" className='btn-cancel'><span>취소</span></button>
        </header>
    )
}

export default Header