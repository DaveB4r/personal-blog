import { Posts } from "@/interfaces/PostsInterface";
export async function FetchPosts(limit: string, category?: string, search?: string, noId?: string | number) {
  let apiUrl = `${process.env.NODE_ENV === 'development' ? "http://localhost:3000":"https://personal-blog-five-inky.vercel.app"}/api/posts?limit=${limit}`;
  if(category) apiUrl += `&category=${category}`;
  if(search) apiUrl += `&search=${search}`;
  if(noId) apiUrl += `&noId=${noId}`;
  try {
    const response = await fetch(apiUrl);
    if(response.ok){
      const data = await response.json();
      return data as Posts;
    }else{
      console.error("Error");
    }
    
  } catch (error) {
    console.error(error);
  }
}