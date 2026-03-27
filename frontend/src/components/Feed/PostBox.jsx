import { useState } from "react";
import axios from "../../api/axiosInstance";
import { users } from "../../assets/dummyData";

const currentUser = users[0];

const PostBox = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // REMOVE IMAGE
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // SUBMIT POST
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await axios.post("/posts", formData);
      onPostCreated();
      // RESET
      setContent("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow">
      {/* TOP */}
      <div className="flex items-center gap-3">
        <img src={currentUser.avatar} className="w-10 h-10 rounded-full" />

        <input
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-white dark:bg-[#2a2a2a] px-4 py-2 rounded-full outline-none text-sm"
        />
      </div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="mt-4 relative">
          <img
            src={preview}
            className="rounded-xl max-h-60 object-cover w-full"
          />

          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/50 text-white px-2 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer text-blue-500 text-sm">
          📷 Photo
          <input type="file" hidden onChange={handleImageChange} />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm active:scale-95 transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostBox;
