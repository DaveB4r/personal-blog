"use client"
import CardCategories from './../components/CardCategories';
import GoogleAccount from './../components/GoogleAccount';
import { Button } from '@nextui-org/react';
import { SiBuymeacoffee } from "react-icons/si";
import Link from 'next/link';
const Home = () => {
  return (
    <div className="p-6 w-[80%] flex flex-col justify-self-end md:justify-self-center">
      <div className="mb-2 p-4 flex flex-col">
        <h1 className='mb-4 text-2xl font-extrabold dark:text-white md:text-3xl lg:text-4xl text-center'><span className="tracking-tight inline font-extrabold from-[#0a4b97] to-[#111827] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">Create</span> & <span className="tracking-tight inline font-extrabold from-[#0a4b97] to-[#111827] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">Share</span> your knowledge with others technology enthusiasts</h1>
        <CardCategories />
      </div>
      <GoogleAccount />
      <div className="grid justify-self-end">
        <Button size='lg' color="warning" className='font-black text-xl' variant="ghost" startContent={<SiBuymeacoffee />}>
          <Link href="https://patreon.com/DaveB4r" target="_blank" className='text-white'>
            Buy Me a Coffee!
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
