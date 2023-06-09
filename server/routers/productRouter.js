import { Router } from 'express';
import Product from '../db/schemas/Product.js';
import upload from './upload.js';
import path from 'path';
import fs from 'fs';
import auth from '../middleware/authMiddleware.js';

const __dirname = path.resolve();
const productRouter = Router();

//상품 조회
//GET http://localhost:3000/products/list
productRouter.get('/list', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.send('상품 조회가 실패하였습니다.');
    }
});

//상품 상세 조회
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ _id: id });
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.send('상품 조회가 실패하였습니다.');
    }
});

//상품 추가 (관리자)
//POST http://localhost:3000/products
productRouter.post('/',auth, upload.single('filename'), async (req, res) => {
    const { title, categoryId, shortDescription, detailDescription, invetory, price } = req.body;
    const filename = req.file.filename;
    try {
        await Product.create({
            title: title,
            categoryId: categoryId,
            shortDescription: shortDescription,
            detailDescription: detailDescription,
            imageKey: filename,
            invetory: invetory,
            price: price,
        });
        res.send('create 성공');
    } catch (err) {
        console.error(err);
        res.send('상품 추가를 실패하였습니다.');
    }
});

//상품 수정  (관리자)
//PUT http://localhost:3000/products/:productId
productRouter.put('/:productId',auth, upload.single('filename'), async (req, res, next) => {
    const { productId } = req.params;
    const { title, categoryId, shortDescription, detailDescription, invetory, price } = req.body;
    const filename = req.file.filename;
    try {
        await Product.findByIdAndUpdate(productId, {
            title: title,
            categoryId: categoryId,
            shortDescription: shortDescription,
            detailDescription: detailDescription,
            imageKey: filename,
            invetory: invetory,
            price: price,
        });
        res.redirect('/products/list');
    } catch (err) {
        console.error(err);
        res.send('상품수정 실패');
    }
});

//상품 삭제 (관리자)
//DELETE http://localhost:3000/products/:productId
productRouter.delete('/:productId',auth, async (req, res, next) => {
    const { productId } = req.params;
    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('/products/list');
    } catch (err) {
        console.error(err);
        res.send('상품 삭제 실패');
    }
});

//카테고리별 상품 조회
//GET http://localhost:3000/products?categoryId=2
productRouter.get('/', async (req, res) => {
    const { categoryId } = req.query;
    try {
        const categoryProduct = await Product.find({ categoryId: categoryId });
        res.status(200).json(categoryProduct);
    } catch (err) {
        console.error(err);
        res.send('카테고리별 상품 조회가 실패하였습니다.');
    }
});

//img 요청
//<img src='http://localhost:3000/products/image/:imagekey'/>
productRouter.get('/image/:imagekey', (req, res) => {
    const { imagekey } = req.params;
    fs.readFile(path.join(__dirname, `../uploads/${imagekey}`), function (error, data) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
    });
});

// import 모듈  미사용
export default productRouter;
