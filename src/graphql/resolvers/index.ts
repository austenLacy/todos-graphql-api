import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date' // imported non-standard scalar types

// custom scalars
import GraphQLUUID from '../scalars/uuid'
import { GraphQLJSONObject } from '../scalars/json'

// todos resolvers
import {
  queries as todosQueries,
  mutations as todosMutations
} from './todos'

export default {
  // custom scalars
  UUID: GraphQLUUID,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
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
