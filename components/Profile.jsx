import { LoadingText } from "@styles/typeAnimations/Type";
import { toast, Toaster } from 'react-hot-toast'
import { handleFollowUser } from "@app/api/helperFunctions/Helper";


const Profile = ({type, ProfileData, isCurrentUser, isFollowing, currentId}) => {

  console.log(ProfileData, currentId);
  
  

  return (
    <section className="w-full max-w-4xl mx-auto mt-32 p-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{type} Profile</h2>
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
          <img 
            src={ProfileData?.image} 
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold mb-2">
          {ProfileData?.username || <LoadingText/>}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {ProfileData?.email || <LoadingText/>}
        </p>

        <div className="flex gap-8 mb-8">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold">0</p>
          <p className="text-sm md:text-base text-gray-600">Prompts</p>
        </div>
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold">0</p>
          <p className="text-sm md:text-base text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold">0</p>
          <p className="text-sm md:text-base text-gray-600">Following</p>
        </div>
        </div>
        {isCurrentUser && (
          <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        )} 
        {!isCurrentUser && (
          <div>
              { isFollowing ? 
              (<button
                onClick={handleUnfollowUser} 
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded">
                unfollow
              </button>):
              (<button
              onClick={()=>handleFollowUser(ProfileData._id, currentId)}
              className="bg-neonPrimary hover:bg-neonSecondary text-white font-bold py-2 px-4 rounded"
              >
                follow
              </button>)
            }
          </div>
        )}


        <div className="w-full max-w-2xl">
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
    </section>
    
  )
};

export default Profile;