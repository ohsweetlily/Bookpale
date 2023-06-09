// import형식으로 변경
import { Router } from 'express';
import Order from '../db/schemas//Order.js';
import auth from '../middleware/authMiddleware.js';

/* 라우터는 orderRouter로 선언 
라우터를 불러올때 import던 requrie문이던 express로 불러온 후
express.Router() 형태를 사용했는데 {}를 사용해서 epxress의 기능을 꺼내올수있음?
 const router = Router(); */

const orderRouter = Router();

orderRouter.post('/', auth, async (req, res, next) => {
    const json = req.body;

    console.log(json);

    try {
        await Order.create(json);
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.send('create 실패');
    }
});

//관리자기능 - 주문 전체내역 조회
orderRouter.get('/', auth, async (req, res, next) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (err) {
        console.error(err);
        res.send('주문 조회가 실패하였습니다.');
    }
});

//관리자, 유저기능
//관리자면 선택한 id와 동일한 id주문 확인.
//회원이면 회원 id와 동일한 id내역 확인.(조건 넣어야함)
orderRouter.get('/:orderId', auth, async (req, res, next) => {
    const orderUser = JSON.parse(req.params.orderId).email;
    try {
        const orders = await Order.find({ orderUser });
        console.log(orderUser, orders);
        res.send(orders);
    } catch (err) {
        console.error(err);
        res.send('조회할 주문이 없습니다.');
    }
});

orderRouter.put('/:orderId', async (req, res, next) => {
    res.send('주문수정');
});

//관리자기능
orderRouter.put('/:orderId', async (req, res, next) => {
    res.send('주문상태변경(배송중)');
});

//유저 body: {status: DELETE}
orderRouter.put('/:orderId/delete', async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const user = await Order.findByIdAndUpdate({ _id: orderId }, { status: '주문취소' });
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.send('주문 조회가 실패하였습니다.');
    }
});

//관리자 기능
orderRouter.delete('/:orderId', async (req, res, next) => {
    res.send('주문삭제');
});

export default orderRouter;
