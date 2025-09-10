import { useContext } from 'react'
import va from './assets/ai.png'
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakingGif from './assets/speak.gif'
import aiGif from './assets/aiVoice.gif'

const App = () => {
  const { recognition, speaking, setSpeaking, prompt, response, setPrompt, girlSpeak } = useContext(datacontext)

  const handleMain = () => {
    recognition.start()
  }

  return (
    <div className='flex w-full  h-screen items-start justify-center p-10 bg-black text-white'>
      <div className='w-full flex flex-col items-center justify-center gap-4 text-center '>
        {!girlSpeak ? <img className='' width={"200px"} height={"200px"} src={va} alt="" /> : <img className='' width={"200px"} height={"200px"} src={emojiTalking} alt="" /> }
        
        <p className=' text-pink-400'>I'am Nexa, Your Advanced Virtual Assistant</p>

        {!speaking ?
          <button onClick={() => {
            setSpeaking(true)
            handleMain()
            setPrompt("Listening...")
          }} className='rounded-lg px-2 py-1 bg-blue-600  flex items-center gap-2 font-semibold '>Click here <CiMicrophoneOn />
          </button>
          :
          <div className='flex flex-col items-center justify-center '>
              {!response ? <img src={speakingGif} width={"80px"}  alt="Speaking GIF" />  :  <img src={aiGif} width={"100px"}  alt="ai Speaking GIF" />}
              <p>{prompt}</p>
          </div>
        }

      </div>
    </div>
  )
}

export default App
