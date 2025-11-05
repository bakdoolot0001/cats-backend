import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import generateToken from "../../config/token";

const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, user.email);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: `Error in register: ${error}`,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Такой пользователь не существует!!!",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "У этого пользователя нет пароля!",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Неверный пароль!!!",
      });
    }
    const token = generateToken(user.id, user.email);
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        userName: user.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in login: ${error}`,
    });
  }
};

export default {
  register,
  login,
};
