import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getNewestSort } from '../../queries/getNewestSort'
import { getOldestSort } from '../../queries/getOldestSort'
import style from './AllPosts.module.scss'
import dompurify from 'dompurify';
import { useEffect, useState } from "react";

export const AllPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    
    const newestSort = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getNewestSort)
    })

    const oldestSort = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getOldestSort)
    })

    const nameSort = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    
    
    
    if (newestSort.isLoading) console.log('Loading...');
    
    
    if (newestSort.error) console.log(error.message);
    
    const [postsData, setPostsData] = useState(newestSort)
    console.log(newestSort?.data);
    console.log(postsData.data);
    const setSort = (sort) => {
        switch (sort) {
            case 'newest':

                break;
            case 'oldest':

                break;
            case 'name':

                break;
        }
    }

    return (
        <>
            <h2>All Posts</h2>

            <select onChange={(e) => setSortFilter(e.target.value)}>
                <option value="newest" selected>Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
            </select>

            {/* <div className={style.allPostsContainer}>
                {postsData?.blogPosts.map((item, index) => {
                    if (postsData?.blogPosts?.indexOf(item) == postsData?.blogPosts?.length - 1) {
                        return (
                            <>
                                <div key={index} className={style.postContainer}>
                                    <h3 className={style.postTitle}>{item.postTitle}</h3>
                                    <p className={style.postDate}>{item.postDate.slice(0, 10)} {item.postDate.slice(11, 16)}</p>
                                    <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <div key={index} className={style.postContainer}>
                                    <h3 className={style.postTitle}>{item.postTitle}</h3>
                                    <p className={style.postDate}>{item.postDate.slice(0, 10)} {item.postDate.slice(11, 16)}</p>
                                    <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                                </div>
                                <hr />
                            </>
                        )
                    }
                })}
            </div> */}
        </>
    )
}