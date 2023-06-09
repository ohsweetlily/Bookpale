import jwt from "jsonwebtoken"

function adminHandler(req, res, next) {
    const userToken = req.headers["authorization"]?.split(" ")[1];

    //null일 경우, 토큰 없을 경우 로그인 필요한 서비스 사용 제한
    if (!userToken || userToken === "null") {
        console.log("서비스사용 요청. 그러나 Authorization 토큰 없음");
        res.status(401).json({
            result: "forbidden-approach",
            reason: "로그인한 유저만 사용할 수 있는 서비스입니다."
        });
        
        return;
    }

    //관리자 토큰 확인
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        const role = jwtDecoded.role;

        if (role !== "admin") {
            console.log("서비스사용 요청. 그러나 관리자 아님");

            res.status(403).json({
                result: "forbidden-approach",
                reason: "관리자만 사용할 수 있는 서비스입니다.",
            });

            return;
        }

        next();
    } catch (error) {
        next(error);

        return;
    }
}

export { adminHandler };