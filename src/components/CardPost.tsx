"use client";
import Link from "next/link";
import { FC } from "react";
import { Posts } from "../../interfaces/PostsInterface";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import AddFavorite from "./AddFavorite";
import { useAuthContext } from "../../contexts/page";

const CardPost: FC<Posts> = ({ posts }) => {
  const { user } = useAuthContext();
  return (
    <div className="gap-2 grid grid-cols-10 mt-4">
      {posts ? (
        posts.map((post) => (
          <div className="w-full col-span-10 sm:col-span-5" key={post.id}>
            <Card
              className="h-[500px]"
              isFooterBlurred
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <div
                  className="shadow-text pl-2"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 100) + "...",
                  }}
                />
              </CardHeader>
              <Image
                removeWrapper
                alt={post.title}
                className="z-0 w-full h-full object-cover blur-sm hover:blur-none"
                src={post.image ? post.image : "/images/posts/default.jpg"}
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center justify-between">
                  <div>
                    <h4 className="text-tiny text-white/60 uppercase font-bold">
                      {post.title}
                    </h4>
                    <p className="text-tiny capitalize">{post.category}</p>
                  </div>
                  <p className="text-tiny text-white/60">
                    {post.date.substring(0, 10)}
                  </p>
                </div>
                <Button radius="full" size="sm" className="ml-2">
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    key={post.id}
                    className="text-white"
                  >
                    Watch More
                  </Link>
                </Button>
                {user().isLogged && (
                  <AddFavorite id={post.id} user_id={Number(user().id)} selected={user().favorites.includes(String(post.id))} />
                )}
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CardPost;
