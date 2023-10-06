import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'
import style from './AllPosts.module.scss'
import dompurify from 'dompurify';
import { useState, useEffect } from "react";

export const AllPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const { data, isLoading, error } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    if (isLoading) console.log('Loading...');

    if (error) console.log(error.message);
    
    const [inputText, setInputText] = useState('')
    const [searchData, setSearchData] = useState()

    console.log(data);

    const search = () => {
        let clone = data.blogPosts.map((item) => item)
        let result = clone.filter((item) => item.postTitle.toLowerCase().includes(inputText.toLowerCase()))
        setSearchData(result)
    }

    useEffect(() => {
        if (inputText == '') {
            let clone = data?.blogPosts.map((item) => item)
            setSearchData(clone)
        } else {
            search()
        }
    }, [inputText])

    return (
        <>
            <h2>All Posts</h2>

            <input type="text" placeholder="Search" onChange={(e) => setInputText(e.target.value)} />

            <div className={style.allPostsContainer}>
                {!searchData ? data?.blogPosts?.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <h3 className={style.postTitle}>{item.postTitle}</h3>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                }) : searchData.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <h3 className={style.postTitle}>{item.postTitle}</h3>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}