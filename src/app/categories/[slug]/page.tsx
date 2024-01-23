import LoadMore from "@/components/LoadMore";

const Page = async ({params} : {params: { slug: string}}) => {
  return (
    <div className="flex md:w-[80%] flex-col justify-self-end">
      <LoadMore category={params.slug} sqlLimit={"-2,2"}/>
    </div>
  )
}

export default Page