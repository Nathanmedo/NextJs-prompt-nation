import axios from "axios";


export const fetchUserData = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3000/api/users/${id}/profile`);
        console.log(response.data.data);
        
        return response.data.data;
    }catch(error){
        return error.response.data.message;
        
        
    }
};

export const handleFollowUser = async(userId, currentUserId) =>{
  console.log(
    userId,
    currentUserId
  );
  
    try{
      const response = await axios.post(`http://localhost:3000/api/users/follow/${userId}`, {userId: userId, currentUserId: currentUserId});
      return response.data.isFollowing; 
    }catch(error){
      return error.response.data.isFollowing;
    }
  };
