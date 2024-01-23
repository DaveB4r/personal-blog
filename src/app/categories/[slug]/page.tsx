import LoadMore from "@/components/LoadMore";

const Page = async ({params} : {params: { slug: string}}) => {
  return (
    <div className="flex md:w-[80%] flex-col justify-self-end mt-10">
      <p className="tracking-tight inline font-extrabold from-[#0a4b97] to-[#111827] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b text-center capitalize mb-4">{params.slug}</p>
      <LoadMore category={params.slug} sqlLimit={"0,2"}/>
    </div>
  )
}

export default Page