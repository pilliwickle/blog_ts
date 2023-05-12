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

export type IArticles = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: IAuthor;
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
};

export type IArticlesState = {
  articles: IArticles[];
  articlesCount: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
};

export type IArticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
};

export type IArticleState = {
  article: IArticle;
  loading: boolean;
  error: string | null;
};

export interface ISubmitForm {
  username: string;
  email: string;
  pass: string;
  repeatePass: string;
  checkbox: boolean;
}
export interface ILoginForm {
  email: string;
  password: string;
}
