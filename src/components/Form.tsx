"use client";
import { FC, useEffect } from "react";
import { FormProps } from "../../interfaces/FormInterface";
import { Input, Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../../contexts/page";

const Form: FC<FormProps> = ({ formControl, handleSubmit }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { login } = useAuthContext();
  useEffect(() => {
    let ignore = false;
    if (session?.user) {
      const fetchData = async () => {
        const url = "/api/register";
        const randomPass = (
          Math.random().toString(36).slice(2) +
          Math.random().toString(36).slice(2)
        ).toUpperCase();
        const data = {
          username: session?.user.name,
          email: session?.user.email,
          avatar: session?.user.image,
          password: randomPass,
          via: "google",
        };
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const res = await response.json();
          login(res.user);
          return router.push("/admin");
        } else {
          return console.error("Error");
        }
      };
      if (!ignore) fetchData();
      return () => {
        ignore = true;
      };
    }
  }, [session]);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {formControl &&
        formControl.map((inp, i) => (
          <div className="mb2 block" key={i}>
            <Input
              label={inp.label}
              type={inp.type}
              variant="bordered"
              className="max-w-xs"
              value={inp.state}
              onChange={(e) => inp.setState(e.target.value)}
              isRequired
            />
          </div>
        ))}
      <Button
        variant="ghost"
        startContent={<FcGoogle />}
        onClick={async () => {
          await signIn();
        }}
      >
        Sign In With Google
      </Button>
      <Button type="submit" color="primary" variant="ghost">
        SEND
      </Button>
    </form>
  );
};

export default Form;
