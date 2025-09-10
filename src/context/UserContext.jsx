import { createContext, useState } from 'react'
import main from '../gemini';

export const datacontext = createContext()
const UserContext = ({ children }) => {
    let [speaking, setSpeaking] = useState(false)
    let [prompt, setPrompt] = useState('Listening...')
    let [response, setResponse] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB"
        window.speechSynthesis.speak(text_speak)

        // this function runs when text_speak stop speaking... 
        text_speak.onend = function () {
            setSpeaking(false);
            setResponse(false);
        }
    }

    async function aiResponse(prompt) {
        const aiAnswer = await main(prompt)
        const astricRemovedResponse = aiAnswer.split("**") && aiAnswer.split("*")
        const newString = astricRemovedResponse[0]
            .replace(/Google/gi, "Abhishek Chavhan")
            .replace(/bada bhasha model/gi, "Nexa")
            .replace(/large language model/gi, "Nexa")

        setPrompt(newString)
        speak(newString)
        setResponse(true)
    }

    // 
    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult = async (e) => {
        const transcript = e.results[0][0].transcript
        setPrompt(transcript)
        const promptFormat = 'You are a helpful voice assistant. Keep all your answers in 2 lines, and use english for writing and to the point. Now answer this: ' + transcript
        takeCommand(transcript.toLowerCase())
    }

    // Open youtube 
    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank")
            speak("opening Youtube...")
            setPrompt("opening Youtube")
        } else if (command.includes("open") && command.includes("gemini")) {
            window.open("https://gemini.google.com/app")
            speak("opening Gemini...")
            setPrompt("opening Gemini...")
        } else if (command.includes("open") && command.includes("chat gpt")) {
            window.open("https://chatgpt.com/")
            speak("opening chatgpt...")
            setPrompt("opening chatgpt...")
        } else if (command.includes("open") && command.includes("notebook lm")) {
            window.open("https://notebooklm.google/")
            speak("opening notebook lm")
            setPrompt("opening notebook lm")
        }
        else {
            aiResponse(command)
        }
    }
    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setPrompt,
    }
    return (
        <div>
            <datacontext.Provider value={value}>
                {children}
            </datacontext.Provider>
        </div>
    )
}

export default UserContext
