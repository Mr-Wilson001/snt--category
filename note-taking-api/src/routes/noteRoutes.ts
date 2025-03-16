import { Router } from 'express';
import { getNotes, getNoteById, createNote, deleteNote, getNotesByCategory, updateNote } from '../controllers/noteController';
import { validateNote } from '../middleware/validateNote';

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', validateNote, createNote);
router.delete('/:id', deleteNote);
router.get('/categories/:categoryId', getNotesByCategory);
router.put('/:id', validateNote, updateNote);

export default router;
