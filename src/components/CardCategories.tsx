"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CategoriesList } from "@/interfaces/CategoriesData";
import Link from "next/link";

const CardCategories = () => {
  const [positionIndexes, setPositionIndexes] = useState([0,1,2,3,4,5,6,7,8]);
  const [hidden, setHidden] = useState(true);
  const handlePosition = (page: number) => {
    setPositionIndexes((prevIndexes) => {
      const updateIndexes = prevIndexes.map((prevIndex) => (prevIndex + page) % 9);
      return updateIndexes;
    })
  };
  
  const imageVariants = {
    left3: { x: "-20%", scale: 0.9, zIndex: 8},
    left2: { x: "-40%", scale: 0.7, zIndex: 7},
    left1: { x: "-60%", scale: 0.6, zIndex: 6},
    left: { x: "-80%", scale: 0.5, zIndex: 5},
    center: { x: "0%", scale: 1, zIndex: 9},
    right: { x: "80%", scale: 0.5, zIndex: 5},
    right1: { x: "60%", scale: 0.6, zIndex: 6},
    right2: { x: "40%", scale: 0.7, zIndex: 7},
    right3: { x: "20%", scale: 0.9, zIndex: 8},
  }
  const positions= ["center", "left3", "left2", "left1", "left", "right", "right1", "right2", "right3"];
  return (
    <div className="flex items-center flex-col justify-start h-[440px] card-categories-div">
      {CategoriesList.map((category,i) => (
        <motion.div 
        key={i}
        style={{
          width: "400px",
          height: "400px",
          position: "absolute",
          backgroundImage: `url(${category.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="rounded-[12px] flex flex-col justify-end card-categories"
        initial="center"
        animate={positions[positionIndexes[i]]}
        variants={imageVariants}
        transition={{duration: 0.5}}
        onMouseEnter={() => setHidden(false)}
        onMouseLeave={() => setHidden(true)}
      >
        {positions[positionIndexes[i]] === 'center' && (
          <div className={`card-categories-text text-white text-center shadow-text bg-text rounded-[12px] leading-10 ${hidden ? "hidden" : ""}`}>
            <h1 className="text-2xl text-primary">{category.title}</h1>
            <p className="text-sm">{category.description}</p>
            <Link className="text-sm" href={`/categories/${encodeURIComponent(category.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''))}`}>
              Read More
            </Link>
          </div>
        )}
      </motion.div>
      ))}
      <div className="flex flex-row h-[786px] w-[46px] z-50 translate-x-[482%] cursor-pointer next-card-category" onClick={() => handlePosition(1)}></div>
      <div className="flex flex-row h-[786px] w-[46px] z-50 translate-x-[-482%] translate-y-[-100%] cursor-pointer prev-card-category" onClick={() => handlePosition(8)}></div>
    </div>
  )
}

export default CardCategories