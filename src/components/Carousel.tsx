"use client"
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Posts } from "@/interfaces/PostsInterface";
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Carousel: FC<Posts> = ({ posts }) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [count, setCount] = useState(0);
  const changeSlider = (count: number) => {
    setId(String(posts[count]?.id));
    setSlug(posts[count]?.slug);
    setContent(posts[count]?.content.substring(0, 100));
    setTitle(posts[count]?.title);
    setCategory(posts[count]?.category);
    setImg(posts[count]?.image);
    setDate(posts[count]?.date.substring(0, 10));
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (posts) {
        setCount(count => {
          return count === (posts.length - 1) ? 0 : count + 1;
        });
        changeSlider(count);
      }
    }, 5000)
    return () => {
      clearInterval(timer);
    }
  }, [posts, count])
  return (
    <div className=' h-[300px] grid grid-cols-12 justify-self-center mb-[10px]'>
      <Card className="w-full col-span-12" isFooterBlurred>
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <div className="shadow-text pl-2" dangerouslySetInnerHTML={{ __html: content }} />
        </CardHeader>
        <Image
          removeWrapper
          alt={title}
          className="z-0 w-full h-full object-cover"
          src={img ? img : "/images/posts/default.jpg"}
        />
        <Button radius="full" variant="ghost" size="sm" className="absolute text-4xl z-10 top-[125px] left-0" onClick={() => {
          setCount(count => {
            return count <= 0 ? posts.length - 1 : count - 1
          });
          changeSlider(count);
        }}><IoIosArrowBack /></Button>
        <Button radius="full" variant="ghost" size="sm" className="absolute text-4xl z-10 top-[125px] right-0" onClick={() => {
          setCount(count => {
            return count === (posts.length - 1) ? 0 : count + 1
          });
          changeSlider(count);
        }}><IoIosArrowForward /></Button>
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center justify-between">
            <h4 className="text-tiny text-white/60 uppercase font-bold">{title}</h4>
            <p className="text-tiny capitalize mr-2">{category}</p>
          </div>
          <p className="text-tiny text-white/60">{date}</p>
          <Link href={`/blog/${encodeURIComponent(slug)}`}>
            <Button radius="full" size="sm" className="ml-2">
              Watch More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Carousel