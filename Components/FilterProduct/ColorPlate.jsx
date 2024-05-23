import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

const ColorSelect = ({ colors, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onSelect(color);
  };
  useEffect(() => {
    onSelect(selectedColor);
  }, []);
  return (
    <>
      <h6 className="designing-sub-title">color</h6>
      <div className="color-select">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-option"
            style={{
              cursor: "pointer",
              backgroundColor: color,
              border:
                selectedColor === color
                  ? "1px solid #D8D8D8"
                  : "1px solid #D8D8D8",
            }}
            onClick={() => handleColorSelect(color)}
          >
            {selectedColor === color && (
              <FiCheck
                color={selectedColor === "#FFFFFF" ? "#000" : "#fff"}
                size={18}
              />

              // <img src="/images/check.webp" alt="check" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorSelect;
