"use client";
import { useEffect, useState } from 'react';
import { PostType } from '@/interfaces/PostsInterface';
import { Spinner } from '@nextui-org/react';
import QuillForm from '@/components/QuillForm';

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<PostType>();
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const res = await fetch(`/api/posts/get-post?id=${params.slug}`);
      const data = await res.json();
      setPost(data);
    };
    if (!ignore) fetchData();
    return () => {
      ignore = true;
    };
  }, [params.slug])
  return (
    <div className='w-2/6 post-card justify-self-center'>
      <h3 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">Editing Post</h3>      
      {post ? <QuillForm post={post} /> : <Spinner />}
    </div>
  )
}