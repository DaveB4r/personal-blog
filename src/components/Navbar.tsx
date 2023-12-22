"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import { useAuthContext } from "../../contexts/page";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  options: string[];
};

const MyNavBar: FC<Props> = ({ options }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [optActive, setOptActive] = useState("");
  const [search, setSearch] = useState("");
  const { user, logout } = useAuthContext();
  const [logged, setLogged] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    pathname === "/"
      ? setOptActive("home")
      : setOptActive(String(pathname).match(/\w+/gi)[0]);
    setLogged(user().isLogged);
  }, [pathname]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    return router.push(`/search/${encodeURIComponent(search)}`);
  }
  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/images/logo_Juan_Pineda.png"
              alt="Logo Blog"
              width={50}
              height={50}
              priority={true}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <form onSubmit={handleSearch}>
            <Input
              isClearable
              radius="lg"
              classNames={{
                label: "text-white/90",
                input: [
                  "bg-transparent",
                  "text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Type to search..."
              startContent={<FaSearch />}
              onChange={(e) => setSearch(e.target.value)}
              isRequired
            />
          </form>
        </NavbarItem>
        {options.map((opt, i) => (
          <NavbarItem key={i} isActive={optActive === opt}>
            <Link
              className={`w-full capitalize ${
                optActive === opt
                  ? "hover:text-white"
                  : "text-white hover:text-primary"
              } `}
              href={"/" + (opt === "home" ? "" : opt)}
              color="foreground"
            >
              {opt}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {options.map((opt, i) => (
          <NavbarMenuItem key={i}>
            <Link
              className="w-full capitalize text-white"
              href={"/" + (opt === "home" ? "" : opt)}
              color="foreground"
            >
              {opt}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <div className="flex items-center gap-4">
        {logged ? (
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: user().avatar,
                }}
                className="transition-trnsform"
                description={user().email}
                name={user().username}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="profile"
              >
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{user().username}</p>
              </DropdownItem>
              <DropdownItem key="my-profile" textValue="my-profile">
                <Link href="/admin/profile">My Profile</Link>
              </DropdownItem>
              <DropdownItem key="favorites" textValue="favorites">
                <Link href="/admin/posts/favorites">Favorites</Link>
              </DropdownItem>
              <DropdownItem key="admin" textValue="admin">
                <Link href="/admin">Admin</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" textValue="logout">
                {session?.user ? (
                  <Button
                    onClick={async () => {
                      logout();
                      await signOut({ callbackUrl: "/login" });
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/admin/logout">Logout</Link>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color={optActive === "signup" ? "primary" : "default"}
              href="/signup"
              variant="light"
            >
              Sign Up
            </Button>
            <Button
              as={Link}
              color={optActive === "login" ? "primary" : "default"}
              href="/login"
              variant="light"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </div>
    </Navbar>
  );
};

export default MyNavBar;
