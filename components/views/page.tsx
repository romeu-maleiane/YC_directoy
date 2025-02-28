import { client } from "@/sanity/lib/client";
import Ping from "../ping/page";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { formatView } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import {after}  from 'next/server'

export default async function Views({id}: {id: string}){
    const {views: totalViews} = await client 
        .withConfig({useCdn: false})
        .fetch(STARTUP_VIEWS_QUERY, {id})

        after( async () => await writeClient
            .patch(id)
            .set({views: totalViews + 1 })
            .commit())

    return <div className="view-container">
        <div className="absolute -top-1 -right-2">
            <Ping />
        </div>

        <p className="view-text">
            <span className="font-black">{formatView(totalViews)}</span>
        </p>
    </div>
}