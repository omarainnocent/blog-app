import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "../entities/blog.entity"
import { Repository } from "typeorm";
import { CreateBlogDto } from "../dto/create-blog";
import { UpdateBlogDto } from "../dto/update-blog";



@Injectable()
export class blogService {
    constructor(
        @InjectRepository(BlogEntity)
        private readonly blogRepository: Repository<BlogEntity>
    ){

    }

    //CRUD - Create, Read, Update and Delete

    async getAllBlogs() {
        const blog = await this.blogRepository.find();
        return blog
    }

    //create 
    async createBlog(createBlogDto: CreateBlogDto) {
        const blog = this.blogRepository.create(createBlogDto);
        return await this.blogRepository.save(blog);
    }

    // Read
    async getOneBlog(id: string) {
        const blog = await this.blogRepository.findOne({ where: { id } });
        return blog
    }


    // Update
    async updateBlog(id: string, updateBlogDto: UpdateBlogDto) {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) {
            return null
        }
        await this.blogRepository.update(id, updateBlogDto);
        return await this.blogRepository.findOne({ where: { id } });
    }


    // Delete
    async deleteBlog(id: string) {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) {
            return null
        }
        await this.blogRepository.delete(id);
        return blog
    }
    //delete all users
    async deleteAllBlog() {
        const blog = await this.blogRepository.find();
        if (blog.length === 0) {
            return null
        }
        await this.blogRepository.clear();
        return blog
    }

    

    
    
}