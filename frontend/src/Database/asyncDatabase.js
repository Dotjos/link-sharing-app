import supabase from "../Supabase"

export async function saveUserLinkData({ id, linkdetails }) {
    try {
      const { data, error } = await supabase
        .from('userdata')
        .upsert([{ id, linkdetails }])
        .select();
  
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    } catch (error) {
      console.error;
      throw error;
    }
  }
  
export async function saveUserData({ id, first_name, last_name,email }) {
    try {
        const { data, error } = await supabase
            .from('userdata')
            .upsert(
                [
                    { id, first_name, last_name,email }
                ],
                { onConflict: ['id'], update: ['first_name', 'last_name'] }
            )
            .select();
        if (error) {
            throw new Error(`Unable to update row: ${error.message}`);
        }
        
        console.log(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
  
export async function fetchUserData(userId) {
  // Implementation to fetch user data from Supabase based on userId
  // Example:
  try {
    const { data, error } = await supabase.from('userdata').select('*').eq('id', userId).single();
  if (error) {
    throw new Error(`Failed to fetch user data ${error.message}`);
  }
  return data;
  } catch (error) {
    console.error(error)
    throw error
  } 
}

export async function uploadFile({id,avatarFile}){
  const storage = supabase.storage.from('profileImages');
    await storage.upload(`${id}/profileImages.png`, avatarFile);
}

export async function updateFile({id,avatarFile}){
  const storage = supabase.storage.from('profileImages');
  await storage.update(`${id}/profileImages.png`, avatarFile);
}

export const fetchImageUrl = async (pathName) => {
    try {
      const { data, error } =  supabase.storage
        .from('profileImages')
        .getPublicUrl(`${pathName}/profileImages.png`);

      if (error) {
        throw error;
      }    
      const publicUrl=data.publicUrl  
     return publicUrl
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };
