import React, { useRef } from "react";

const CategoryProdTags = ({ tags,selectedTag,_selectedTag }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="category-prod-tags-container ">
      <button onClick={() => scroll(-100)} className="scroll-btn prev">
        <img src="/images/svg/chevron.svg" alt="select" />
      </button>
      <div className="tags-wrapper" ref={scrollContainerRef}>
        {tags.map((tag, index) => (
          <div key={index} onClick={() => _selectedTag(tag)} className={`tag ${selectedTag === tag ? "active" : ""}`}>
            {tag}
          </div>
        ))}
      </div>
      <button onClick={() => scroll(100)} className="scroll-btn next">
        <img src="/images/svg/chevron.svg" alt="select" />
      </button>
    </div>
  );
};

export default CategoryProdTags;
