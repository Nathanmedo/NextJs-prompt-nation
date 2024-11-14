'use client';


import React, { Children, useEffect, useState, useTransition } from 'react';
import PromptCard from './PromptCard';


export const PromptCardList = ({data, handleTagClick}) =>{
  return (
    <>
    {data.map((prompt) => (
      <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick}/>
    ))}
    </>
  )
}


const Feed = () => {
   
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isPending, startTransition] = useTransition(false);


  const handleSearchChange = (e) =>{

  }

  useEffect(()=>{

    async function fetchPrompts(){
      try{
        const response = await fetch('/api/prompt', {next:{revalidate: 5}});
        const data = await response.json();
        setPrompts(data.Prompts);
      }catch(error){
        console.log(error);
      }
    }
    fetchPrompts();
  }, []);

  console.log(prompts);
  
  
  return (
    <section className='max-w-4xl mx-auto md:auto-rows-[20rem]'>
        <div>
          <h1 className='text-2xl font-bold text-center'>The Community Showcase</h1>
          <p className='text-center text-lg text-gray-500'>Browse through a collection of imaginative and visually stunning prompts</p>
          <div className='mt-10'>
          <PromptCardList data={prompts} handleTagClick={() => {}}/>
          </div>
        </div>
    </section>
  )
}

export default Feed;
