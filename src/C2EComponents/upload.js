import React, { useState, useRef } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import loader from '../assets/images/loader.png';
import { Spinner } from 'react-bootstrap';
function UploadFile({ setUploadProgress }) {
  const fileinput = useRef();
  const [startConversion, setStartConversion] = useState(false);
  const handleUpload = async (event) => {
    const formData = new FormData();
    console.log(event.target.files[0]);
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
            console.log(percentCompleted);
            if (percentCompleted === 100) {
              setStartConversion(true);
            }
          },
          responseType: 'blob',
        }
      );
      setStartConversion(false);
      // Download the file in the response
      //fileDownload(response.data,`${event.target.files[0].name.split('.')[0]}.zip`)
      fileDownload(
        response.data,
        event.target.files[0].name.replace('.zip', '.c2e')
      );
      // const url = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/octet-stream' }));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `${event.target.files[0].name.split('.')[0]}.zip`);
      // document.body.appendChild(link);
      // link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
      </div>
      {startConversion && (
        <div className="big-loader">
          <h4>Coverting Your Upload Into C2E</h4>
          <p>please wait, it might took some time ...</p>
          <div className="flex">
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
          </div>
        </div>
      )}
    </>
  );
}

export default UploadFile;
