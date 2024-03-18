

type FormPostType = {
    user?: string,
    name: string,
    title: string,
    message: string,
    tags: string[],
    file:  File | string | undefined,
    likes?: string[],
}

type PostType = {
    _id: string,
    title: string,
    message: string,
    user?: string,
    name: string,
    tags: string[],
    file: File |  string | undefined,
    likes?: string[],
    createdAt: Date,
}

export type {
    FormPostType,
    PostType,
}

