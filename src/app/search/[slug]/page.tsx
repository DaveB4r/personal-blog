import { FetchPosts } from "@/actions/Fetchposts";
import CardPost from "@/components/CardPost";
import LoadMore from "@/components/LoadMore";

const Page = async({params}: {params: {slug:string}}) => {
  const posts = await FetchPosts("0,2",null,params.slug);
  return (
    <div className="w-[80%] flex flex-col lg:justify-self-end md:justify-self-center">
      <CardPost posts={posts?.posts}/>
    </div>
  )
}

export default Page