import {MongoClient, ObjectID} from 'mongodb'
import convert from './convert'

function convertFromJsonToMongo(post, removeId) {
  const [convertedPost, errors] = convert(post, {
    _id: {convert: id => ObjectID.createFromHexString(id)},
    title: {required: true},
    content: {required: true},
    date: {required: true, convert: date => new Date(date)},
    author: {required: true}
  })
  if (errors) {
    // TODO(zrbecker): This could be wrapped in a more descriptive exception.
    throw errors
  }
  return convertedPost
}

function convertFromMongoToJson(post) {
  const [convertedPost, errors] = convert(post, {
    _id: {required: true, convert: id => id.toHexString()},
    title: {required: true},
    content: {required: true},
    date: {required: true, convert: date => date.toUTCString()},
    author: {required: true},
  })
  if (errors) {
    // TODO(zrbecker): This could be wrapped in a more descriptive exception.
    throw errors
  }
  return convertedPost
}

export default class BlogStorage {
  constructor(connectionString) {
    this._connectionString = connectionString
    this._db = null
  }

  async create(post) {
    await this._initialize()
    post = convertFromJsonToMongo(post)
    const {insertedId} = await this._posts.insertOne(post)
    return convertFromMongoToJson(post)
  }

  async read(id) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    const post = await this._posts.findOne({_id})
    return post ? convertFromMongoToJson(post) : null
  }

  async list(offset, count) {
    await this._initialize()
    let cursor = await this._posts.find({}).sort({date: -1})
    if (offset) {
      cursor = cursor.skip(offset)
    }
    if (count) {
      cursor = cursor.limit(count)
    }
    const posts = await cursor.toArray()
    return posts.map(post => convertFromMongoToJson(post))
  }

  async update(id, post) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    post = convertFromJsonToMongo(post)
    await this._posts.updateOne({_id}, post)
  }

  async delete(id) {
    await this._initialize()
    const _id = ObjectID.createFromHexString(id)
    await this._posts.deleteOne({_id})
  }
  
  async close() {
    await this._db.close()
  }
  
  async _initialize() {
    if (!this._db) {
      this._db = await MongoClient.connect(this._connectionString)
      this._posts = this._db.collection('posts')
    }
  }
}