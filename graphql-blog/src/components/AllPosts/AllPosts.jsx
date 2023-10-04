import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'

export const AllPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const { data, isLoading, error } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    if (isLoading) console.log('Loading...');

    if (error) console.log(error.message);

    console.log(data);

    return (
        <>
            <h2>All Posts</h2>

            <div>
                {data?.blogPosts?.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3>{item.postTitle}</h3>
                            <p>{item.postDate.slice(0, 10).replaceAll('-', '/')} {item.postDate.slice(11, 19).replaceAll(':', '.')}</p>
                            <p>{item.postContent.text}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}