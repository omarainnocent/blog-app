import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { blogService } from "../services/blogs.service";
import { CreateBlogDto } from "../dto/create-blog";
import { BlogEntity } from "../entities/blog.entity";
import { UpdateBlogDto } from "../dto/update-blog";


@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
    constructor(
        private readonly blogService: blogService
    ) {
       
    }

   @Get()
   async getAllBlogs() {
        const blogs = await this.blogService.getAllBlogs();
        return blogs
    }

    //create user
    @Post()
    async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<BlogEntity> {
        const blogs = await this.blogService.createBlog(createBlogDto);
        return blogs;
    }
    
    // Read 
    @Get(':id')
    async getOneBlog(@Param('id') id: string) {
        const blogs = await this.blogService.getOneBlog(id);
        return blogs
    }

    // Update
    @Patch(':id')
    async updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        const blogs = await this.blogService.updateBlog(id, updateBlogDto);
        return blogs
    }
    // Delete   
    @Delete(':id/delete')
    async deleteBlog(@Param('id') id: string) {
        const blogs = await this.blogService.deleteBlog(id);
        return blogs
    }    

    //delete all blogs
}