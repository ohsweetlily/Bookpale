import React, { useEffect, useState } from 'react';
import axios from 'axios';
import png from '../js.png';
import { Button, Form, FormGroup, Row, Col } from 'react-bootstrap';
import styles from '../css/Cart.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);
    const user = localStorage.getItem('user');

    useEffect(() => {}, []);

    //{/* 결제하기 페이지 넘기기 */}
    function ClickOrder(e) {
        e.preventDefault();
        if (user) {
            navigate('/order');
        } else {
            alert('로그인 후 구매 가능합니다.');
            navigate('/signin');
        }
    }

    function handleChangeAmount(id, e) {
        const copy = [...cart];

        copy.map((item) => {
            if (item._id === id) {
                item.amount = e.target.value;
            }
        });

        setCart([...copy]);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function handleClickDeleteAll() {
        if (window.confirm('장바구니를 비우시겠습니까?')) {
            localStorage.removeItem('cart');
            alert('장바구니를 비웠습니다.');
            setCart([]);
        }
    }

    function handleClickDelete(id) {
        if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
            const cart = JSON.parse(localStorage.getItem('cart')).filter((item) => item._id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            setCart([...cart]);

            alert('해당 상품을 삭제했습니다.');
        }
    }

    return (
        <div className={styles['cartContainer']}>
            {/* 장바구니 상단 이름 */}
            <div className={styles['cartHeader']}>
                <h1>장바구니</h1>
                <h6> &nbsp; → &nbsp; 주문 &nbsp; → &nbsp; 주문완료 </h6>
                <hr />
            </div>

            {/* 상자 디자인들 부트스트랩 변경 */}
            <div className={styles['cartBody']}>
                {/* 장바구니 메인 페이지 */}
                {/* 장바구니 내역들 요소들 칸 조정 예정 */}
                <div className={styles['cartList']}>
                    {/* 장바구니 전체선택 체크박스 */}
                    <div className={styles['cartCheck']}>
                        {/* <input type='checkbox' id='allSelectCheckbox' /> */}
                        {/* 선택 시 장바구니 속 모든 상품 체크박스 체크되도록 추가 예정 */}
                        {/* <label>&nbsp; 전체선택 &nbsp; | &nbsp;</label> */}
                        {/* 선택삭제 기능 추가 예정 */}
                        <Button variant='danger' onClick={handleClickDeleteAll}>
                            전체삭제
                        </Button>
                        <hr />
                    </div>

                    {/* 장바구니 리스트 모음 */}
                    {/* 장바구니 내역 업데이트 될 때마다 상품 리스트 추가되도록 변경 예정 */}
                    {cart &&
                        cart.map((item, i) => {
                            return (
                                <div key={i} className='mb-5'>
                                    <div className={styles['cartItems']}>
                                        {/* 체크박스 하나씩 인식할 수 있도록 기능 추가 */}
                                        {/* <input type='checkbox' id='SelectCheckbox' /> */}
                                        <img src={require(`../shop.jpg`)} />
                                        {/* <img src={require(`../../../server/uploads/${item.imageKey}`)} /> */}
                                        <div className={styles['productContent']}>
                                            <h4 className={styles['productName']}>{item.title}</h4>
                                            {/* 도서 수량 최소 1권 이상 99권 이하로 지정될 수 있도록 변경 예정 */}
                                            {/* 버튼/div 한 줄로 배치 변경 예정 */}
                                            <Row>
                                                <label className='w-50 my-auto'>수량 : </label>
                                                <Form.Control className='w-50' defaultValue={item.amount} type='number' onChange={(e) => handleChangeAmount(item._id, e)} />
                                            </Row>
                                        </div>
                                        {/* 요소들 한 줄로 배열 변경 예정 */}
                                        <div className={(styles['calculation'], 'd-flex align-items-center')}>
                                            {/* 상품 가격 받아오는 가격으로 변경 예정 */}
                                            <span id='productPrice'>{Number(item.price).toLocaleString()}원</span>
                                            <span id='multifly'>×</span>
                                            <span id='updatedQuantity'>{Number(item.amount).toLocaleString()}개</span>
                                            <span id='equal'>=</span>
                                            {/* price * Quantity 로 변경 예정 */}
                                            <span id='totalPrice'>{(Number(item.price) * Number(item.amount)).toLocaleString()}원</span>
                                        </div>
                                        <Button className='h-25 my-auto' variant='danger' onClick={() => handleClickDelete(item._id)}>
                                            삭제
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* 장바구니 요약 */}
                {/* 상자 디자인들 부트스트랩 변경 */}
                <div className={styles['cartSummary']}>
                    <h4>결제정보</h4>
                    <hr />
                    {/* 총 상품 개수 업데이트 되도록 변경 예정 */}
                    <div className={styles['summaryInfo']}>
                        <p>상품수</p>
                        <p id='productsCount'>{cart.length}개</p>
                    </div>

                    <div className={styles['summaryInfo']}>
                        <p>배송비</p>
                        <p id='deliveryFee'>3,000원</p>
                    </div>
                    <hr />

                    {/* 결제 금액 업데이트되도록 변경 예정 */}
                    <div className={styles['totalInfo']}>
                        <h4>총 결제금액</h4>
                        <h4 id='totalPrice'>
                            {(
                                cart.reduce((a, b) => {
                                    return a + Number(b.price * b.amount);
                                }, 0) + 3000
                            ).toLocaleString()}
                            원
                        </h4>
                    </div>
                    <div className='text-center'>
                        {/* 버튼 누르면 그냥 하얀 화면이 뜸 */}
                        {/* 장바구니 상품이 없으면 '결제할 상품이 없습니다' 뜰 수 있도록 변경 예정 */}
                        {/* 총액과 버튼 간 간격 조정 예정*/}
                        <Button className='w-75' size='lg' onClick={ClickOrder}>
                            결제하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
