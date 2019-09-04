import 'mocha'
import { expect } from 'chai'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  IMocks,
  IMockOptions,
  IMockServer
} from 'graphql-tools'

import graphQLSchema from '../../schema'

const uuid = 'a8e6a288-ca82-4f2c-94e7-36813d1480fb'

describe('Todos Schema', () : void => {
  const mockSchema: any = makeExecutableSchema({ typeDefs: graphQLSchema })
  const mocks: IMocks = {
    Boolean: () => false,
    UUID: () => uuid,
    Int: () => 1,
    Float: () => 1.0,
    String: () => 'Description',
    DateTime: () => new Date(),
    JSONObject: () => {}
  }
  const mocksOptions: IMockOptions = {
    schema: mockSchema,
    mocks,
    preserveResolvers: false
  }

  addMockFunctionsToSchema(mocksOptions)

  it('has valid type definitions', async () : Promise <Chai.Assertion> => {
    return await expect(async () : Promise<any> => {
      const MockServer: IMockServer = mockServer(mockSchema, mocks, false)
      return await MockServer.query(`{ __schema { types { id } } }`)
    }).to.not.throw()
  })
})