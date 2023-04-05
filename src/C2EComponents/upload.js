import React, { useState, useRef } from 'react';
import axios from 'axios';

function UploadFile() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileinput = useRef();
  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append('uploadFile', event.target.files[0]);

    try {
      const response = await axios.post(
        'https://writer-dev.curriki.org/upload',
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
      // Download the file in the response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        style={{ display: 'none' }}
        onChange={(event) => {
          handleUpload(event);
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
