export interface News {
    source: NewsSource,
    publishedAt: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
}

export interface NewsSource {
    id: string,
    name: string,
}