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
}

export interface Posts {
  posts?: PostType[];
}