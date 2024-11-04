'use client'

import React, { useState } from 'react'
import Form from '@components/Form'
import axios, { Axios } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreatePrompt = () => {
  const { data: session }= useSession();
  const router = useRouter();
  console.log(session?.user._id);
  console.log(process.env.MONGODB_URI);
  

    const [ submit, setSubmit ] = useState(false);
    const [error, setError] = useState(null);

    const [ promptPost, setPromptPost ] = useState({
      prompt: '',
      tag: ''
    });

    console.log(promptPost);
    

    async function handleCreatePrompt(e){
        e.preventDefault();

        try{
          const response = await axios.post('/api/prompt/new', {...promptPost, creator: session?.user.id});
          if(!response.ok){
            throw new Error('Failed to create prompt');
          }
          if(response.status === 201){
            setPromptPost({});
            setSubmit(false);
            setError(null)
            router.push('/');
          }
        }catch(error){
          setError(error);
        }finally{
          setSubmit(false);
        }
    }

  return (
    <Form
    type="Create"
    error={error}
    submit={submit}
    setSubmit={setSubmit}
    promptPost={promptPost}
    setPromptPost={setPromptPost}
    handleCreatePrompt={handleCreatePrompt} 
    />
  )
}

export default CreatePrompt;