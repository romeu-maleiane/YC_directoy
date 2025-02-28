import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "../startuoCard/page";


export default async function UserStartups({id}: {id: string}){
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, { id })

    return <>
        {startups && startups.length > 0 ? (
            startups.map((startup: StartupTypeCard) => 
                <StartupCard key={startup._id} post={startup} />
            )
        ): (
            <p className="no-result">No result</p>
        )}
    </>

}