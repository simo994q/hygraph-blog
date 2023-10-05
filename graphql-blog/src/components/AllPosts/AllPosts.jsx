import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'
import style from './AllPosts.module.scss'
import dompurify from 'dompurify';

export const AllPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const allPosts = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    if (allPosts.isLoading) console.log('Loading...');


    if (allPosts.error) console.log(allPosts.error.message);

    console.log(allPosts.data);

    const setSort = (sort) => {
        console.log(sort);
        switch (sort) {
            case 'newest':
                allPosts.data.blogPosts.sort((a, b) => {
                    const dateA = new Date(a.postDateTime);
                    const dateB = new Date(b.postDateTime);

                    // Compare the dates in reverse order
                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    return 0;
                });
                console.log(allPosts.data);
                break;
            case 'oldest':
                allPosts.data.blogPosts.sort((a, b) => {
                    const dateA = new Date(a.postDateTime);
                    const dateB = new Date(b.postDateTime);

                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return 0;
                });
                console.log(allPosts.data);
                break;
            case 'name':
                allPosts.data.blogPosts.sort((a, b) => {
                    const nameA = a.postTitle.toLowerCase();
                    const nameB = b.postTitle.toLowerCase();

                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
                console.log(allPosts.data);
                break;
        }
    }

    return (
        <>
            <h2>All Posts</h2>

            <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
            </select>

            <div className={style.allPostsContainer}>
                {allPosts?.data?.blogPosts.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <h3 className={style.postTitle}>{item.postTitle}</h3>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}