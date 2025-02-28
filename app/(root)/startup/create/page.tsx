import { auth } from "@/auth";
import StartupF from "@/components/startupForm/page";
import { redirect } from "next/navigation";


export default async function CreateStartup(){
    const session = await auth()

    if(!session) redirect('/')

    return <>
        <section className="pink_container">
            <h1 className="heading">
                Submit Your Startup
            </h1>
        </section>
        <section>
            <StartupF />
        </section>
    </>
}