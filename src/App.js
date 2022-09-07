import React, {useState, useMemo, useEffect} from 'react';
import Result from "./Result";

const synth = window.speechSynthesis;


const App = () => {
  const voices = useMemo(() => synth.getVoices(), [])
  const [voiceSelected, setVoiceSelected] = useState("Google US English");
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState("");

  const startSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(voice => voice.name === voiceSelected);
    utterance.voice = voice;
    synth.speak(utterance);
  }

  const handleSpeech = () => {
    if(!text.trim()) return;
    if(!synth.speaking){
      startSpeech(text);
      setIsSpeaking("speak");
    }else{
      synth.cancel();
    }

    setInterval(() => {
      if(!synth.speaking){
        setIsSpeaking("");
      }
    }, 100);
  }
  
  return (
    <div className='container'>
      <h1>English Dictionary</h1>

      <form>
        <div className='row'>
          <textarea cols="30" rows="4" placeholder="Enter text/" value={text} onChange={e => setText(e.target.value)}></textarea>
          <div className='voices-icon'>
            <div className='select-voices'>
              <select value={voiceSelected} onChange={
                e=> setVoiceSelected(e.target.value)
              }>
                {
                  voices.map(voice => (<option key={voice.name}
                    value={voice.name}>{voice.name}</option>))
                }
              </select>
            </div>
            <i onClick={handleSpeech} className={`fa-solid fa-volume-high  ${isSpeaking}`}/>
          </div>
        </div>
      </form>


<Result/>
    </div>
  )
}

export default App