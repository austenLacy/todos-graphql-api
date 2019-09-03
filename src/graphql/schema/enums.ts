import { gql } from 'apollo-server-express'

export default gql`
  enum TodoStatus {
    done
    undone
  }
`
