import { IndexType, Permission } from 'node-appwrite'

import { db, answerCollection } from "../name"
import { databases } from './config'

export default async function createAnswerCollection() {
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read('any'),
        Permission.read('users'),
        Permission.create('users'),
        Permission.update('users'),
        Permission.delete('users'),
    ])

    console.log("answer collection created ")
    

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "question", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),

    ])
    console.log("answer Attribute created ")
}