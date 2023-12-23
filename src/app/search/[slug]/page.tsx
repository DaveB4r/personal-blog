import { FetchPosts } from "@/app/actions/FetchPosts";
import CardPost from "@/components/CardPost";

const Page = async({params}: {params: {slug:string}}) => {
  const posts = await FetchPosts("0,2",null,params.slug);
  return (
    <div className="w-[80%] flex flex-col lg:justify-self-end md:justify-self-center">
      <CardPost posts={posts?.posts}/>
    </div>
  )
}

export default Page