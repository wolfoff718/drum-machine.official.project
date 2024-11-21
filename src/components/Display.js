import React from 'react';

const Display = ({ displayText }) => {
  return (
    <div id="display">
      {displayText ? displayText : "Presiona una tecla"} {/* El texto se mostrara si hay displayText, sino el texto sera predeterminado */}
    </div>
  );
};

export default Display;