'use client';


import React, { Children, useEffect, useState, useTransition } from 'react';
import PromptCard from './PromptCard';


export const PromptCardList = ({data,
   filterPrompts, 
   handleTagClick, 
   setSearchText,
   setSearchResults
  }) =>{
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((prompt) => (
        <div className="mb-6">
          <PromptCard key={prompt?._id}
           prompt={prompt}
           setSearchResults={setSearchResults}
           filterPrompts={filterPrompts}
          handleTagClick={handleTagClick}
          setSearchText={setSearchText} />
        </div>
      ))}
    </div>
    </>
  )
}


const Feed = () => {
   
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const[ searchResults, setSearchResults ] = useState(prompts)
  const [isPending, startTransition] = useTransition(false);

let searchTimeout;

const filterPrompts = (searchtext) =>{
  clearTimeout(searchTimeout)

    const searchresult = prompts.filter( p => (
      p.prompt?.toLowerCase().includes(searchtext.toLowerCase()) ||
      p?.creator?.username?.toLowerCase().includes(searchtext.toLowerCase()) ||
      p.tag?.toLowerCase().includes(searchtext.toLowerCase())
    ));
    console.log(searchresult);
    
    return searchresult;

};



const handleSearchChange = (e) =>{
  clearTimeout(searchTimeout);
  //make the searchText case insensitive with 'i
    setSearchText(e.target.value);
    searchTimeout = setTimeout(()=>{
      startTransition(()=>{
        const searchresult = filterPrompts(e.target.value);
        setSearchResults(searchresult)
      }, 500) 
    })  
  }
  console.log(searchResults);
  
  useEffect(()=>{

    async function fetchPrompts(){
      try{
        const response = await fetch('/api/prompt', {next:{revalidate: 5}});
        const data = await response.json();
        setPrompts(data.Prompts);
        setSearchResults(data.Prompts)
      }catch(error){
        console.log(error);
      }
    }
    fetchPrompts();
  }, []);

  console.log(prompts);
  
  
  return (
    <section className=' md:auto-rows-[20rem]'>
        <div>
          <h1 className='text-2xl font-bold text-center'>The Community Showcase</h1>
          <p className='text-center text-lg text-gray-500'>Browse through a collection of imaginative and visually stunning prompts</p>
          <div className='mt-6 flex justify-center'>
            <input 
              type='text'
              value={searchText} 
              placeholder='Search the prompt of your interest' 
              className='w-full mx-4 lg:mx-10 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-neonSecondary'
              onChange={(e)=>handleSearchChange(e)}
            />
          </div>
          <div className='mt-12 lg:mx-10 mx-4 max-w-[100%] flex justify-center'>
          <PromptCardList 
          isPending={isPending}
          filterPrompts={filterPrompts}
          data={searchResults}
          handleTagClick={() => {}}
          setSearchResults={setSearchResults}
          setSearchText={setSearchText}/>
          </div>
        </div>
    </section>
  )
}

export default Feed;
