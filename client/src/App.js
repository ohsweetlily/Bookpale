import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './pages/Main.js';
import Detail from './pages/Detail.js';
import Order from './pages/Order.js';
import Complete from './pages/Complete.js';
import AdminMenu from './pages/AdminMenu.js';
import Menu from './pages/Menu.js';
import Cart from './pages/Cart.js';
import History from './pages/History.js';
import Category from './pages/Category.js';
import BookForm from './components/BookForm.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import CategoryDisplay from './pages/CategoryDisplay.js';
import ProductEdit from './pages/ProductEdit.js';

//전역 상태관리를 위한 컨텍스트 선언
export const AppContext = createContext();

export default function App() {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

    return (
        // 1. 컨텍스트를 전역에서 사용하기 위해 Provider로 전체 구조를 감쌈
        // 2. 상태관리하고 싶은 변수나 객체를 value에 담음
        // 3. 해당 value들을 사용하고자 하는 component 또는 page에서 useContext를 통해 사용할 수 있음
        // ***주의할 점은 state의 값이 바뀌었을 때, 해당 state를 사용하는 모든 곳에서 리렌더링이 일어나기 때문에 주의를 요함
        <AppContext.Provider value={{ categories, setCategories, books, setBooks }}>
            <div className='vh-100'>
                <Main>
                    <Routes>
                        <Route exact path='/' element={<BookForm />}></Route>
                        <Route path='/adminMenu' element={<AdminMenu />}></Route>
                        <Route path='/menu' element={<Menu />}></Route>
                        <Route path='/detail/:id' element={<Detail />}></Route>
                        <Route path='/order' element={<Order />}></Route>
                        <Route path='/complete' element={<Complete />}></Route>
                        <Route path='/cart' element={<Cart />}></Route>
                        <Route path='/history' element={<History />}></Route>
                        <Route path='/category' element={<Category />}></Route>
                        <Route path='/categoryDisplay/:categoryName' element={<CategoryDisplay />}></Route>
                        <Route path='/signin' element={<SignIn />}></Route>
                        <Route path='/signup' element={<SignUp />}></Route>
                        <Route path='/productEdit' element={<ProductEdit />}></Route>
                    </Routes>
                </Main>
            </div>
        </AppContext.Provider>
    );
}
