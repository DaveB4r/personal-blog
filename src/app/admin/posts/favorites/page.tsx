"use client";
import { useState, useEffect } from "react";
import { Posts } from "@/interfaces/PostsInterface";
import { useAuthContext } from "@/contexts/page";
import CardPost from "@/components/CardPost";

const Page = () => {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<Posts>();
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(`/api/posts/favorites/get?ids=${user().favorites.join(',')}`);
      const data = await res.json();
      setPosts(data);
    }
    fetchData();
  },[])
  return (
    <div className="mr-6 flex flex-col justify-self-end">
      <CardPost posts={posts?.posts}/>
    </div>
  )
}

export default Page