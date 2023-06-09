import styles from '../css/Menu.module.css';
import png from '../js.png';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <>
            <div className='container'>
                <h1 className='mt-3'>메뉴</h1>
                <hr />
                <div className={styles['menu-container']}>
                    <Link to='/history' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>주문조회</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>지난 주문 내역을 확인, 취소할 수 있습니다.</p>
                        </div>
                    </Link>
                    <Link to='/' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>회원정보 관리</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>회원 정보를 확인, 수정할 수 있습니다.</p>
                        </div>
                    </Link>
                    <Link to='/' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>회원탈퇴</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>모든 정보를 안전하게 삭제한 후 탈퇴할 수 있습니다.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
