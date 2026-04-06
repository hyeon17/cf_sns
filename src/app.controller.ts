import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  getPost(): Post {
    return {
      id: '1',
      author: 'John Doe',
      title: 'Hello World',
      content: 'This is a test post',
      likeCount: 0,
      commentCount: 0,
    };
  }
}
