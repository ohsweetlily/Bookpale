import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import png from '../js.png';

export default function BookForm() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/products/list').then((response) => {
            setBooks(response.data);
        });
    }, []);

    return (
        <>
            <Container className='d-flex my-5 flex-wrap justify-content-between'>
                {books.map((book) => {
                    return (
                        <Card key={book._id} style={{ width: '22%', margin: '20px 10px' }}>
                            <Link to={`/detail/${book._id}`}>
                                <Card.Img variant='top' src={require(`../shop.jpg`)} />
                                {/* <Card.Img variant='top' src={require(`../../../server/uploads/${book.imageKey}`)} /> */}
                            </Link>
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{Number(book.price).toLocaleString()}원</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
        </>
    );
}
