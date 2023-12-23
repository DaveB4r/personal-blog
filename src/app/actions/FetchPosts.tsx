import { Posts } from "@/interfaces/PostsInterface";
export async function FetchPosts(limit: string, category?: string, search?: string) {
  let apiUrl = `${process.env.NODE_ENV === 'development' ? "http://localhost:3000":"https://personal-blog-ddn63y4ps-juan-david-pinedas-projects.vercel.app"}/api/posts?limit=${limit}`;
  if(category) apiUrl += `&category=${category}`;
  if(search) apiUrl += `&search=${search}`;
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