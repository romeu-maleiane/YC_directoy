import StartupCard, { StartupTypeCard } from "@/components/startuoCard/page";
import SearchForm from "../../components/searchForm.tsx/page";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {auth} from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: String}>}) {
  const query = (await searchParams).query

  let params = { search: query || null }
  
  let {data: post} = await sanityFetch({ query: STARTUPS_QUERY, params });
  
  const session = await auth()

  console.log(session?.id)

  // const post = await client.fetch(STARTUPS_QUERY)

  // console.log(JSON.stringify(post))
  return (
    <>
      <section className="pink_container">

        <h1 className="heading">
          Pitch your startup, <br />
          comment with enterpreneurs
        </h1>
      
      <p className="sub-heading !max-w-exl">
        Submit ideas, vote on pitches, and get noticed in Virtual Competitions
      </p>

      <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {post && post.length > 0 ? 
          post.map((post: StartupTypeCard, index: Number) => <StartupCard key={post?._id} post={post}/>) 
          : <p className="no-results">No Startups found</p>}
        </ul>

        <SanityLive />
      </section>
    </>
  );
}
