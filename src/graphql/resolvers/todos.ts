import { ApolloError } from 'apollo-server-express'

import { ITodo, ITodoInput } from '../../types/todos'

const queries = {
  /**
   * Fetches all todos
   */
  todos: async (parent, args, { req, db, requestId }) : Promise<[ITodo]> => {
    try {
      return db.instance.get('todos').value()
    } catch (e) {
      console.log(e, requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Fetches a todo by ID
   */
  todo: async (parent, args, { req, db, requestId }) : Promise<ITodo> => {
    try {
      const { id }: { id: string } = args

      return db.instance
        .get('todos')
        .getById(id)
        .value()
    } catch (e) {
      console.log(e, requestId)
      throw new ApolloError(e)
    }
  }
}

const mutations = {
  /**
   * Creates a todo
   */
  createTodo: async (parent, args, { req, db, requestId }) : Promise<ITodo> => {
    try {
      const { todo: newInput }: { todo: ITodoInput } = args

      return db.instance
        .get('todos')
        .upsert(newInput)
        .write()
    } catch (e) {
      console.log(e, requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Update a todo by its ID
   */
  updateTodoById: async (parent, args, { req, db, requestId }) : Promise<ITodo> => {
    try {
      const { todo: newInput, todoId }: { todo: ITodoInput, todoId: string } = args

      return db.instance
        .get('todos')
        .find({ id: todoId })
        .assign(newInput)
        .write()
    } catch (e) {
      console.log(e, requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Delete a todo by its ID
   */
  deleteTodoById: async (parent, args, { req, db, requestId }) : Promise<string> => {
    try {
      const { id }: { id: string } = args

      db.instance.get('todos').remove({ id }).write()

      return id
    } catch (e) {
      console.log(e, requestId)
      throw new ApolloError(e)
    }
  }
}

export { queries, mutations }
