"use client";
import { useState, useEffect, FC } from 'react';
import { PostType } from '@/interfaces/PostsInterface';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';
import { FetchPosts } from '@/app/actions/FetchPosts';
import CardPost from './CardPost';

type Props = {
  category?: string;
  sqlLimit?: string;
}

const LoadMore:FC<Props>  = ({category, sqlLimit}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [limit, setLimit] = useState(sqlLimit ? sqlLimit : "3,2");
  const [end, setEnd] = useState(false);

  const {ref, inView} = useInView();
  
  const loadMorePosts = async () => {
    let response;
    if(category) response = await FetchPosts(limit, category);
    else  response = await FetchPosts(limit);
    const newPosts = response?.posts ?? [];
    if(newPosts.length === 0) setEnd(true);
    setPosts((prevPosts: PostType[]) => [...prevPosts, ...newPosts]);
    setLimit(limit => `${Number(limit.split(',')[0]) + 2},2`);
  };

  useEffect(() => {
    if(inView){
      loadMorePosts();
    }
  },[inView, end]);

  return (
    <>
      <CardPost posts={posts}/>
      <div >
        {!end && <div className='flex flex-col justify-self-end more-posts' ref={ref}><Spinner /></div>}
      </div>
    </>
  )

};

export default LoadMore;