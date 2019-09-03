import lowdb from 'lowdb'
// lodash-id add autogeneration of UUIDs on writes
// and provides some nice high level helpers (e.g. getById)
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'

const DB_LOC: string = 'db.json'
const storageAdapter = new FileSync(DB_LOC, { defaultValue: {} })
const db = lowdb(storageAdapter)
db._.mixin(lodashId)

db.defaults({ todos: [] }).write()

export default db
