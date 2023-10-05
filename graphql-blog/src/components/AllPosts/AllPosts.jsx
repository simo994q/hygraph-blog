import { useQuery } from "@tanstack/react-query"
import { request } from 'graphql-request'
import { getAllPosts } from '../../queries/getAllPosts'
import style from './AllPosts.module.scss'
import dompurify from 'dompurify';
import { useState, useEffect } from "react";

export const AllPosts = () => {

    let token = import.meta.env.VITE_PUBLIC_URL_TOKEN

    const {data, isLoading, error} = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${token}/master`, getAllPosts)
    })

    if (isLoading) console.log('Loading...');


    if (error) console.log(error.message);

    console.log(data);

    const setSort = (sort) => {
        console.log(sort);
        switch (sort) {
            case 'newest':
                data.blogPosts.sort((a, b) => {
                    const dateA = new Date(a.postDateTime);
                    const dateB = new Date(b.postDateTime);

                    // Compare the dates in reverse order
                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    return 0;
                });
                console.log(data);
                break;
            case 'oldest':
                data.blogPosts.sort((a, b) => {
                    const dateA = new Date(a.postDateTime);
                    const dateB = new Date(b.postDateTime);

                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return 0;
                });
                console.log(data);
                break;
            case 'name':
                data.blogPosts.sort((a, b) => {
                    const nameA = a.postTitle.toLowerCase();
                    const nameB = b.postTitle.toLowerCase();

                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
                console.log(data);
                break;
        }
    }

    const [inputText, setInputText] = useState('')
    const [searchData, setSearchData] = useState()

    const search = () => {
        let clone = data.blogPosts.map((item) => item)
        let result = clone.filter((item) => item.postTitle.toLowerCase().includes(inputText.toLowerCase()))
        console.log(result);
        setSearchData(result)
    }

    useEffect(() => {
        if (inputText == '') {
            setSearchData()
        } else {
            search()
        }
    }, [inputText])

    return (
        <>
            <h2>All Posts</h2>

            <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
            </select>

            <input type="text" placeholder="Search" onChange={(e) => setInputText(e.target.value)} />

            <div className={style.allPostsContainer}>
                {/* {allPosts?.data?.blogPosts.map((item, index) => {
                    return (
                        <div key={index} className={style.postContainer}>
                            <h3 className={style.postTitle}>{item.postTitle}</h3>
                            <p className={style.postDate}>{item.postDateTime.slice(0, 10)} {item.postDateTime.slice(11, 16)}</p>
                            <div className={style.postTextContainer} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(item.postContent.html) }} />
                        </div>
                    )
                })
                } */}
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