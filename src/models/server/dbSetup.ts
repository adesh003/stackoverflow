import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createStorageCollection from "./storageSetup";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";
export default async function getOrCreateDB(){
    try {
        await databases.get(db);
        console.log("Database Connected");
    } catch (error) {
        try{
            await databases.create(db,db);
            console.log("Database Created");
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createStorageCollection(),
                createVoteCollection()
            ])
            console.log("collection created");
            console.log("Database Connected");
        }
        catch(error){
            console.log("error creating databases or collection", error);
        }
    }
    return databases;
}