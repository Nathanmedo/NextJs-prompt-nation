'use client'

import React, { useState } from 'react'
import Form from '@components/Form'
import axios, { Axios } from 'axios';
import { useRouter } from 'next/navigation';
import SessionData from '@app/api/getSession/SessionData';

const CreatePrompt = () => {
  const session = SessionData();
  const router = useRouter();

    const [ submit, setSubmit ] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const [ promptPost, setPromptPost ] = useState({
      prompt: '',
      tag: ''
    });
    

    async function handleCreatePrompt(e){
        e.preventDefault();
        
        try{
          if(session?.user?.id){
            const response = await axios.post('api/prompt/new', {...promptPost, creator: session?.user.id});
            setPromptPost({
              prompt: '',
              tag: ''
            });
            setSubmit(false);
            setFetchError(null);
          }
          router.push('/prompts');
        }catch(error){
          setFetchError(error?.response?.statusText);
        }finally{
          setSubmit(false);
        }
    }

  return (
    <Form
    type="Create"
    fetchError={fetchError}
    submit={submit}
    setSubmit={setSubmit}
    promptPost={promptPost}
    setPromptPost={setPromptPost}
    handleCreatePrompt={handleCreatePrompt} 
    />
  )
}

export default CreatePrompt;