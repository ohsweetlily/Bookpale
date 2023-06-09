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
                    <Link to='/' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>주문관리</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>모든 주문 내역을 확인 및 관리할 수 있습니다.</p>
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
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>회원관리</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>모든 회원 정보를 확인 및 관리할 수 있습니다.</p>
                        </div>
                    </Link>
                    <Link to='/Category' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>카테고리 관리</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>제품이 속할 수 있는, 카테고리 정보를 추가하거나 수정 및 삭제할 수 있습니다.</p>
                        </div>
                    </Link>
                    <Link to='/ProductEdit' className={styles['menu-card']}>
                        <div className={styles['menu-icon']}>
                            <span className='icon has-text-info'>
                                {/* <i className='fa-solid fa-credit-card'></i> */}
                                <img src={png} width='70' alt='메뉴 아이콘' />
                            </span>
                        </div>
                        <div className={styles['menu-body']}>
                            <p className={(styles['title'], 'text-dark fw-bold fs-4')}>제품 관리</p>
                            <p className={(styles['subtitle'], 'text-dark fs-6')}>제품 정보를 추가하거나 수정 및 삭제할 수 있습니다.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
