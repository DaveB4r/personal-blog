export type PostType = {
  id: number;
  user_id: number;
  title: string;
  category: string;
  date: string;
  content: string;
  image: string;
  state: boolean;
  slug: string;
  username?: string;
  avatar?: string;
  number_comments?: string | number;
  comments: string;
  comment_usernames: string;
  comment_date: string;
}

export interface Posts {
  posts?: PostType[];
}