import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth } from "@/auth";
import SignIn from "../sigIn/page";
import SigInOut from "../logOut/page";
import { BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function Navbar(){
    const session = await auth()

    return <>
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={144} height={30}/>
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <SigInOut />

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image} alt={session?.user?.name || ""}/>
                                    <AvatarFallback>Av</AvatarFallback>
                                </Avatar>
                            </Link>

                        </>
                    ) : (<>
                        <SignIn />
                    </>)}
                </div>
            </nav>
        </header>
    </>
}