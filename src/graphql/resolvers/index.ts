import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date' // imported non-standard scalar types

// custom scalars
import GraphQLUUID from 'graphql/scalars/uuid'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql/scalars/json'

// todos resolvers
import {
  queries as todosQueries,
  mutations as todosMutations
} from 'graphql/resolvers/todos'

export default {
  // custom scalars
  UUID: GraphQLUUID,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  // queries
  Query: {
    ...todosQueries
  },

  // mutations
  Mutation: {
    ...todosMutations
  }
}
