interface IPosts {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

export interface PostsProps {
  posts: IPosts[];
  messageError: string;
}
