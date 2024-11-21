import React, { useRef } from 'react';

const DrumPad = ({ id, sound, url, handleClick, powerOn }) => {
  const localAudioRef = useRef(null);

  const handlePress = () => {
    if (powerOn) {
      handleClick(id, sound);  
      const audio = localAudioRef.current;
      if (audio) {
        audio.play();
      }
    }
  };

  return (
    <button className="drum-pad" id={id} onClick={handlePress}>
      {id} 
      <audio className="clip" id={id} src={url} ref={localAudioRef}></audio>
    </button>
  );
};

export default DrumPad;
