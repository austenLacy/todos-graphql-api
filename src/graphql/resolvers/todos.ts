import { ApolloError } from 'apollo-server-express'

import db from '../../db/'
import { ITodo, ITodoInput } from '../../types/todos'

const queries = {
  /**
   * Fetches all todos
   */
  todos: async (parent, args, { req }) : Promise<[ITodo]> => {
    try {
      return db.get('todos').value()
    } catch (e) {
      console.log(e, req.requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Fetches a todo by ID
   */
  todo: async (parent, args, { req }) : Promise<ITodo> => {
    try {
      const { id }: { id: string } = args

      return db
        .get('todos')
        .getById(id)
        .value()
    } catch (e) {
      console.log(e, req.requestId)
      throw new ApolloError(e)
    }
  }
}

const mutations = {
  /**
   * Creates a todo
   */
  createTodo: async (parent, args, { req }) : Promise<ITodo> => {
    try {
      const { todo: newInput }: { todo: ITodoInput } = args

      return db
        .get('todos')
        .insert(newInput)
        .write()
    } catch (e) {
      console.log(e, req.requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Update a todo by its ID
   */
  updateTodoById: async (parent, args, { req }) : Promise<ITodo> => {
    try {
      const { todo: newInput, todoId }: { todo: ITodoInput, todoId: string } = args

      return db.get('todos')
        .find({ id: todoId })
        .assign(newInput)
        .write()
    } catch (e) {
      console.log(e, req.requestId)
      throw new ApolloError(e)
    }
  },

  /**
   * Delete a todo by its ID
   */
  deleteTodoById: async (parent, args, { req }) : Promise<string> => {
    try {
      const { id }: { id: string } = args

      db.get('todos').remove({ id }).write()

      return id
    } catch (e) {
      console.log(e, req.requestId)
      throw new ApolloError(e)
    }
  }
}

export { queries, mutations }
