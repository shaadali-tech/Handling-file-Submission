import { useState } from "react";
import axios from "axios";

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
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

      setStatus("File uploaded successfully ✅");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>File Upload 📁</h2>

      <form onSubmit={handleSubmit}>
        {/* File Input */}
        <input type="file" onChange={handleFileChange} />

        <br />
        <br />

        {/* Preview */}
        {file && (
          <div>
            <p>Preview:</p>
            <img src={URL.createObjectURL(file)} alt="preview" width="150" />
          </div>
        )}

        <br />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Status Message */}
      <p>{status}</p>
    </div>
  );
}

export default FileUploadForm;
