import { requireReactElement } from './../../node_modules/@radix-ui/themes/src/helpers/require-react-element';
const BASE_URL = 'https://dummyjson.com'

export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`)
    if(!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    return data.posts
  } catch (error) {
    console.error('Error fetching posts: ', error);
    return []
  }
}

export async function fetchPost(id: number | string) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`)

    if(!response.ok) {
      throw new Error(`Failed to fetch post with id: ${id}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching post with id: ${id}: `, error);
    return null
  }
}

export async function fetchCommentsForPost(id: number | string) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments?limit=5`)
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post with id: ${id}`)
    }

    const data = await response.json()
    return data.comments
  } catch (error) {
    console.error(`Error fetching comments for post with id: ${id}: `, error);
    return []
  }
}
