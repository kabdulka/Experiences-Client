

type FormPostType = {
    user: string,
    title: string,
    message: string,
    tags: string,
    file:  File | string | undefined,
}

type PostType = {
    _id: string,
    title: string,
    message: string,
    user: string,
    tags: string[],
    file: File |  string | undefined,
    likeCount: number,
    createdAt: Date,
}

export type {
    FormPostType,
    PostType,
}

