import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostModel } from './entities/post.entity'

let posts: PostModel[] = [
  {
    id: 1,
    author: 'Author 1',
    title: 'Post 1',
    content: 'Content 1',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'Author 2',
    title: 'Post 2',
    content: 'Content 2',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 3,
    author: 'Author 3',
    title: 'Post 3',
    content: 'Content 3',
    likeCount: 0,
    commentCount: 0,
  },
]

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}

  async getAllPosts() {
    return this.postRepository.find()
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
    })

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    return post
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    })

    const newPost = await this.postRepository.save(post)
    return newPost
  }

  updatePost(id: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === id)
    if (!post) {
      throw new NotFoundException('Post not found')
    }

    if (author) {
      post.author = author
    }
    if (title) {
      post.title = title
    }
    if (content) {
      post.content = content
    }

    posts = posts.map((prevPost) => (prevPost.id === id ? post : prevPost))
    return post
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id !== id)

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    posts = posts.filter((post) => post.id !== id)
    return id
  }
}
