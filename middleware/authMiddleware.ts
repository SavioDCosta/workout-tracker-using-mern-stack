// import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
  // try {
  //   const token = req.header("Authorization").replace("Bearer ", "");
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).send({ message: "Please authenticate." });
  // }
};

export default authMiddleware;
