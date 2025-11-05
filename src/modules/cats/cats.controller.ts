import { Request, Response } from "express";
import prisma from "../../config/prisma";

const createCatCard = async (req: Request, res: Response) => {
  try {
    const { image, name, color, age, paws, price, sale } = req.body;
    if (!name || !color || !age || !paws || !price) {
      return res.status(400).json({
        success: false,
        message: "Заполните все обязательные поля!",
      });
    }
    const newCatCard = await prisma.cats.create({
      data: {
        image: image || null,
        name,
        color,
        age: Number(age),
        paws: Number(paws),
        price: Number(price),
        sale: sale ? Number(sale) : 0,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Кот добавлен успешно!!!",
      cat: newCatCard,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Error in createCatCard: ${error}`,
    });
  }
};

const getAllCats = async (req: Request, res: Response) => {
  try {
    const cats = await prisma.cats.findMany();
    res.status(200).json({
      success: true,
      cats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getAllCats: ${error}`,
    });
  }
};

const deleteCatCard = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.params;
    if (!catsId) {
      return res
        .status(400)
        .json({ success: false, message: "Кот не найден!!!" });
    }
    const cats = await prisma.cats.delete({
      where: { id: catsId },
    });
    res.status(200).json({
      success: true,
      cats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in deleteCatCard: ${error}`,
    });
  }
};

export default {
  getAllCats,
  createCatCard,
  deleteCatCard,
};
