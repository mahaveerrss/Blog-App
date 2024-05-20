import conf from "../conf/conf";
import { Client, ID , Databases ,Storage ,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
       
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content, featuredimage,status, userid}){
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                })
        } catch (error) {
            console.log('Appwrite service :: createPost :: error',error)
            
        }
    }
    async updatePost(slug,{title,content, featuredimage,status}){
        try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status
            }
        )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error',error)
        }
    }
    async deletePost(slug){
        try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error',error)
            return false;
        }
    }
    async getPost(slug){
        try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        } catch (error) {
            console.log('Appwrite service :: getPost :: error',error)
            return false;
        }
    }
    async getAllPosts(queries=[Query.equal('status','active')]){
        try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
        } catch (error) {
            console.log('Appwrite service :: getAllPosts :: error',error)
            return false;
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error',error)
            return false;
        }
    } 
    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                String(fileId)
            )
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error',error)
            return false;
        }
    }
    async getFilePreview(fileId){
        try {
          
            const href =    this.bucket.getFilePreview(
                conf.appwriteBucketId,
                String(fileId)
            ).href;

          
            
            return href
        } catch (error) {
            console.log('Appwrite service :: getFilePreview :: error',error)
            return false;
        }
    }

}

const service = new Service()
export default service
