import { gql } from 'apollo-server-express'

export default gql`
  # INPUTS
  input TodoInput {
    id: UUID
    description: String
  }

  # TYPES
  type Todo {
    id: UUID
    description: String!
    status: TodoStatus!
    deletedAt: DateTime
  }
`
