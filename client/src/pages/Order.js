import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DaumPostCode from 'react-daum-postcode';

import Modal from '../components/Modal.js';

export default function Order() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSingle, setIsSingle] = useState(false);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipCode, setZipcode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const book = location.state?.book;

    //추후 토큰으로 로그인 된 계정의 id값을 이용하여 회원 정보를 조회 현재는 임시 데이터 바인딩
    useEffect(() => {
        if (book) setIsSingle(true);

        const userInfo = JSON.parse(localStorage.user);

        setUser(userInfo);
        setName(userInfo.name);
        setZipcode(userInfo.address?.zipCode);
        setAddress1(userInfo.address?.address1);
        setAddress2(userInfo.address?.address2);

        setTotalPrice(
            cart.reduce((a, b) => {
                return a + Number(b.price * b.amount);
            }, 0)
        );
    }, []);

    const handle = {
        getDate: () => {
            let today = new Date();

            let year = today.getFullYear(); // 년도
            let month = String(today.getMonth() + 1).padStart(2, '0'); // 월
            let date = String(today.getDate()).padStart(2, '0'); // 날짜
            let day = today.getDay(); // 요일

            return `${year}-${month}-${date}`;
        },
        selectAddress: (data) => {
            setZipcode(data.zonecode);
            setAddress1(data.address);

            document.querySelector('.btn-close').click();
        },
        clickBuy: () => {
            let json = {};

            if (isSingle) {
                json = {
                    products: [{ title: book.title, amount: '1' }],
                    totalPrice: book.price,
                    address: {
                        zipCode,
                        address1,
                        address2,
                    },
                    receiverName: name,
                    receiverPhoneNumber: phoneNumber,
                    status: '배송준비중',
                    orderDate: handle.getDate(),
                    orderUser: user.email,
                };
            } else {
                json = {
                    products: [],
                    totalPrice,
                    address: {
                        zipCode,
                        address1,
                        address2,
                    },
                    receiverName: name,
                    receiverPhoneNumber: phoneNumber,
                    status: '배송준비중',
                    orderDate: handle.getDate(),
                    orderUser: user.email,
                };

                cart.map((item) => {
                    json.products.push({ title: item.title, amount: item.amount });
                });

                localStorage.removeItem('cart');
            }

            axios.post('/orders', json);
            navigate('/complete');
        },
    };

    return (
        <div>
            <div className='container'>
                <h1 className='mt-3'>주문결제</h1>
                <hr />
                <div className='d-flex justify-content-between'>
                    <div className='input-form-backgroud row mb-5 w-50'>
                        <div className='input-form col-md-12 mx-auto'>
                            <h4 className='mb-3'>배송지정보</h4>
                            <form className='validation-form'>
                                <div className='mb-3'>
                                    <label htmlFor='name'>이름</label>
                                    <input type='text' className='form-control' id='name' placeholder='홍길동' value={name} onChange={(e) => setName(e.target.value)} required />
                                    <div className='invalid-feedback'>이름을 입력해주세요.</div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='phoneNumber'>연락처</label>
                                    <input type='phoneNumber' className='form-control' id='phoneNumber' placeholder='010-1234-5678' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    <div className='invalid-feedback'>연락처를 입력해주세요.</div>
                                </div>
                                <div className='row'>
                                    <div className='mb-3 col-md-6'>
                                        <label htmlFor='address2'>
                                            우편번호<span className='text-muted'></span>
                                        </label>
                                        <input type='text' className='form-control' id='zipCode' placeholder='우편번호를 입력해주세요.' value={zipCode} onChange={(e) => setZipcode(e.target.value)} />
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
                                        <input type='text' className='form-control' id='address1' placeholder='서울특별시 강남구' value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                                        <div className='invalid-feedback'>주소를 입력해주세요.</div>
                                    </div>
                                    <div className='mb-3 col-md-5'>
                                        <label htmlFor='address2'>
                                            상세주소<span className='text-muted'></span>
                                        </label>
                                        <input type='text' className='form-control' id='address2' placeholder='상세주소를 입력해주세요.' value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </div>
                                </div>
                                <div className='mb-4'></div>
                            </form>
                        </div>
                    </div>
                    <div className='input-form-backgroud row mb-5 w-50'>
                        <div className='input-form col-md-12 mx-auto d-flex flex-column justify-content-between'>
                            <h4 className='mb-3'>결제정보</h4>
                            <div className='d-flex flex-column align-items-end'>
                                <div className='col-md-12 mb-3 d-flex justify-content-between'>
                                    <label htmlFor='name'>주문상품</label>
                                    <div className='d-flex flex-column align-items-end'>
                                        {isSingle ? (
                                            <span>{book.title} / 1개</span>
                                        ) : (
                                            cart.map((cart, i) => {
                                                return (
                                                    <span key={i}>
                                                        {cart.title} / {cart.amount}개
                                                    </span>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                <div className='col-md-12 mb-3 d-flex justify-content-between'>
                                    <label htmlFor='name'>상품총액</label>
                                    <span>
                                        {isSingle
                                            ? Number(book?.price).toLocaleString()
                                            : cart &&
                                              cart
                                                  .reduce((a, b) => {
                                                      return a + Number(b.price * b.amount);
                                                  }, 0)
                                                  .toLocaleString()}
                                        원
                                    </span>
                                </div>
                                <div className='col-md-12 mb-3 d-flex justify-content-between'>
                                    <label htmlFor='name'>배송비</label>
                                    <span>3,000원</span>
                                </div>
                            </div>
                            <div className='mb-4'></div>
                            <div className='text-center'>
                                <Button onClick={handle.clickBuy} className='w-75' size='lg'>
                                    결제하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
