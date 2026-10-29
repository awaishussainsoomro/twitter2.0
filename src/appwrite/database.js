import { Client, Databases, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createTweet({ content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createTweet :: error", error);
            return false;
        }
    }

    async updateTweet(id, { content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updateTweet :: error", error);
            return false;
        }
    }

    async deleteTweet(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteTweet :: error", error);
            return false;
        }
    }

    async getTweet(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("Appwrite service :: getTweet :: error", error);
            return false;
        }
    }

    async getTweets(queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getTweets :: error", error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;