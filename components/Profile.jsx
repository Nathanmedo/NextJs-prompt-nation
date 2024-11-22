import { LoadingText } from "@styles/typeAnimations/Type";
import { toast, Toaster } from 'react-hot-toast'
import { handleFollowUser } from "@app/api/helperFunctions/Helper";
import PromptCard from "./PromptCard";
import Image from "next/image";
import { FaPencil } from 'react-icons/fa6'


const Profile = ({
  type, 
  desc,
  ProfileData, 
  isCurrentUser, 
  isFollowing,
  setShowEditProfile,
  currentId,
  prompts,
  openTabAnimation
}) => {

  console.log(ProfileData, currentId);
  

  return (
    <>
      <section className="w-full max-w-4xl mx-auto mt-32 p-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{type} Profile</h2>
          <div className="w-40 h-40 rounded-full mb-6 relative">
            <Image
              src={ProfileData?.image}
              alt={`Profile picture of ${ProfileData?.username}`}
              width={160}
              height={160}
              objectFit="cover"
            />
          <button 
            className="bg-black grid place-items-center rounded-full bg-opacity-75 backdrop-blur-md  text-white font-bold h-[40px] w-[40px] absolute bottom-2 right-2">
            <FaPencil />
          </button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {ProfileData?.username || <LoadingText/>}
          </h1>
      
          <p className="text-gray-600 mb-6">
            {ProfileData?.email || <LoadingText/>}
          </p>
          <div className="flex gap-8 mb-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold">{prompts?.length}</p>
            <p className="text-sm md:text-base text-gray-600">Prompts</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold">{ProfileData?.followers?.length}</p>
            <p className="text-sm md:text-base text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold">{ProfileData?.following?.length}</p>
            <p className="text-sm md:text-base text-gray-600">Following</p>
          </div>
          </div>
          {ProfileData?._id == currentId && (
            <button
            onClick={()=>{
              setShowEditProfile(true),
              openTabAnimation('edit_profile_tab')
            }} 
            className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${!ProfileData?.username && 'opacity-50 cursor-not-allowed'}`}
            disabled={!ProfileData?.username}>
              Edit Profile
            </button>
          )}
          {!(ProfileData?._id == currentId) && (
            <div>
                { isFollowing == null ?
                (<button
      
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Loading...
                </button>):
                  isFollowing ?
                (<button
                onClick={()=>handleFollowUser(ProfileData._id, currentId)}
                className="bg-black bg-opacity-50 text-white font-bold py-2 px-4 rounded"
                >
                  Unfollow
                </button>):
                (
                  <button
                onClick={()=>handleFollowUser(ProfileData._id, currentId)}
                className=" bg-neonPrimary hover:bg-neonSecondary text-white font-bold py-2 px-4 rounded w-full"
                >
                  Follow
                </button>
                )
              }
            </div>
          )}
          <div className="w-full max-w-2xl mt-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Bio</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {ProfileData?.bio || 'No bio yet...'}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {ProfileData?.skills || 'No skills listed...'}
              </p>
            </div>
          </div>
        </div>
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Prompts</h2>
        <p className="text-sm text-gray-600 mb-2">{desc}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {prompts?.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} isCurrentUser={isCurrentUser} isProfileData={ProfileData}/>
          ))}
        </div>
        {prompts?.length === 0 && (
          <p className="text-lg text-gray-500 italic mt-4">No prompts yet...</p>
        )}
      </div>
      </section>
    </>
    
  )
};

export default Profile;