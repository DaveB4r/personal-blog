"use client";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PostType } from "@/interfaces/PostsInterface";
import Comments from "@/components/Comments";
import LoadMore from "@/components/LoadMore";

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<PostType>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/posts/get-post?slug=${params.slug}`);
      const data = await res.json();
      setPost(data);
    };
    fetchData();
  }, [params.slug, post]);
  const postDate = new Date(post?.date).toLocaleString("en-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="w-3/6 justify-self-center post-card">
      {post ? (
        <div>
          <Card>
            <Card className="w-full h-[300px] col-span-12 sm:col-span-7">
              <CardHeader className="absolute z-10 top-20 flex-col text-center">
                <h3 className="text-white/90 font-large text-5xl shadow-text capitalize">
                  {post?.title}
                </h3>
              </CardHeader>
              <Image
                removeWrapper
                alt="post image"
                className="z-0 w-full h-full object-cover"
                src={post?.image ? post?.image : "/images/posts/default.jpg"}
              />
            </Card>
            <CardHeader className="flex gap-3 custom-card-header">
              <div className="flex justify-center ">
                <Image
                  alt="user creator"
                  height={40}
                  radius="lg"
                  src={post?.avatar}
                  width={40}
                />
                <p className="text-md self-center ml-4 capitalize">
                  {post?.username}
                </p>
              </div>
              <div>
                <p className="text-small text-default-500 justify-end">
                  {postDate}
                </p>
                <p className="text-small text-primary-500 justify-end text-end capitalize">
                  {post?.category}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div dangerouslySetInnerHTML={{ __html: post?.content }} />
            </CardBody>
            <Divider />
            <CardFooter>
              <Comments post_id={post?.id} number_comments={post?.number_comments} comments={post?.comments} comment_usernames={post?.comment_usernames} comment_date={post?.comment_date} />
            </CardFooter>
          </Card>
          <p className="mb-4 text-2xl font-extrabold dark:text-white md:text-3xl lg:text-4xl text-center">Related Posts</p>
          <LoadMore category={post?.category} sqlLimit={"0,2"} noId={post?.id}/>
        </div>
      ) : (
        <Spinner />
      )}

    </div>
  );
}
