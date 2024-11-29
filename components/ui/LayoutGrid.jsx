"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/ui"; // Utility function for combining classes

export const LayoutGrid = ({ cards }) => {
  console.log(cards);  // Log the cards array to verify it's being passed correctly
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  // Handle selecting a card
  const handleClick = (card) => {
    console.log("Selected Card: ", card);  // Log selected card
    setLastSelected(selected);
    setSelected(card);
  };

  // Handle clicking outside to deselect
  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden bg-white rounded-xl transition-all duration-300 ease-in-out",
              selected?.id === card.id
                ? "cursor-pointer z-50 h-1/2 w-full md:w-1/2 flex justify-center items-center flex-col"
                : lastSelected?.id === card.id
                ? "z-40"
                : "h-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}

      {/* Click outside to deselect */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute top-0 left-0 w-full h-full bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto opacity-30" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 w-full h-full transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
