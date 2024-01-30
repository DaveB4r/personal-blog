"use client";
import { FC, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { useAuthContext } from '@/contexts/page';

type Props = {
  id: number;
  user_id: number;
  selected: boolean;
}

const AddFavorite:FC<Props> = ({id, user_id, selected}) => {
  const { setFavorites } = useAuthContext();
  const [isSelected, setIsSelected] = useState(selected ? selected : false);
  const handleFavorite = () => {
    setIsSelected(!isSelected);
    sendRequest(id, user_id, !isSelected);
  }
  const sendRequest = async(id: number, user_id: number , selected: boolean) => {
    try {
      const apiRoute = "/api/posts/favorites";
      const data = {
        id,
        user_id,
        selected
      }
      const response = await fetch(apiRoute, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!response.ok) return console.error('Error');
      else{
        const res = await response.json();
        if(res.message !== 'Something wrong happened'){
          console.log(res.favorites)
          setFavorites(res.favorites);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      <FaStar className={`pl-2 text-2xl cursor-pointer ${isSelected ? "text-yellow-500 hover:text-white": "hover:text-yellow-500"}`} onClick={handleFavorite}/>
    </div>
  )
}

export default AddFavorite