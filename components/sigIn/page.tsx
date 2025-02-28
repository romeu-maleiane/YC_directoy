import { signIn } from "@/auth";
import React from "react";

export default function SignIn() {
    return <>
        <form action={async () => {
            "use server";

            await signIn('github')
        }}>
            <button type="submit">LogIn</button>
        </form>
    </>
}