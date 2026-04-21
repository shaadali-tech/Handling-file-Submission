import { useState } from "react";
import axios from "axios";

const AvatarUploadForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus("Uploading...");

      const res = await axios.post("https://httpbin.org/post", formData);

      console.log("Upload result:", res.data);

      setStatus("File uploaded successfully ");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Welcome to Avatar Upload Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        {file && (
          <div>
            <p>Preview:</p>
            <img src={URL.createObjectURL(file)} alt="preview" width="150" />
          </div>
        )}

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <p>{status}</p>
    </>
  );
};

export default AvatarUploadForm;
