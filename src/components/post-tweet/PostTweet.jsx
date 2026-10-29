import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTweet, editTweet } from "../../store/tweetSlice";
import databaseService from "../../appwrite/database";
import storageService from "../../appwrite/storage";
import Button from "./../Button";
import { Image, X } from "lucide-react";

function PostTweet({ tweet }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      content: tweet?.content || "",
      status: tweet?.status || "active",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imagePreview, setImagePreview] = useState(
    tweet && tweet.featuredImage
      ? storageService.getFilePreview(tweet.featuredImage)
      : null,
  );

  const contentValue = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });
  const charCount = contentValue.length;
  // const contentValue = useWatch({
  //     control,
  //     name: "content",
  //     defaultValue: "",
  // });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  const submitTweet = async (data) => {
    try {
      // ---------------- EDIT MODE ----------------
      if (tweet) {
        let fileId = tweet.featuredImage;

        // If user selected a new image file
        if (data.image && data.image[0]) {
          const file = await storageService.uploadFile(data.image[0]);
          if (file) {
            if (tweet.featuredImage) {
              await storageService.deleteFile(tweet.featuredImage);
            }
            fileId = file.$id;
          }
        }

        const updatedDbTweet = await databaseService.updateTweet(tweet.$id, {
          content: data.content,
          featuredImage: fileId,
          status: data.status || "active",
        });

        if (updatedDbTweet) {
          dispatch(editTweet(updatedDbTweet));
          navigate("/");
        }
      }
      // ---------------- CREATE MODE ----------------
      else {
        let fileId = null;

        if (data.image && data.image.length > 0) {
            const file = await storageService.uploadFile(data.image[0]);
            if (file) {
                fileId = file.$id;
            }
        }

        const newDbTweet = await databaseService.createTweet({
            content: data.content,
            featuredImage: fileId,
            status: data.status || "active",
            userId: userData?.$id || "anonymous",
        });

        if (newDbTweet) {
          dispatch(addTweet(newDbTweet));
          reset();
          setImagePreview(null);
        }
      }
    } catch (error) {
      console.log("PostTweet :: submitTweet :: error", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitTweet)}
      className="border-b border-slate-800 p-4 bg-black text-white">
      <div className="flex gap-3">
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sky-400 shrink-0">
          {userData?.name ? userData.name[0].toUpperCase() : "U"}
        </div>

        <div className="flex-1">
          {/* Tweet Content Textarea */}
          <textarea
            placeholder="What is happening?!"
            rows={3}
            maxLength={280}
            className="w-full bg-transparent text-lg text-white placeholder-slate-500 outline-none resize-none"
            {...register("content", { required: true })}
          />

          {/* Image Attachment Preview */}
          {imagePreview && (
            <div className="relative mb-3 rounded-2xl overflow-hidden border border-slate-800 max-h-60">
              <img
                src={imagePreview}
                alt="Attachment Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Form Toolbar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-900">
            <div className="flex items-center gap-3">
              {/* File Upload Button */}
              <label className="p-2 hover:bg-sky-500/10 text-sky-400 rounded-full cursor-pointer transition-colors">
                <Image className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", { onChange: handleImageChange })}
                />
              </label>

              {/* Live Character Counter */}
              <span
                className={`text-xs ${
                  charCount > 250 ? "text-amber-500" : "text-slate-500"
                }`}>
                {charCount}/280
              </span>
            </div>

            {/* Post/Update Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !contentValue.trim()}
              className="bg-sky-500 hover:bg-sky-600 px-5 py-1.5 text-sm font-bold">
              {isSubmitting ? "Saving..." : tweet ? "Update" : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostTweet;
