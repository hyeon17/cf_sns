import { Injectable, NotFoundException } from '@nestjs/common'

export interface PostModel {
  id: number
  author: string
  title: string
  content: string
  likeCount: number
  commentCount: number
}

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
  getPosts() {
    return posts
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === id)

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    return post
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    }
    posts.push(post)
    return post
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
