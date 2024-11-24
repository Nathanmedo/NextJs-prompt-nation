'use client'

import React from 'react'
import Form from '@components/Form';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const UpdatePrompt = () => {
    const [submit, setSubmit] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [ promptPost, setPromptPost ] = useState({
        prompt: '',
        tag: ''
    });

    //get the id from the querystring.
    const { id } = useSearchParams();

    useEffect(()=>{
        async function fetchPromptData(){
            try{
                const response = await axios.get(`/api/prompt/${id}`);
                setPromptPost(response.data.data);
            }catch(error){
                setFetchError(error.response.data.message);
            }finally{
                setSubmit(false);
            }
        }
        fetchPromptData();
    });
    const handleEditPrompt = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.patch(`http://localhost:3000/api/prompt/${id}`, promptPost);
            console.log(response.data);
            
        }catch(error){
            toast(error.response.data.message);
        }
    };
    
  return (
    <>
    <Toaster />
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

export default UpdatePrompt;
