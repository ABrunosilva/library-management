// src/app/models/book.model.ts
export interface Book {
  id: number;
  title: string;
  authorId: number;
  userId?: number;
}
