// import { IndexType, Permission } from 'node-appwrite'

// import { db, questionCollection } from "../name"
// import { databases } from './config'

// export default async function createQuestionCollection() {
//     await databases.createCollection(db, questionCollection, questionCollection, [
//         Permission.read('any'),
//         Permission.read('users'),
//         Permission.create('users'),
//         Permission.update('users'),
//         Permission.delete('users'),
//     ])

//     console.log("question collection created ")
    

//     await Promise.all([
//         databases.createStringAttribute(db, questionCollection, "title", 100, true),
//         databases.createStringAttribute(db, questionCollection, "content", 10000, true),
//         databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
//         databases.createStringAttribute(db, questionCollection, "tages", 50, true),
//         databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),

//     ])
//     console.log("attributed created ")

//     //create index

//     await Promise.all([
//         databases.createIndex(
//             db, questionCollection, "title", IndexType.Fulltext,
//             ["title"],
//             ['asc']
//         ),
//         databases.createIndex(
//             db, 
//             questionCollection,
//             "content", 
//             IndexType.Fulltext,
//             ["content"],
//             ['asc']
//         )
//     ])

// }

import { IndexType, Permission } from 'node-appwrite'
import { db, questionCollection } from "../name"
import { databases } from './config'

export default async function createQuestionCollection() {
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read('any'),
        Permission.read('users'),
        Permission.create('users'),
        Permission.update('users'),
        Permission.delete('users'),
    ])

    console.log("question collection created ")

    // Create attributes sequentially
    await databases.createStringAttribute(db, questionCollection, "title", 100, true)
    await databases.createStringAttribute(db, questionCollection, "content", 10000, true)
    await databases.createStringAttribute(db, questionCollection, "authorId", 50, true)
    await databases.createStringAttribute(db, questionCollection, "tages", 50, true)
    await databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false)

    console.log("attributes created ✅")

    // Small delay to let Appwrite process attribute creation
    await new Promise(resolve => setTimeout(resolve, 5000)) // wait 5 seconds

    // Create indexes
    await databases.createIndex(
        db, questionCollection, "title", IndexType.Fulltext,
        ["title"], ['asc']
    )

    await databases.createIndex(
        db, questionCollection, "content", IndexType.Fulltext,
        ["content"], ['asc']
    )

    console.log("indexes created ✅")
}
