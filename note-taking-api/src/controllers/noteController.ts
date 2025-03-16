import { Request, Response, NextFunction } from 'express';
import Note from '../models/noteModel';
import { ErrorHandler } from '../utils/errorHandler';

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find().populate('category');
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id).populate('category');
    if (!note) {
      throw new ErrorHandler(404, 'Note not found');
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category } = req.body;
    const newNote = new Note({
      title,
      content,
      category,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      throw new ErrorHandler(404, 'Note not found');
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const getNotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find({ category: req.params.categoryId }).populate('category');
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    ).populate('category');
    if (!note) {
      throw new ErrorHandler(404, 'Note not found');
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};