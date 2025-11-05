import jwt from "jsonwebtoken";

const generateToken = (userId: string, userEmail: string) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  return jwt.sign(
    {
      id: userId,
      email: userEmail,
    },
    JWT_SECRET,
    { expiresIn: "3h" }
  );
};

export default generateToken;
