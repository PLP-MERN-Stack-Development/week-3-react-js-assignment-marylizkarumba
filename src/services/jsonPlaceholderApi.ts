
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const jsonPlaceholderApi = {
  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async searchPosts(query: string): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    return posts.filter((post: Post) => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
  }
};
