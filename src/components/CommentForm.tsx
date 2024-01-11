import { FC, FormEvent, useState } from 'react'
import { Textarea, Button } from '@nextui-org/react';

interface CommentFormProps {
  post_id: string | number;
  user_id: string | number;
}

const CommentForm:FC<CommentFormProps> = ({post_id, user_id}) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    const url = '/api/posts/comments';
    const data = {
      post_id,
      user_id,
      comment
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Conten-Type':'application/json'
        },
      });
      const res = await response.json();
      if(!response.ok) return console.error("Something wrong happened!");
      setComment("");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <form onSubmit={handleSubmit}className='flex flex-col'>
      <Textarea 
        label="Comment"
        placeholder="Give me your comment..."
        className="w-full"
        value={comment}
        onChange={(e) => setComment(e.target.value) }
        isRequired
      />
      <Button color='primary' variant='ghost' type="submit" className="self-end">
        Comment
      </Button>
    </form>
  );
}

export default CommentForm;