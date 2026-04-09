import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPostById(id)
  }

  @Post()
  createPost(@Body('author') author: string, @Body('title') title: string, @Body('content') content: string) {
    return this.postsService.createPost(author, title, content)
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.updatePost(id, author, title, content)
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id)
  }
}
