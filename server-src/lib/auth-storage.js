import {MongoClient, ObjectID} from 'mongodb'
import passwordUtils from './password-utils'

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

  async getUsername(id) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    const {username} = await this._auth.find({_id}, {username: 1})
    return username
  }

  async update(id, username, password) {
    await this._initialize()
    const passwordHash = await passwordUtils.hash(password)
    const _id = ObjectID.createFromHexString(id)
    await this._auth.updateOne({_id}, {username, passwordHash})
  }

  async delete(id) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    await this._auth.deleteOne({_id})
  }

  async close() {
    await this._db.close()
  }
  
  async _initialize() {
    if (!this._db) {
      this._db = await MongoClient.connect(this._connectionString)
      this._auth = this._db.collection('auth')
    }
  }
}