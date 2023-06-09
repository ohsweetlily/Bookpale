// express에서 Router로 지정을 하면 express만 불러오고 라우트요청이 가능한가요?
import express from 'express';
import Category from '../db/schemas/category.js';

const categoryRouter = express.Router();

//카테고리 조회
//GET http://localhost:3000/categories
categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find({});
        //Category스키마의 모든 데이터를 조회
        res.status(200).json(categories);
        // const data=categories.map((item)=>{return item.categoryname});
        // res.send(data);
    } catch (err) {
        console.error(err);
        res.send('조회 실패');
    }
});

//카테고리 생성
//POST http://localhost:3000/categories
categoryRouter.post('/', async (req, res, next) => {
    const { name } = req.body;
    try {
        const categories = await Category.create({
            name: name,
        });
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.send('create 실패');
    }
});

//카테고리 수정
//PUT http://localhost:3000/categories/:categoryId
categoryRouter.put('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        await Category.findByIdAndUpdate(categoryId, {
            name: name,
        });
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.send('update 실패');
    }
});

//카테고리 삭제
//DELETE http://localhost:3000/categories/:categoryId
categoryRouter.delete('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        await Category.findByIdAndDelete(categoryId);
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.send('delete 실패');
    }
});

// import문에서 외부로 가져다 쓰려면 리액트처럼 export default
export default categoryRouter;
