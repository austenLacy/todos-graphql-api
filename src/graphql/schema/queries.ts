import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    # get all todos
    todos: [Todo!]

    # get todo by its ID
    todo(id: UUID!): Todo
  }
`
