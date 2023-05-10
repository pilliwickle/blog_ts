interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticleIItem {
  slug: string;
  body: string;
  tagList: string[];
  title: string;
  description: string;
  createdAt: string;
  author: IAuthor;
  favoritesCount: number;
}
