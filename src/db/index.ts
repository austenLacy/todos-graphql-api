import lowdb from 'lowdb'
// lodash-id adds autogeneration of UUIDs on writes
// and provides some nice high level helpers (e.g. getById)
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import { IDBOptions } from '../types/db';

export default class Database {
  public instance;

  constructor(options: IDBOptions) {
    const { storageLocation, defaults } = options

    const dbLoc = storageLocation || 'db.json'
    const storageAdapter = new FileSync(dbLoc, { defaultValue: {} })
    this.instance = lowdb(storageAdapter)
    this.instance._.mixin(lodashId)
    const defaultData = defaults || {}
    this.instance.defaults(defaultData).write()
  }
}
