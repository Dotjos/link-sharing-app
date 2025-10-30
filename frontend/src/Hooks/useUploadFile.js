import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "./asyncDatabase";
import toast from "react-hot-toast";

export function useUploadFile() {
  const queryClient = useQueryClient();

  const { mutateAsync: uploadImage, status: uploadStatus } = useMutation({
    mutationFn: (imageFile) => uploadFile(imageFile),

    onSuccess: (data) => {
      toast.success("Image successfully saved");

      // ✅ Update both the local query cache & Redux shape if needed
      queryClient.setQueryData(["userData"], (oldData) => {
        if (!oldData) return oldData;

        // Update nested user property safely
        return {
          ...oldData,
          user: {
            ...oldData.user,
            profileImage: data?.imageUrl,
          },
        };
      });

      // Optional: still invalidate to ensure backend consistency
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to save Image");
    },
  });

  return { uploadImage, uploadStatus };
}
