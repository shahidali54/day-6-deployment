import { createClient } from "next-sanity";

const client = createClient ({
    projectId : "r6m7b1uj",
    dataset : "production",
    useCdn : true,
    apiVersion : '2025-01-13'
});

export async function sanityFetch ({querry, params = {}} : {querry : string, params? : any}) {
    return await client.fetch(querry, params)
}