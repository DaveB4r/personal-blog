"use client";
import { useEffect, useState} from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { BiAddToQueue } from 'react-icons/bi/index';
import { useAuthContext } from '@/contexts/page';
import DataTable from '@/components/DataTable';
const Page = () => {
  const { user } = useAuthContext();
  const headerData = ["id","image","title","category","date","actions"];
  const [bodyData, setBodyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/posts/user-post?user=${user().id}`);
      const posts = await res.json();
      setBodyData(posts.posts);
   };
    fetchData();
  },[bodyData, setBodyData]);
  
  return (
    <div className="w-2/4 justify-self-center">
      <div className="grid">
      <Button color="primary" variant='ghost' startContent={<BiAddToQueue />} className="justify-self-end">
      <Link href="/admin/posts/create" className=" text-white">
         Create Post
      </Link>
      </Button>
      <div>
        <DataTable headerData={headerData} bodyData={bodyData}/>
      </div>
      </div>
    </div>
  )
}

export default Page