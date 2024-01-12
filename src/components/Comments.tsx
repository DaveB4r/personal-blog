import React, { FC } from 'react';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import { useAuthContext } from '@/contexts/page';

interface CommentsProps {
  post_id?: number;
  number_comments?: string | number;
  comments?: string;
  comment_usernames?: string;
  comment_date?: string;
}

const Comments:FC<CommentsProps> = ({post_id, number_comments, comments, comment_usernames, comment_date}) => {
  const { user } = useAuthContext();
  const commentsList: string[] = comments !== null ? comments.split('|-|') : [];
  const comment_usernamesList: string[] = comment_usernames !== null ?  comment_usernames.split('|-|') : [];
  const comment_dateList: string[] = comment_date !== null ? comment_date.split('|-|') : [];
  return (
  <div className="w-full">
    {user().id && (
      <CommentForm post_id={post_id} user_id={user().id}/>
    )}
    <h3 className="text-xl">{number_comments} Comment{number_comments !== 1 ? 's' : ''}</h3>
    <CommentsList comments={commentsList} comment_usernames={comment_usernamesList} comment_date={comment_dateList}/>
  </div>
  );
}

export default Comments