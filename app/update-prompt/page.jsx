'use client'

import React from 'react'
import Form from '@components/Form';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const UpdatePrompt = () => {
    const [submit, setSubmit] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [ promptPost, setPromptPost ] = useState({
        prompt: '',
        tag: ''
    });

    const router = useRouter()

    //get the id from the querystring.
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    console.log(searchParams);
    
    

    

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
    }, [id]);

    //handle the prompt update
    const handleEditPrompt = async (e) =>{
        e.preventDefault();
        try{
            console.log(promptPost);
            const response = await axios.patch(`/api/prompt/${id}`, {prompt: promptPost.prompt, tag: promptPost.tag})
            router.push('/my-profile');
            toast(response.data.message);
        }catch(error){
            toast(error.response.data.message);
        }finally{
            setSubmit(false)
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
