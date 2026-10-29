import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            });
        } catch (error) {
            console.log("Appwrite storage service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            });
            return true;
        } catch (error) {
            console.log("Appwrite storage service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if(!fileId) return "";
        
        try {
            return this.bucket.getFileView({
                bucketId: conf.appwriteBucketId, 
                fileId
            })
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return "";
        }
        
    }
}

const storageService = new StorageService();
export default storageService;