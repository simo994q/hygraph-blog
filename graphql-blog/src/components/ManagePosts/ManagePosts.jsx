import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'
import style from './ManagePosts.module.scss'
import dompurify from 'dompurify';

export const ManagePosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const { data, isLoading, error } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    if (isLoading) console.log('Loading...');

    if (error) console.log(error.message);

    const deletePost = (id) => {
        const theQuery = `mutation MyMutation {
            deleteBlogPost(where: {id: "${id}"})
          }`
        const { data, isLoading, error } = useQuery({
            queryKey: ['allPosts'],
            queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, theQuery)
        })
    }

    return (
        <>
            <h2>Manage Posts</h2>

            <div className={style.allPostsContainer}>
                {data?.blogPosts?.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <div className={style.editOptions}>
                                <h3 className={style.postTitle}>{item.postTitle}</h3>
                                <button onClick={() => deletePost(item.id)}>Delete</button>
                            </div>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}