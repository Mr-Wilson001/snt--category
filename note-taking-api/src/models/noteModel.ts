import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category';

interface INote extends Document {
  title: string;
  content: string;
  category: ICategory['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

const Note = model<INote>('Note', noteSchema);

export default Note;
export { INote };