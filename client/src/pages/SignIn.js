import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FloatingLabel, Form, Button } from 'react-bootstrap';

import setAuthorizationToken from '../util/setAuthorizationToken';

// true로 설정해야 refreshtoken으로 주고 받을 수 있음
// CROS 정책을 허용한다는 의미
axios.defaults.withCredentials = true;

export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        axios
            .post('/auth/login', { email, password })
            .then((response) => {
                alert('로그인되었습니다.');
                const token = response.data.token;
                localStorage.setItem('jwt', token);
                localStorage.setItem('user', response.data.user);

                setAuthorizationToken(token);

                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            });
    }

    return (
        <>
            <div className={styles['container']} />
            <div className={styles['signin-form']}>
                <h1 className='mt-4'>로그인</h1>
                <hr />
                {/* 로그인 입력창  */}
                <div className=''></div>
                <FloatingLabel controlId='floatingInput' label='Email address' className='mb-3'>
                    <Form.Control type='email' placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId='floatingPassword' label='Password'>
                    <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                {/* 로그인 회원가입 버튼 묶음 */}
                <div className='d-grid gap-2 mt-5'>
                    <Button variant='primary' size='lg' onClick={handleLogin}>
                        로그인
                    </Button>
                    <Button variant='secondary' size='lg' onClick={() => navigate('/signup')}>
                        회원가입
                    </Button>
                </div>
            </div>
        </>
    );
}
