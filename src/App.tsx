import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

interface DrumPad {
  key: string;
  id: string;
  url: string;
  description: string;
}

const drumPads: DrumPad[] = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', description: 'Heater 1' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', description: 'Heater 2' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', description: 'Heater 3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', description: 'Heater 4' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', description: 'Clap' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', description: 'Open HH' },
  { key: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', description: 'Kick n\' Hat' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', description: 'Kick' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', description: 'Closed HH' },
];

function App() {
  const [displayText, setDisplayText] = useState('');

  const playSound = (pad: DrumPad) => {
    const audio = document.getElementById(pad.key) as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplayText(pad.description);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const pad = drumPads.find(
      (p) => p.key.toLowerCase() === event.key.toLowerCase()
    );
    if (pad) {
      playSound(pad);
      const element = document.getElementById(pad.id);
      if (element) {
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 100);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div
        id="drum-machine"
        className="bg-gray-800 rounded-xl p-8 shadow-2xl max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <Volume2 className="text-purple-400 w-8 h-8" />
          <div
            id="display"
            className="bg-purple-200 px-4 py-2 rounded-md font-mono text-purple-900 min-h-[2rem] min-w-[150px] text-center"
          >
            {displayText || 'Ready'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {drumPads.map((pad) => (
            <button
              key={pad.id}
              id={pad.id}
              className="drum-pad bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 
                         text-white rounded-lg p-6 text-xl font-bold shadow-lg transition-all duration-100 
                         active:scale-95 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => playSound(pad)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.url}></audio>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;