'use client'

import React from 'react'
import Form from '@components/Form';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePrompt = () => {
    const [submit, setSubmit] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [ promptPost, setPromptPost ] = useState({
        prompt: '',
        tag: ''
    });
    const { id } = useSearchParams();
    useEffect(()=>{
        async function fetchPromptData(){
            try{
                const response = await axios.get(`/api/prompt/${id}`);
                setPromptPost(response.data.data)
            }catch(error){
                setFetchError(error.response.data.message);
            }finally{
                setSubmit(false);
            }
        }
    })
    const handleEditPrompt = async () =>{

    }
  return (
    <>
    <Form
    type="Edit"
    fetchError={fetchError}
    submit={submit}
    setSubmit={setSubmit}
    promptPost={promptPost}
    setPromptPost={setPromptPost}
    handleCreatePrompt={handleEditPrompt} 
    />
    </>
  )
};

export default UpdatePrompt
