import React, { useState, useRef } from 'react';
import axios from 'axios';

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileinput = useRef();
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://dev.currikistudio.org:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFileSelect(e);
          handleUpload();
        }}
        ref={fileinput}
        type="file"
      />
      <button
        onClick={() => {
          fileinput.current.click();
        }}
      >
        Choose File
      </button>
      {uploadProgress > 0 && <div>Progress: {uploadProgress}%</div>}
    </div>
  );
}

export default UploadFile;
