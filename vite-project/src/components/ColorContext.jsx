import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

// eslint-disable-next-line react/prop-types
export function ColorProvider({ children }) {
  const [selectedColors, setSelectedColors] = useState([]);
  
  const handleColorChange = (newColors) => {
    setSelectedColors(newColors);
  };

  return (
    <ColorContext.Provider value={{ selectedColors, handleColorChange }}>
      {children}
    </ColorContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorContext() {
  return useContext(ColorContext);
}