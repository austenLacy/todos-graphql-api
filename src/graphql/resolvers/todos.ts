import { ApolloError } from 'apollo-server-express'

import db from 'db/'

const queries = {
  /**
   * Fetches all todos
   */
  todos: async (parent, args, { req }) => {
    // try {
    //   return []
    // } catch (e) {
    //   console.log(e, req.requestId)
    //   throw new ApolloError(e)
    // }
    return []
  },

  /**
   * Fetches a todo by ID
   */
  todo: async (parent, args, { req }) => {
    // const { todoId } = args

    return {}
  }
}

const mutations = {
  /**
   * Creates a todo
   */
  createTodo: async (parent, args, { req }) => {
    // const { todo: newTodo } = args

    return {}
  },

  /**
   * Update a todo by its ID
   */
  updateTodoById: async (parent, args, { req }) => {
    // const { todoId } = args

    return {}
  },

  /**
   * Delete a todo by its ID
   */
  deleteTodoById: async (parent, args, { req }) => {
    // const { todoId } = args

    return ''
  }
}

export { queries, mutations }
