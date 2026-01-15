import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosAPI from "../../axiosAPI.ts";
import type {IPage} from "../../types";

const Page = () => {
    const [loading, setLoading] = useState<boolean>();
    const [currentPage, setCurrentPage] = useState<IPage | null>(null)
    const {pageName} = useParams();

    const fetchPage = useCallback(async () => {
        try {
            setLoading(true);

            let fetchLink = '/pages/home.json'
            if (pageName) {
                fetchLink = `/pages/${pageName}.json`
            }

            const response = await axiosAPI<IPage | null>(fetchLink);
            const responsePost = response.data;
            console.log(responsePost, pageName)
            if (responsePost) {
                setCurrentPage(responsePost)
            }

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }, [pageName])
    
    useEffect(() => {
        void fetchPage()
    }, [fetchPage])
    return (
        <div>
        </div>
    );
};

export default Page;