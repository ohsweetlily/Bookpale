import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Styles from '../css/History.module.css';

export default function History() {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        axios.get(`/orders/${localStorage.user}`).then((response) => setOrderList(response.data));
    }, []);

    function handleClick(id, status) {
        if (status === '주문취소') {
            return alert('이미 취소된 건입니다.');
        }

        if (window.confirm('취소하시겠습니까?')) {
            axios.put(`/orders/${id}/delete`).then((response) => {
                alert('취소되었습니다.');

                orderList.map((order) => {
                    if (order._id === id) {
                        order.status = '주문취소';
                        return order;
                    }
                });

                setOrderList([...orderList]);
            });
        }
    }

    return (
        <Container>
            <h1 className='mt-3'>주문조회</h1>
            <hr />
            <div className='input-form-backgroud row mb-5'>
                <div className='input-form' style={{ marginTop: '1.5rem' }}>
                    <Container>
                        <Row className={Styles.th}>
                            <Col>날짜</Col>
                            <Col xs={5}>주문정보</Col>
                            <Col>상태</Col>
                            <Col>신청</Col>
                        </Row>
                        {orderList &&
                            orderList.map((item, i) => {
                                return (
                                    <Row key={i} className={Styles.tr}>
                                        <Col>{item.orderDate}</Col>
                                        <Col className='flex-column' xs={5}>
                                            {item.products.map((product, i) => {
                                                return (
                                                    <span key={i}>
                                                        {product.title} / {product.amount}개
                                                    </span>
                                                );
                                            })}
                                        </Col>
                                        <Col>{item.status}</Col>
                                        <Col>
                                            <Button variant='danger' size={'sm'} onClick={() => handleClick(item._id, item.status)}>
                                                주문 취소
                                            </Button>
                                        </Col>
                                    </Row>
                                );
                            })}
                    </Container>
                </div>
            </div>
        </Container>
    );
}
