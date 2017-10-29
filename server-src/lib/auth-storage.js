import {MongoClient, ObjectID} from 'mongodb'
import passwordUtils from './password-utils'

const AUTH_COLLECTION_NAME = 'users'

export default class AuthStorage {
  constructor(connectionString) {
    this._connectionString = connectionString
    this._db = null
    this._auth = null
  }

  async register(username, password) {
    await this._initialize()
    const passwordHash = await passwordUtils.hash(password)
    const {insertedId} = await this._auth.insertOne({username, passwordHash})
    return insertedId.toHexString()
  }

  async authenticate(username, password) {
    await this._initialize()
    const {passwordHash} = await this._auth.find({username}, {passwordHash: 1})
    return await passwordUtils.compare(password, passwordHash)
  }

  async update(id, username, password) {
    await this._initialize()
    const passwordHash = await passwordUtils.hash(password)
    await this._auth.updateOne({username}, {passwordHash})
  }

  async delete(id) {
    await this._initialize()
    await this._auth.deleteOne({username})
  }

  async getId(username) {
    await this._initialize()
    const {_id} = await this._auth.findOne({username}, {_id: 1})
    return _id.toHexString()
  }

  async getUsername(id) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    const {username} = await this._auth.findOne({_id}, {username: 1})
    return username
  }

  async close() {
    await this._db.close()
  }
  
  async _initialize() {
    if (!this._db) {
      this._db = await MongoClient.connect(this._connectionString)
      this._auth = this._db.collection(AUTH_COLLECTION_NAME)
    }
  }
}