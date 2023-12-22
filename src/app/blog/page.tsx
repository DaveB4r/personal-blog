import { FetchPosts } from "../../actions/Fetchposts";
import CardPost from "../../components/CardPost";
import Carousel from "../../components/Carousel";
import LoadMore from "../../components/LoadMore";

const Page = async () => {
  const posts = await FetchPosts("0,3");
  const cardPosts = await FetchPosts("3,2");
  return (
    <>
      {posts?.posts.length > 0 && (
        <div className="w-[80%] flex flex-col lg:justify-self-end mr-6 md:justify-self-center">
          <Carousel posts={posts?.posts} />
        </div>
      )}
      {cardPosts?.posts.length > 0 ? (
        <div className="w-[80%] flex flex-col lg:justify-self-end mr-6 md:justify-self-center">
          <CardPost posts={cardPosts?.posts} />
          <LoadMore />
        </div>
      ) : (
        <div className="flex justify-center">
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
