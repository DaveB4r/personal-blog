"use client";
import { useState } from "react";
import { useAuthContext } from "../../../../contexts/page";
import { Button, Card, CardHeader, CardBody, CardFooter, Image, Input } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';

const Page = () => {
  const { user, login } = useAuthContext();
  const [username, setUsername] = useState(user().username);
  const [email, setEmail] = useState(user().email);
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState(user().avatar);
  const [file, setFile] = useState<File>();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const apiRoute = '/api/profile';
      e.preventDefault();
      const form = new FormData();
      form.append("user_id", user().id);
      form.append("username", username);
      form.append("email", email);
      form.append("password", password);
      form.append("avatar", file);
      const response = await fetch(apiRoute, {
        method: "PUT",
        body: form,
      });
      if(response.ok){
        const res = await response.json();
        if(res.message === "Something wrong happened"){
          return toast.error(res.message);
        }else{
          login(res.user);
          return toast.success(res.message);
        }
      }else{
        console.error("Error");
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="justify-self-center items-center mt-6">
      <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
        <Card className="py-4 w-[250px]">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <div className="flex w-full flex-wrap flex-col mb-6 gap-6">
              <Input
                type="text"
                label="username"
                labelPlacement="outside"
                className="text-tiny font-bold mt-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
              <Input
                type="email"
                label="email"
                labelPlacement="outside"
                className="text-tiny font-bold mt-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <Input
                type="password"
                label="password"
                labelPlacement="outside"
                value={password}
                className="text-tiny font-bold mt-4"
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <Input
                type="file"
                label="Avatar"
                labelPlacement="outside"
                className="text-tiny font-bold mt-4"
                onChange={handleChange}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 items-center">
            {preview && (
              <Image
                alt="Profile Picture"
                className="object-cover rounded-xl"
                src={preview}
                width={150}
              />
            )}
          </CardBody>
          <CardFooter>
            <div>
              <Button type="submit" color="primary" variant="ghost">
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white"}}
        position="bottom-right"
      />
    </div>
  );
};

export default Page;
