import conf from "../envimport/conf"
import {Client,Account,ID,Databases,Storage,Query} from "appwrite"
export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }
    async createPost({title,slug,content,featuredImage,status,userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
            
        } catch (error) {
            throw error
            
        }
    }

    async updatePost({title,slug,content,featuredImage,status,userID}){
       try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                status,
                featuredImage,
            }
        )
        
       } catch (error) {
        throw error
        
       } 
            
        
    }
    async deletePost(slug){
        try {
            this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
            
        } catch (error) {
            throw error
            return false
            
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
            throw error
            
        }

    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                100,
                0,

            )
            
        } catch (error) {
            
        }
    }

    // flie uploading

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteDatabaseId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            throw error
            return false
            
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
            
        } catch (error) {
            throw error
        }

    }
     getFilePreview(){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
     }
}
const service = new Service()
export default service;