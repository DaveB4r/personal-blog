import { FC } from 'react';
import { Listbox, ListboxItem, Divider } from '@nextui-org/react';

interface CommentsListProps {
  comments?: string[];
  comment_usernames?: string[];
}

const CommentsList:FC<CommentsListProps> = ({comments, comment_usernames}) => {
  return <div>
    {comments.length > 0 && comment_usernames.length > 0 ? (
      <Listbox variant='faded' aria-label='Listbox comments' className="w-full">
      {comments.map((comment, i) => (
        <ListboxItem key={i} textValue={comment}>
          <p className='font-bold'>{comment_usernames[i]}</p>
          <p>{comment}</p>
          <Divider />
        </ListboxItem>
      ))}
    </Listbox>
    ) : (
      <p>No comments yet</p>
    )}
  </div>
}

export default CommentsList;