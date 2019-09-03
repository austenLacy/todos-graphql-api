import { gql } from 'apollo-server-express'

export default gql`
  type Mutation {
    # create a new todo
    createTodo(todo: TodoInput): Todo!

    # update a todo by its ID
    updateTodoById(todoId: UUID, todo: TodoInput): Todo!

    # delete a todo by its ID
    deleteTodoById(todoId: UUID): UUID!
  }
`
