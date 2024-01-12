import { FetchPosts } from "@/app/actions/FetchPosts";
import CardPost from "@/components/CardPost";
import LoadMore from "@/components/LoadMore";

const Page = async ({params} : {params: { slug: string}}) => {
  const posts = await FetchPosts("0,2",params.slug);
  return (
    <div className="flex md:w-[80%] flex-col justify-self-end">
      <CardPost posts={posts?.posts}/>
      <LoadMore category={params.slug}/>
    </div>
  )
}

export default Page