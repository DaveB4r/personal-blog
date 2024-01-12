import { FC } from 'react';
import { Listbox, ListboxItem, Divider } from '@nextui-org/react';
import { FormatDate } from '@/app/actions/FormatDate';

interface CommentsListProps {
  comments?: string[];
  comment_usernames?: string[];
  comment_date?: string[];
}

const CommentsList:FC<CommentsListProps> = ({comments, comment_usernames, comment_date}) => {
  return <div>
    {comments.length > 0 && comment_usernames.length > 0 ? (
      <Listbox variant='faded' aria-label='Listbox comments' className="w-full">
      {comments.map((comment, i) => (
        <ListboxItem key={i} textValue={comment}>
          <div className="flex justify-between">
          <p className='font-bold'>{comment_usernames[i]}</p>
          <p className='text-primary'>{FormatDate(comment_date[i])}</p>
          </div>
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