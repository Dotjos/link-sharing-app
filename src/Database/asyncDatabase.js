import { supabase } from "../Supabase";

export async function uploadfile({avatarFile,userEmail}){
    try {
    const { data, error } = await supabase
    .storage
    .from('profileImages')
    .upload(`Images/${userEmail}/profileImages.png`, avatarFile, {
    upsert: true
  })
   if(error) {
    throw new Error('Failed to upload file:' + error.message)
   }
   
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function replaceExistingFile({avatarFile,userEmail}){
    try {
        const { data, error } = await supabase
  .storage
  .from('profileImages')
  .update(`Images/${userEmail}/profileImages.png`, avatarFile, {
    upsert: true
  })
      if(error) throw new Error("Failed to update image:"+ error.message)
    } catch (error) {
        console.error(error)
        throw error
    }

}

export const fetchImageUrl = async (pathName) => {
    try {
      const { data, error } =  supabase.storage
        .from('profileImages')
        .getPublicUrl(`Images/${pathName}/profileImages.png`);

      if (error) {
        throw error;
      }
     const {publicUrl}=data  
      return publicUrl
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };