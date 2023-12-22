"use client";
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/page';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { logout } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/login");
  },[])
  return null
}

export default Page