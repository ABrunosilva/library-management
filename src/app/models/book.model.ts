export interface Book {
  id: number; // Remove optional (?) - make required
  title: string;
  authorId: number; // Change from number | string to just number
  userId?: number;
}