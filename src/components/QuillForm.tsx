"use client";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  CircularProgress,
  Input,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { CategoriesNames } from "./Categories";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <CircularProgress size="sm" aria-label="Loading..." />,
});
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: ["1", "2", "3", "4", false] }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
import { useAuthContext } from "@/contexts/page";
import { PostType } from "@/interfaces/PostsInterface";
type QuillParams = {
  post?: PostType;
};

const QuillForm: FC<QuillParams> = ({ post }) => {
  const { user } = useAuthContext();
  const [content, setContent] = useState(post ? post?.content : "");
  const [title, setTitle] = useState(post ? post?.title : "");
  const [category, setCategory] = useState(post ? post?.category : "");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(post ? post?.image : "");

  const submitImage = async () => {
    try {
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
      console.log(imgbbKey);
      const form = new FormData();
      if(file){
        form.append("image",  file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`,{
          method: "POST",
          body: form,
        });
        const data = await res.json();
        return data.data.display_url as string;
      }else{
        throw new Error("please choose an image");
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      let apiRoute = "/api/posts/create-post";
      let method = "POST";
      let imgbb = "";
      if (!file && !post) {
        return toast.error("Please select an image!!");
      }
      const form = new FormData();
      if (post) {
        apiRoute = "/api/posts/update-post";
        method = "PUT";
        form.append("post_id", String(post?.id));
      }
      form.append("user_id", user().id);
      form.append("title", title);
      form.append("category", category);
      form.append("content", content);
      if (file){
        if(process.env.NODE_ENV === 'development'){
          form.append("file",file);
        }else{
          imgbb = await submitImage();
          form.append("file", imgbb);
        }
      }
      const res = await fetch(apiRoute, {
        method,
        body: form,
      });
      const data = await res.json();
      if (!data.message) {
        return toast.error("Something went wrong!!");
      }
      if (data.message === "Post Already Exists")
        return toast.error(data.message);
      if (data.message === "Post updated successfully") {
        return toast.success(data.message);
      }
      setTitle("");
      setFile(null);
      setContent("");
      setCategory("");
      setPreview("");
      return toast.success(data.message);
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    const file = e.target!.files![0]
    setFile(file);
    previewFile(file);
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result as string);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb2 block">
          <Input
            label="Title"
            type="text"
            variant="bordered"
            className="w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
        </div>
        <div className="mb2 block">
          <Input
            label="Image"
            type="file"
            variant="bordered"
            className="w-full"
            onChange={handleChange}
          />
          {preview && (
            <Image
              alt="image"
              className="object-cover rounded-xl"
              src={preview}
              width={150}
            />
          )}
        </div>
        <div className="mb2 block">
          <Select
            isRequired
            label="Category"
            placeholder="Select a Category"
            className="w-full"
            onChange={(e) => setCategory(e.target.value)}
            defaultSelectedKeys={post ? [post?.category] : ""}
          >
            {CategoriesNames.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mb-2 block self-center">
          <ReactQuill value={content} onChange={setContent} modules={modules} />
        </div>
        <Button type="submit" color="primary" variant="ghost">
          {post ? "Update" : "Create"}
        </Button>
      </form>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
        position="bottom-right"
      />
    </div>
  );
};

export default QuillForm;
