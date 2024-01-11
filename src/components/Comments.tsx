import React, { FC } from 'react';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import { useAuthContext } from '@/contexts/page';

interface CommentsProps {
  post_id?: number;
  number_comments?: string | number;
  comments?: string;
  comment_usernames?: string;
}

const Comments:FC<CommentsProps> = ({post_id, number_comments, comments, comment_usernames}) => {
  const { user } = useAuthContext();
  const commentsList: string[] = comments !== null ? comments.split('|-|') : [];
  const comment_usernamesList: string[] = comment_usernames !== null ?  comment_usernames.split('|-|') : [];
  return (
  <div className="w-full">
    {user().id && (
      <CommentForm post_id={post_id} user_id={user().id}/>
    )}
    <h3 className="text-xl">{number_comments} Comment{number_comments !== 1 ? 's' : ''}</h3>
    <CommentsList comments={commentsList} comment_usernames={comment_usernamesList}/>
  </div>
  );
}

export default Comments