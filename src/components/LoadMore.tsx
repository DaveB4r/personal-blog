"use client";
import { useState, useEffect, FC } from 'react';
import { PostType } from '@/interfaces/PostsInterface';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';
import { FetchPosts } from '@/app/actions/FetchPosts';
import CardPost from './CardPost';

type Props = {
  category?: string;
}

const LoadMore:FC<Props>  = ({category}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [limit, setLimit] = useState("3,2");
  const [end, setEnd] = useState(false);

  const {ref, inView} = useInView();
  
  const loadMorePosts = async () => {
    const nextLimit = `${Number(limit.split(',')[0]) + 2}, 2`;
    console.log(nextLimit)
    let response;
    if(category) response = await FetchPosts(nextLimit, category);
    else  response = await FetchPosts(nextLimit);
    const newPosts = response?.posts ?? [];
    if(newPosts.length === 0) setEnd(true);
    setPosts((prevPosts: PostType[]) => [...prevPosts, ...newPosts]);
    setLimit(nextLimit);
  };

  useEffect(() => {
    if(inView){
      loadMorePosts();
    }
  },[inView]);

  return (
    <>
      <CardPost posts={posts}/>
      {!end && <div className='flex flex-col justify-self-end' ref={ref}><Spinner /></div>}
    </>
  )

};

export default LoadMore;