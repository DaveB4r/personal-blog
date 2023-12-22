"use client";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import {
  Input,
  Button,
  Select,
  SelectItem,
  CircularProgress,
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
import { useAuthContext } from "../../contexts/page";
import { PostType } from "../../interfaces/PostsInterface";
type QuillParams = {
  post?: PostType;
};

const QuillForm: FC<QuillParams> = ({ post }) => {
  const { user } = useAuthContext();
  const [content, setContent] = useState(post?.content);
  const [title, setTitle] = useState(post?.title);
  const [category, setCategory] = useState(post?.category);
  const [file, setFile] = useState<File>();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      let apiRoute = "/api/posts/create-post";
      let method = "POST";
      e.preventDefault();
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
      if (file) form.append("file", file);
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
      return toast.success(data.message);
    } catch (e) {
      console.error(e);
    }
  };
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
            onChange={(e) => setFile(e.target!.files![0])}
          />
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
