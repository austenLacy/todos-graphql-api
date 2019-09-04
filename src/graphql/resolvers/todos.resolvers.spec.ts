import { expect } from 'chai'
import 'mocha'
import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'

import graphQLSchema from '../../graphql/schema'
import graphQLResolvers from './index'
import Database from '../../db'

const uuid = 'a8e6a288-ca82-4f2c-94e7-36813d1480fb'

const mockDbDefaultData = { todos: [] }
const mockDb = new Database({
  storageLocation: 'mock-db.json',
  defaults: mockDbDefaultData
})

const graphQLServer: ApolloServer = new ApolloServer({
  typeDefs: graphQLSchema,
  resolvers: graphQLResolvers,
  context: ({ req }) => {
    return {
      req,
      requestId: 'test-todo-resolvers',
      db: mockDb
      // logger,
      // etc...
    }
  },
  formatError: (err): Error => {
    console.log(err)
    return err
  },
  debug: true,
  playground: false
})

const { query, mutate } = createTestClient(graphQLServer)

const CREATE_TODO = `
  mutation CreateTodo($todo: TodoInput!) {
    createTodo(todo: $todo) {
      id
      description
    }
  }
`
const GET_TODO_BY_ID = `
  query Todo($id: UUID!) {
    todo(id: $id) {
      id
    }
  }
`
const GET_TODOS = `
  query Todos {
    todos {
      id
    }
  }
`

const UPDATE_TODO_BY_ID = `
  mutation UpdateTodoById($todoId: UUID!, $todo: TodoInput!) {
    updateTodoById(todoId: $todoId, todo: $todo) {
      id
      description
    }
  }
`

const DELETE_TODO_BY_ID = `
  mutation DeleteTodoById($id: UUID!) {
    deleteTodoById(id: $id)
  }
`

describe('Todos Resolvers', () => {
  // reset the mock DB used when all Todo resolver tests are done
  after(() : void => {
    mockDb.instance.setState(mockDbDefaultData)
  })

  it('should create a todo and return it', async () : Promise<void> => {
    const description = 'Do something'

    const res: any = await mutate({
      mutation: CREATE_TODO,
      variables: {
        todo: { id: uuid, description }
      }
    })

    expect(res).to.not.be.null
    expect(res).to.not.be.undefined
    expect(res.data).to.not.be.null
    expect(res.data).to.not.be.undefined
    expect(res.data.createTodo).to.not.be.null
    expect(res.data.createTodo).to.not.be.undefined
    expect(res.data.createTodo.id).to.equal(uuid)
    expect(res.data.createTodo.description).to.equal('Do something')
  })

  it('should return a todo by its ID', async () => {
    const res: any = await query({
      query: GET_TODO_BY_ID,
      variables: { id: uuid }
    })

    expect(res).to.not.be.null
    expect(res).to.not.be.undefined
    expect(res.data).to.not.be.null
    expect(res.data).to.not.be.undefined
    expect(res.data.todo).to.not.be.null
    expect(res.data.todo).to.not.be.undefined
    expect(res.data.todo.id).to.equal(uuid)
  })

  it('should return a list of todos', async () => {
    const res: any = await query({
      query: GET_TODOS
    })

    expect(res).to.not.be.null
    expect(res).to.not.be.undefined
    expect(res.data).to.not.be.null
    expect(res.data).to.not.be.undefined
    expect(res.data.todos).to.not.be.null
    expect(res.data.todos).to.not.be.undefined
    expect(res.data.todos).to.be.an.instanceof(Array)
    expect(res.data.todos.length).to.equal(1)
  })

  it('should update a todo by its ID and return it', async () => {
    const description = 'Do something else...'

    const res: any = await mutate({
      mutation: UPDATE_TODO_BY_ID,
      variables: {
        todoId: uuid,
        todo: { id: uuid, description }
      }
    })

    expect(res).to.not.be.null
    expect(res).to.not.be.undefined
    expect(res.data).to.not.be.null
    expect(res.data).to.not.be.undefined
    expect(res.data.updateTodoById).to.not.be.null
    expect(res.data.updateTodoById).to.not.be.undefined
    expect(res.data.updateTodoById.id).to.equal(uuid)
    expect(res.data.updateTodoById.description).to.equal('Do something else...')
  })

  it('should delete a todo by its ID and return that ID', async () => {
    const res: any = await mutate({
      mutation: DELETE_TODO_BY_ID,
      variables: { id: uuid }
    })

    expect(res).to.not.be.null
    expect(res).to.not.be.undefined
    expect(res.data).to.not.be.null
    expect(res.data).to.not.be.undefined
    expect(res.data.deleteTodoById).to.not.be.null
    expect(res.data.deleteTodoById).to.not.be.undefined
    expect(res.data.deleteTodoById).to.equal(uuid)
  })

})