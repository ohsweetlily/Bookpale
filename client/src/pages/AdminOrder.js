import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';

import Modal from '../components/Modal.js';

export default function AdminOrder() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3000/orders`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                Modal(error);
            });
    }, []);

    const changeHandler = (e) => {
        setOrderStatus(e.target.value);
        console.log('e.target.value', e.target.value);
        console.log('orderStatus', orderStatus);

        axios
          .post(`http://localhost:3000/orders/:orderId`)
          .then((res) => {
            console.log(res)
            Modal("배송 상태가 수정되었습니다.")
            navigate("/")
          })
          .catch((err) => {
            Modal(err)
          })
    };

    const deleteOrder = (e) => {
      console.log(e.target.id)
      axios
      .delete(`http://localhost:3000/orders/:orderId`)
      .then((res) => {
          window.location.href = "/adminOrders";  
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <Container>
      <h1 className='mt-3'>주문 관리</h1>
      <hr />
      <div className='input-form-backgroud row mb-5'>
      <div className='input-form' style={{ marginTop: '1.5rem' }}>
        
      </div>
      </div>
      
    </Container>
  )
}
