'use client'


import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';


const EditProfile = ({ProfileData, setShowEditProfile}) => {

    const [ profileChange, setProfileChange ] = useState(ProfileData);
    const [ submit, setSubmit ] = useState(false);
    const router = useRouter();
    const location = usePathname();
  console.log(location);
  

    console.log(profileChange);
    
    const handleUpdateProfileDetails = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.patch('/api/users', { 
          id: profileChange._id,
          username: profileChange.username,
          bio: profileChange.bio || '',
          skills: profileChange.skills || ''
        });
        toast(response.data.message);
        setSubmit(false);
        setShowEditProfile(false);
        router.push('/my-profile')
      }catch(error){
        toast(error.response.data.message);
      }finally{
        setSubmit(false);
      }
    };

  return (
    <div className="w-[90%] relative bg-white max-w-4xl mx-auto mt-10 p-8 rounded border border-gray-300 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Profile</h2>
      <button 
      className=" text-black opacity-60 hover:opacity-100 transition-opacity font-bold py-2 px-4 rounded absolute top-2 right-2" 
      onClick={() => setShowEditProfile(false)}>
        <FaXmark />
    </button>
      <form onSubmit={handleUpdateProfileDetails} >
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          {ProfileData.username ? (
            <input type="text" 
            value={profileChange.username}
            onChange={(e)=> setProfileChange({...profileChange, username: e.target.value})}
            name="username" 
            id="username" 
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
          ) : (
            <input type="text" 
            name="username" 
            id="username"
            onChange={(e)=> setProfileChange({...profileChange, username: e.target.value})} 
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="Enter your username" />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          {ProfileData.bio ? (
            <textarea 
            name="bio"
            value={profileChange.bio}
            onChange={(e)=>setProfileChange({...profileChange, bio: e.target.value})} 
            id="bio" 
            rows={3} 
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"></textarea>
          ) : (
            <textarea 
            name="bio"
            onChange={(e)=>setProfileChange({...profileChange, bio: e.target.value})} 
            id="bio" rows={3} 
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="Enter your bio"></textarea>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
          {ProfileData.skills ? (
            <textarea
              name="skills"
              id="skills"
              value={profileChange.skills}
              onChange={(e)=>setProfileChange({...profileChange, skills: e.target.value})}
              rows={3}
              className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
            </textarea>
          ) : (
            <textarea
              name="skills"
              id="skills"
              onChange={(e)=>setProfileChange({...profileChange, skills: e.target.value})}
              rows={3}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Enter your skills"></textarea>
          )}
        </div>
        <button 
        type="submit"
        disabled={submit ?? 'true'} 
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
