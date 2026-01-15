import React, {useCallback, useEffect, useState} from "react";
import axiosAPI from "../../axiosAPI.ts";
import type {IPage, IPageAPI, IPageMutation, IPageSelect} from "../../types";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const EditPage = () => {
    const [pages, setPages] = useState<IPageSelect[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<IPageMutation>({id: '', title: '', content: ''});
    const navigate = useNavigate()

    const fetchPages = useCallback(async () => {
        try {
            setLoading(true);

            const response = await axiosAPI<IPageAPI | null>('/pages.json')
            const pagesObject = response.data;
            if (pagesObject) {
                const pagesArray = Object.keys(pagesObject).map(idProduct => {
                    return {
                        title: pagesObject[idProduct].title,
                        id: idProduct,
                    }
                })
                setPages(pagesArray)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }, [])

    const onChangeField = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const {name, value} = event.target;

        if (name === 'id') {
            try {
                const response = await axiosAPI<IPage>(`/pages/${value}.json`);
                const responsePage = response.data;
                setForm({
                    title: responsePage.title,
                    content: responsePage.content,
                    id: value,
                })
            } catch (e) {
                console.log(e)
            }
        } else {
            setForm((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (form.title.trim().length > 0 && form.id) {
                setLoading(true);
                await axiosAPI.put(`/pages/${form.id}.json`, {title: form.title, content: form.content});
                navigate(`/pages/${form.id}`);
                toast.success(`Page edited successfully!`);
                setForm({id: '', title: '', content: ''});
            } else {
                toast.error('You have not filled in all the required fields.\n')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void fetchPages()
    }, [fetchPages]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Typography variant='h4' sx={{textAlign: 'center'}}>
                    Editing page
                </Typography>

                <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
                    <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="type-label">Id</InputLabel>
                            <Select
                                labelId="type-label"
                                disabled={loading}
                                label="Id"
                                name="id"
                                value={form.id}
                                onChange={onChangeField}
                            >
                                {pages.map(page => {
                                    return <MenuItem value={page.id} key={page.id}>{page.id}</MenuItem>

                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            sx={{width: '100%'}}
                            variant='outlined'
                            name='title'
                            label='Title'
                            disabled={loading}
                            value={form.title}
                            onChange={onChangeField}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            sx={{width: '100%'}}
                            variant='outlined'
                            disabled={loading}
                            minRows={3}
                            name='content'
                            label='Content'
                            value={form.content}
                            onChange={onChangeField}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button
                            fullWidth
                            type='submit'
                            loading={loading}
                            loadingPosition='end'
                            variant='outlined'
                            endIcon={<SaveIcon/>}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EditPage;