export interface ITodo {
  id: string;
  description: string;
  status: string;
  deletedAt?: Date;
}

export interface ITodoInput {
  id: string;
  description?: string;
  status?: string;
  deletedAt?: Date;
}
