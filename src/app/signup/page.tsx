"use client";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { FormControl } from "@/interfaces/FormInterface";
import Form from "@/components/Form";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "@/contexts/page";

const Page: FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  const formInputs: FormControl[] = [
    {
      label: "username",
      type: "text",
      state: username,
      setState: setUsername,
    },
    {
      label: "email",
      type: "email",
      state: email,
      setState: setEmail,
    },
    {
      label: "password",
      type: "password",
      state: password,
      setState: setPassword,
    },
  ];

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/register";
    const data = {
      username,
      email,
      password,
    };
    
    try {
      const respose = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (respose.ok) {
        const res = await respose.json();
        if (res.message === "User already exists"){
          setUsername("");
          setEmail("");
          setPassword("");
          return toast.error(res.message);
        } 
        else {
          toast.success(res.message);
          login(res.user);
          return router.push("/admin");
        }
      } else {
        console.error("Error");
      }
    } catch (e) {
      console.error(e);
    }
  }, [username, email, password, router]);
  return (
    <div className="justify-self-center self-center">
      <Card className="max-w-[1000px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Sign Up</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Form formControl={formInputs} handleSubmit={handleSubmit} />
        </CardBody>
        <CardFooter>
          <p className="text-small">By DaveB4r</p>
        </CardFooter>
      </Card>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
        position="bottom-right"
      />
    </div>
  );
};

export default Page;
