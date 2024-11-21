import React, { useState, useRef } from 'react';  
import './App.css';
import DrumPad from './components/DrumPad';
import Display from './components/Display';

const App = () => {
  
  const soundsBank1 = [
    { id: 'Q', sound: 'Heater 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'W', sound: 'Heater 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'E', sound: 'Heater 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'A', sound: 'Clap', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'S', sound: 'Open HH', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 'D', sound: 'Kick n Hat', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 'Z', sound: 'Kick', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 'X', sound: 'Closed HH', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 'C', sound: 'Heater 4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' }
  ];

  const soundsBank2 = [
    { id: 'Q', sound: 'Snare', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    { id: 'W', sound: 'Hi-hat', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
    { id: 'E', sound: 'Crash', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
    { id: 'A', sound: 'Tom', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
    { id: 'S', sound: 'Cymbal', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
    { id: 'D', sound: 'Bongo', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
    { id: 'Z', sound: 'Tambourine', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
    { id: 'X', sound: 'Rimshot', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3' },
    { id: 'C', sound: 'Kick', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3' }
  ];

  const [displayText, setDisplayText] = useState('');
  const [powerOn, setPowerOn] = useState(true);
  const [bank, setBank] = useState('Bank 1');
  const [sounds, setSounds] = useState(soundsBank1);

  const audioRefs = useRef({});

  const handleClick = (id) => {
    setDisplayText(id);
    if (powerOn) {
      const audio = audioRefs.current[id];
      if (audio) {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        } else {
          audio.play();
        }
      }
    }
  };

  const handleBankChange = (e) => {
    const selectedBank = e.target.value;
    setBank(selectedBank);
    if (selectedBank === 'Bank 1') {
      setSounds(soundsBank1);
    } else {
      setSounds(soundsBank2);
    }
  };

  const handleSwitchChange = () => {
    setPowerOn(!powerOn); 
  };

  return (
    <div id="drum-machine">
      <Display displayText={displayText} />

      <div className="controls">
        
        <div className="control">
          <label htmlFor="power-switch">Power</label>
          <label className="switch">
            <input
              type="checkbox"
              id="power-switch"
              checked={powerOn}
              onChange={handleSwitchChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="control">
          <label htmlFor="bank-select">Bank</label>
          <select
            id="bank-select"
            value={bank}
            onChange={handleBankChange}
          >
            <option value="Bank 1">Bank 1</option>
            <option value="Bank 2">Bank 2</option>
          </select>
        </div>
      </div>

      <div id="pads">
        {sounds.map((pad) => (
          <DrumPad
            key={pad.id}
            id={pad.id}
            sound={pad.sound}
            url={pad.url}
            handleClick={handleClick}
            powerOn={powerOn}
            audioRef={(el) => (audioRefs.current[pad.id] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;