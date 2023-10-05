import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getTodaysPosts } from '../../queries/getTodaysPosts'
import style from './TodaysPosts.module.scss'
import dompurify from 'dompurify';

export const TodaysPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const todaysPosts = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getTodaysPosts)
    })

    if (todaysPosts.isLoading) console.log('Loading...');

    if (todaysPosts.error) console.log(todaysPosts.error.message);

    console.log(todaysPosts.data);

    return (
        <>
            <h2>Todays Posts</h2>
            <div className={style.allPostsContainer}>
                {todaysPosts?.data?.blogPosts.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <h3 className={style.postTitle}>{item.postTitle}</h3>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                }
                )}
            </div>

        </>
    )
}