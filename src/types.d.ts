export interface IPage {
    title: string,
    content: string,
}

export interface IPageAPI {
    [key: string]: IPage
}

export interface IPageMutation {
    title: string,
    content: string,
    id: string,
}

export interface IPageSelect {
    title: string,
    id: string,
}