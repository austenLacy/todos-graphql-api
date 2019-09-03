import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const storageAdapter = new FileSync('~/Development/todos-graphql-api/db.json')
const db = lowdb(storageAdapter)

db.defaults({ todos: [] }).write()

export default db
