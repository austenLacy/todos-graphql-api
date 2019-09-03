import { gql } from 'apollo-server-express'

import enums from './enums'
import queries from './queries'
import mutations from './mutations'
import Todo from './models/todo'

// list of non-standard scalar types that
// you want to use
const scalars = gql`
  scalar UUID
  scalar Date
  scalar Time
  scalar DateTime
  scalar JSON
  scalar JSONObject
`

export default [
  scalars,
  enums,
  // other models here...
  Todo,

  // IMPORTANT!
  //
  // "queries" and "mutations" MUST come after scalars, enums, and model types
  // as they reference types that must be defined earlier in the schema
  //
  queries,
  mutations
]
