import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Complete() {
    return (
        <div className='container'>
            <h1 className='mt-3'>주문완료</h1>
            <hr />
            <div className='input-form-backgroud row mb-5 w-100'>
                <div className='input-form col-md-12 mx-auto' style={{ maxWidth: '380px', marginTop: '5rem' }}>
                    <h4 className='mb-5 text-center'>주문이 완료되었습니다!</h4>
                    <div className='d-flex flex-column w-75 mx-auto'>
                        <Link to='/history'>
                            <Button className='mb-3 mt-3 w-100' variant='secondary'>
                                주문내역 보기
                            </Button>
                        </Link>
                        <Link to='/'>
                            <Button className='w-100'>쇼핑 계속하기</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
