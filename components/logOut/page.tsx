import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import React from "react";

export default function SigInOut(){
    return <>
        <form action={async () => {
            'use server';

            await signOut({ redirectTo: '/' }) 
            }}>
                <button type="submit">
                    <span className="max-sm:hidden">LogOut</span>
                    <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
            </form>
    </>
}