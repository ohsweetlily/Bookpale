import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import DaumPostCode from 'react-daum-postcode';
import Modal from '../components/Modal.js';

export default function SignUp() {
    const navigate = useNavigate();

    // useState로 필요한 상태 지정하기
    // const [user, setUser] = useState({});
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [zipCode, setZipcode] = useState('');
    const [address, setAddress] = useState('');

    // 이메일 유효성 검사로직
    // const validateEmail = (email) => {
    //     return email.toLowerCase().match();
    // };

    function serialize(rawData) {
        let rtnData = {};
        for (let [key, value] of rawData) {
            let sel = document.querySelectorAll('[name=' + key + ']');

            // Array Values
            if (sel.length > 1) {
                if (rtnData[key] === undefined) {
                    rtnData[key] = [];
                }
                rtnData[key].push(value);
            }
            // Other
            else {
                rtnData[key] = value;
            }
        }

        return rtnData;
    }

    const handle = {
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);

            setZipcode(data.zonecode);
            setAddress(data.address);

            document.querySelector('.btn-close').click();
        },
        clickBtn: (e) => {
            const frm = document.querySelector('#frm');
            let data = serialize(new FormData(frm));

            axios
                .post('/auth/signup', data)
                .then((response) => {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/signin');
                })
                .catch((err) => {
                    alert('에러가 발생했습니다.');
                    console.error(err);
                });
        },
    };

    return (
        <Container>
            <h1 className='mt-3'>회원가입</h1>
            <hr />
            <div className='d-flex justify-content-center'>
                <div className='input-form-backgroud row mb-5 w-50'>
                    <div className='input-form col-md-12 mx-auto'>
                        <h4 className='mb-3'>회원정보</h4>
                        <Form id='frm' className='validation-form'>
                            <div className='mb-3'>
                                <label htmlFor='name'>이메일</label>
                                <Form.Control type='text' className='form-control' id='email' name='email' placeholder='test@test.com' required />
                                <div className='invalid-feedback'>이메일을 입력해주세요.</div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name'>이름</label>
                                <Form.Control type='text' className='form-control' id='name' name='name' placeholder='홍길동' required />
                                <div className='invalid-feedback'>이름을 입력해주세요.</div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name'>비밀번호</label>
                                <Form.Control type='password' className='form-control' id='password' name='password' placeholder='********' required />
                                <div className='invalid-feedback'>비밀번호를 입력해주세요.</div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name'>비밀번호 확인</label>
                                <Form.Control type='password' className='form-control' id='confirmPassword' placeholder='********' required />
                                <div className='invalid-feedback'>비밀번호를 입력해주세요.</div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-6'>
                                    <label htmlFor='address2'>
                                        우편번호<span className='text-muted'></span>
                                    </label>
                                    <Form.Control type='text' className='form-control' id='zipCode' name='zipCode' value={zipCode} onChange={(e) => setZipcode(e.target.value)} placeholder='우편번호를 입력해주세요.' />
                                </div>
                                <div className='mb-3 col-md-6'>
                                    <label htmlFor='address2'>
                                        <span className='text-muted'></span>
                                    </label>
                                    <Modal title='주소 찾기' className='d-block col-md-12'>
                                        <DaumPostCode onComplete={handle.selectAddress} autoClose={false} />
                                    </Modal>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-7'>
                                    <label htmlFor='address1'>주소</label>
                                    <Form.Control type='text' className='form-control' id='address1' name='address1' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='주소를 입력해주세요.' required />
                                    <div className='invalid-feedback'>주소를 입력해주세요.</div>
                                </div>
                                <div className='mb-3 col-md-5'>
                                    <label htmlFor='address2'>
                                        상세주소<span className='text-muted'></span>
                                    </label>
                                    <Form.Control type='text' className='form-control' id='address2' name='address2' placeholder='상세주소를 입력해주세요.' />
                                </div>
                            </div>
                            <div className='mb-4'></div>
                            <div className='text-center'>
                                <Button onClick={handle.clickBtn} className='w-75' size='lg'>
                                    회원가입
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
}
