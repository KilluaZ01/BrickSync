import React, { useState, useEffect, useRef } from "react";
import "./Services.css";

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start from the first set of actual cards
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionRef = useRef();

  const cards = [
    {
      imgSrc: "https://via.placeholder.com/150",
      title: "Card 1",
      paragraph: "This is the first card.",
    },
    {
      imgSrc: "https://via.placeholder.com/150",
      title: "Card 2",
      paragraph: "This is the second card.",
    },
    {
      imgSrc: "https://via.placeholder.com/150",
      title: "Card 3",
      paragraph: "This is the third card.",
    },
    {
      imgSrc: "https://via.placeholder.com/150",
      title: "Card 4",
      paragraph: "This is the fourth card.",
    },
  ];

  const totalCards = cards.length;

  useEffect(() => {
    transitionRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(transitionRef.current);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= totalCards + 2) {
      setIsTransitioning(false);
      setCurrentIndex(2); // Reset to the first set of actual cards
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalCards); // Reset to the last set of actual cards
    } else {
      setIsTransitioning(true);
    }
  };

  // Duplicate the cards at both ends
  const duplicatedCards = [
    cards[totalCards - 2],
    cards[totalCards - 1],
    ...cards,
    cards[0],
    cards[1],
  ];

  return (
    <div className="carousel-container">
      <div
        className={`carousel-wrapper ${isTransitioning ? "" : "no-transition"}`}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${(currentIndex - 1) * 240}px)`,
          width: `${duplicatedCards.length * 240}px`, // Total width to accommodate all cards plus duplicates
        }}
      >
        {duplicatedCards.map((card, index) => (
          <div key={index} className="carousel-card">
            <img src={card.imgSrc} alt={card.title} className="carousel-img" />
            <div className="carousel-content">
              <h2>{card.title}</h2>
              <p>{card.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
