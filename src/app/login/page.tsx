"use client";
import { useRouter } from 'next/navigation';
import { FC, useState, useCallback, FormEvent } from 'react';
import { FormControl } from '@/interfaces/FormInterface';
import { Card, CardHeader, Divider, CardBody,CardFooter } from '@nextui-org/react';
import Form from '@/components/Form';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthContext } from '@/contexts/page';

const Page:FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const formInputs: FormControl[] = [
    {
      label: "email",
      type: "email",
      state: email,
      setState: setEmail
    },
    {
      label: "password",
      type: "password",
      state: password,
      setState: setPassword
    }
  ];
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/login";
    const data = {
      email,
      password
    };
    
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type" : "application/json"
        }
      });
      const res = await response.json();
      if(!response.ok){
        return console.error('error'); 
      }
      if(!res.isLogged){
        return toast.error("Email or Password doesn't match");
      }
      
      login(res);
      setEmail("");
      setPassword("");
      return router.push('/admin');
    } catch (e) {
      console.error(e);
    }
  },[email, password, router]);
  return (
    <div className="justify-self-center self-center">
      <Card className='max-w-[1000px]'>
        <CardHeader className='flex gap-3'>
          <div className="flex flex-col">
            <p className="text-md">Login</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <Form formControl={formInputs} handleSubmit={handleSubmit}/>
        </CardBody>
        <CardFooter>
          <p className="text-small">By DaveB4r</p>
        </CardFooter>
      </Card>
      <ToastContainer toastStyle={{backgroundColor: "black", color:"white"}} position="bottom-right"/>
    </div>
  )
}

export default Page