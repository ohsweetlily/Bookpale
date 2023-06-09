// import'./db/schemas/database';
import 'dotenv/config';
import 'express-async-errors';
// import './serverOnCheck.js'
import './db.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// 라우터 설정
import userRouter from './routers/userRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

// import
// const CategoryRouter = require('./routers/categoryRouter');
// const ProductRouter = require('./routers/productRouter');
// const OrderRouter = require('./routers/orderRouter');
// import { connect } from 'mongoose';
// import morgan from 'morgan';

// express를 app에 선언
const app = express();

/* json으로 이루어진 Requset body를 요청받았을때 요청값을 제대로 받아오기위해
  body-parser 대신 사용하는 코드 */
app.use(express.json());

// var cors로 선언했던 부분 안에 요청 메서드와 CORS 정책 초기값, URL 선언
app.use(
    cors({
        // origin: 'http//localhost:3000',
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

// package.json에 선언한 npm패키지 사용선언
app.use(helmet());
/* 요청과 응답에 대한 정보를 콘솔로 기록해주는 것*/
// app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// 라우터 설정할 코드모음
// app.use('/auth');

// app.use((error, req, res, next) => {
//   if(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something Wrong!'});
//   }
// });

// db(); //db 연결시 주석 해제

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/auth', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// mongoDB를 연결할할때 서버에서 불러와야할 config설정의 host 포트번호
// connectDB().then(() => {
//   console.log('mongoDB is connected');
//   app.listen(config.host.port);
// });
export default app;
