'use client'

import React, { useState } from 'react'
import Form from '@components/Form'

const CreatePrompt = () => {
    const [ submit, setSubmit ] = useState(false);

    const [ promptPost, setPromptPost ] = useState({
        prompt: '',
        tag: ''
    });

    async function handleCreatePrompt(e){
        e.preventDefault();
    }

  return (
    <Form
    submit={submit}
    promptPost={promptPost}
    setPromptPost={setPromptPost}
    handleCreatePrompt={handleCreatePrompt} 
    />
  )
}

export default CreatePrompt;