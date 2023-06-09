import React from 'react';

// 부트스트랩 모듈 불러오기
import 'bootstrap/dist/css/bootstrap.min.css';

// 사용할 컴포넌트 import
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Main({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}
