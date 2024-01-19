import { FetchPosts } from "@/app/actions/FetchPosts";
import CardPost from "@/components/CardPost";
import Carousel from "@/components/Carousel";
import LoadMore from "@/components/LoadMore";
import { Spinner } from '@nextui-org/react';

const Page = async () => {
  const postsFetch = await FetchPosts("0,5");
  const posts = postsFetch?.posts.slice(0,3);
  const cardPosts = postsFetch?.posts.slice(3,5);
  return (
    <>
      {posts ? (
        <div className="w-[80%] main-div flex flex-col lg:justify-self-end mr-6 md:justify-self-center">
          <Carousel posts={posts} />
        </div>
      ):(
        <Spinner />
      )}
      {cardPosts ? (
        <div className="w-[80%] main-div flex flex-col lg:justify-self-end mr-6 md:justify-self-center">
          <CardPost posts={cardPosts} />
          <LoadMore />
        </div>
      ) : (
        <div className="flex main-div justify-center">
          <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="bg-clip-text bg-gradient-to-r to-red-600 capitalize">
              nothing here
            </span>
          </h3>
        </div>
      )}
    </>
  );
};

export default Page;
