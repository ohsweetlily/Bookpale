import 'dotenv/config';
import app from './server.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('정상적으로 서버를 실행했습니다.', `시작포트번호: ${PORT}`);
});
