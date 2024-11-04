import React, { useEffect } from 'react'
import { FaPaperPlane, FaPencilAlt } from 'react-icons/fa';


const Form = ({
    type,
    submit,
    setSubmit,
    promptPost,
    setPromptPost,
    handleCreatePrompt
}) => {

  return (
    <section className='mt-32 h-screen lg:w-[50vw] w-screen box-border'>
      <div className='mx-4 lg:mx-10'>
        <h1 className='text-3xl lg:text-5xl'> {type} Post</h1>
      <p className='mt-5 lg:text-lg text-gray-600 text-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform. 
        This platform helps you discover, create, and share creative AI prompts that can enhance your AI interactions.
      </p>
      <FormField
        type={type}
        submit={submit}
        setSubmit={setSubmit}
        promptPost={promptPost}
        setPromptPost={setPromptPost}
        handleCreatePrompt={handleCreatePrompt}
      />
      </div>
    </section>

  )
}

const FormField = ({
  type,
  error,
  submit,
  setSubmit,
  promptPost,
  setPromptPost,
  handleCreatePrompt
}) => {

  let currentIndex = 0;
  useEffect(()=>{
    const promptField = document.getElementById('prompt_field');
  console.log(promptField);
  let promptInterval;
  const changePromptFieldPlaceholder = () =>{
    const placeholders = [
            "Write your prompt here",
            "Share your creative AI ideas...", 
            "What's your next AI adventure?",
            "Create something amazing...",
            "Let your imagination flow..."
          ];
  clearInterval(promptInterval)

  promptInterval = setInterval(()=>{
    console.log('changing prompt');
    
    if(currentIndex === placeholders.length){
      currentIndex = 0;
    }
    promptField.placeholder = placeholders[currentIndex]
    currentIndex++;
  }, 10000);

  }
  changePromptFieldPlaceholder();
  }, [promptPost])



  return (
    <form onSubmit={handleCreatePrompt}>
      <p  className='font-bold my-5'>Your AI prompt</p>
      {error && <p className={`text-red-500 text-sm capitalize`}>*{error}</p>}
      <textarea
        value={promptPost.prompt}
        id='prompt_field'
        onChange={(e) => setPromptPost({ ...promptPost, prompt: e.target.value })}
        placeholder="Write your prompt here"
        className="w-full min-h-[200px] max-h-[500px] p-4 text-lg bg-white border border-gray-300 rounded-lg resize-y"
        style={{ height: 'auto' }}
        onInput={(e) => {
          e.target.style.height = '200px';
          e.target.style.height = `${Math.min(e.target.scrollHeight, 500)}px`;
        }}
      />
      <p className='font-bold my-5'>Your tag</p>
      <input
        type="text"
        value={promptPost.tag}
        onChange={(e) => setPromptPost({ ...promptPost, tag: e.target.value })}
        placeholder="Enter tags separated by commas (e.g. #ai, #coding, #tech)"
        className="w-full p-4 text-lg bg-white border border-gray-300 rounded-lg"
      />
      <div className="flex flex-wrap gap-4 mt-5 lg:justify-end justify-start">
        <button
          type="submit"
          className="px-5 py-2 text-lg bg-black flex items-center gap-1 text-white rounded-lg hover:opacity-80 transition-opacity"
          onClick={() => setSubmit(true)}
        >
          <FaPaperPlane />
          {submit ? `${type}ing post...` : `${type} Post`}
        </button>
        <button
          type="submit" 
          className="px-5 py-2 text-lg border border-black rounded-lg flex items-center gap-1 hover:bg-black hover:text-white transition-colors"
          onClick={() => setSubmit(false)}
        >
          Cancel Post
        </button>
      </div>
      
    </form>
  )
}

export default Form;