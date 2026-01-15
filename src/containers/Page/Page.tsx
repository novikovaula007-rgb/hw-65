import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosAPI from "../../axiosAPI.ts";
import type {IPage} from "../../types";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import {Box, Typography} from "@mui/material";

const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<IPage | null>(null)
    const {pageName} = useParams();

    const fetchPage = useCallback(async () => {
        try {
            setLoading(true);
            setCurrentPage(null)

            let fetchLink = '/pages/home.json'
            if (pageName) {
                fetchLink = `/pages/${pageName}.json`
            }

            const response = await axiosAPI<IPage | null>(fetchLink);
            const responsePost = response.data;
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
        <>
            {loading && (<Spinner/>)}
            {!loading && !currentPage && (<NotFoundPage/>)}
            {!loading && currentPage && (
                <Box>
                    <Typography variant='h2'>
                        {currentPage.title}
                    </Typography>
                    <Typography>
                        {currentPage.content}
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default Page;