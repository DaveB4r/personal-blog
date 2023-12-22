"use client";
import { FC, useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { RiOpenaiFill, RiShieldKeyholeLine, RiDatabaseLine } from "react-icons/ri";
import { AiFillCode,AiOutlineMobile, AiFillWindows } from "react-icons/ai";
import { FaLinux, FaRobot } from "react-icons/fa6";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const CategoriesNames = [
  "artificial intelligence",
  "cyber security",
  "data base",
  "hacking",
  "linux",
  "machine learning",
  "mobile",
  "programming",
  "windows",
];

export const CategoryElement: FC = () => {
  const pathname = usePathname();
  const [optActive, setOptActive] = useState("");
  useEffect(() => {
    setOptActive(String(decodeURIComponent(pathname.replaceAll('/categories/',''))));
  },[pathname])
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const categories = [
    {
      key: "ai",
      icon: <RiOpenaiFill className={iconClasses} />,
      name: "Artificial Intelligence",
      active:  optActive === "artificial intelligence"
    },
    {
      key: "CS",
      icon: <RiShieldKeyholeLine className={iconClasses} />,
      name: "Cyber Security",
      active:  optActive === "cyber security"
    },
    {
      key: "DB",
      icon: <RiDatabaseLine className={iconClasses} />,
      name: "Data Base",
      active:  optActive === "data base"
    },
    {
      key: "HACK",
      icon: <AiFillCode className={iconClasses} />,
      name: "Hacking",
      active:  optActive === "hacking"
    },
    {
      key: "Linux",
      icon: <FaLinux className={iconClasses} />,
      name: "Linux",
      active:  optActive === "linux"
    },
    {
      key: "Machine Learning",
      icon: <FaRobot className={iconClasses} />,
      name: "Machine Learning",
      active:  optActive === "machine learning"
    },
    {
      key: "Mobile",
      icon: <AiOutlineMobile className={iconClasses} />,
      name: "Mobile",
      active:  optActive === "mobile"
    },
    {
      key: "Programming",
      icon: <PiBracketsCurlyBold className={iconClasses} />,
      name: "Programming",
      active:  optActive === "programming"
    },
    {
      key: "Windows",
      icon: <AiFillWindows className={iconClasses} />,
      name: "Windows",
      active:  optActive === "windows"
    },
  ];
  return (
    <div>
      <Listbox variant="faded" aria-label="Listbox menu with icons">
        {categories.map((category) => (
          <ListboxItem key={category.key} startContent={category.icon} textValue={category.name}>
            <Link href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`} className={category.active ? 'text-primary':'text-white'}>
              {category.name}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};
