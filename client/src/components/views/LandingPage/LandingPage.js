import React, { useEffect } from 'react'
import axios from 'axios';


function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))

    }, [])


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
           <h1>시작 페이지</h1>
            {/* 헬로우 여러분. 이 메시지는 LandingPage.js에서 설정 할 수 있습니다. */}
        </div>
    )
}

export default LandingPage




