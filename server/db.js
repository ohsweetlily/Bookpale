//db 연결 파일
// import문으로 수정했고 import문에서는 module.export사용 X
import "dotenv/config";
import mongoose from 'mongoose';
// mongoDB주소를 전부 env파일에 넣으면 코드가 줄어듬 
// const { ATLAS_NAME, ATLAS_PWD } = process.env;

// mongoose URL도 env 파일로 전부 선언 
const DB_URL = process.env.MONGODB_URL;
// 엄격모드를 실행시 빈 객체를 주면 오류가 날수 있기때문에 false로 기본설정
// 추후 변경가능성 있음 
mongoose.set('strictQuery', false);

// mongoose의 connection의 행위를 db로 선언
mongoose.connect(DB_URL);
const db = mongoose.connection;

// 연결 성공시
db.on("connected", () => console.log("정상적으로 MongoDB Atlas서버에 연결되었습니다." + DB_URL));
// 연결 실패시
db.on("error", (error) => console.error("MongoDB Atlas 서버 연결에 실패했습니다.." + DB_URL + error));
