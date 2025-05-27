export interface Book {
  id?: number;
  title: string;
  author: string;   // pode manter para o nome
  authorId: number; // id do autor para relação
  // outros campos...
}
