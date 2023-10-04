import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'

export const AllPosts = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${process.env.URL_TOKEN}/master`, getAllPosts)
      })

      if (isLoading) console.log('Loading...');

      if (error) console.log(error.message);

      console.log(data);

    return (
        <>
        allposts
        </>
    )
}