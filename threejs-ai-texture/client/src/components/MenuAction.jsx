import { useState } from "react";
import { AiIcon, SaveIcon, PreloadSVG } from "./Svgs"
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const saveCanvasAsImage = () => {
    const canvas = document.querySelector("canvas");
    const dataURL = canvas.toDataURL("");
    const link = document.createElement("a");

    link.href = dataURL;
    link.download = "canvas.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function MenuAction({ setAiTexture }) {

    const [isAskModal, setAskModal] = useState(false)
    const [isThinking, setIsThinking] = useState(false)
    const [input, setInput] = useState("")

    const callOpenaiAPI = async () => {
        try {
            const response = await openai.createImage({
                prompt: input,
                n: 1,
                size: "1024x1024",
                response_format: 'b64_json'
            });

            const image = response.data.data[0].b64_json;

            setAiTexture(`data:image/png;base64,${image}`)

            setInput("")
            setIsThinking(false)
            setAskModal(false)
        }
        catch (error) {
            setIsThinking(false)
            console.log(error)
        }
    }

    const onSubmitAction = () => {
        if (!input) return;
        setIsThinking(true)
        callOpenaiAPI();
    }

    return (
        <>
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="relative flex p-4 justify-around items-center w-[200px] bg-white h-[80px] rounded-lg drop-shadow-lg bg-opacity-70">
                    <button
                        className="group w-full h-full"
                        onClick={() => setAskModal(true)}
                    >
                        <AiIcon />
                    </button>
                    <button className="group w-full h-full" onClick={() => saveCanvasAsImage()}>
                        <SaveIcon />
                    </button>
                </div>
            </div >

            {isAskModal &&
                <div className="fixed overflow-hidden w-full h-full left-0 top-0 bg-pink-600 bg-opacity-70 flex justify-center items-center">
                    {isThinking ?
                        <PreloadSVG />
                        :
                        <div className="relative w-[600px] h-[300px] bg-white rounded-xl p-4">
                            <h3 className="font-bold text-3xl">ASK AI FOR TEXTURE</h3>

                            <button
                                className="px-3 absolute right-2 top-2 text-xl text-white bg-pink-600 border-2 border-pink-600 rounded-md transition-colors hover:bg-white hover:text-pink-600"
                                onClick={() => setAskModal(false)}
                            >
                                X
                            </button>

                            <textarea
                                className="w-full border-2 h-[180px] outline-none"
                                placeholder="Type something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.shiftKey === false) {
                                        e.preventDefault()
                                        input && onSubmitAction()
                                    }
                                }}
                            ></textarea>

                            <button
                                className="px-8 py-2 mt-2 text-xl font-bold text-white bg-pink-600 border-2 border-pink-600 rounded-lg block mx-auto hover:bg-white hover:text-pink-600"
                                onClick={() => onSubmitAction()}
                            >
                                ASK AI
                            </button>
                        </div>
                    }
                </div>
            }

        </>
    )
}

export default MenuAction