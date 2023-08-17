import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import fileDownload from 'js-file-download';
import h5p from '../assets/images/assig2.png';
import epub from '../assets/images/assig1.png';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
function UploadFile({ setUploadProgress,getData }) {
  const fileinput = useRef();
  const [startConversion, setStartConversion] = useState(false);
  const [show, setShow] = useState(false);
  const [epubmeta, setEpubData] = useState();
  const url = 'https://c2e-provider-api.curriki.org';
  const handleUpload = async (event) => {
    const formData = new FormData();

    formData.append('ebook', event.target.files[0]);
    if (epubmeta) {
      setShow(false);
      const response = await axios.post(
        url + '/c2e-media/create-epubs',
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
          //  responseType: 'blob',
        }
      );

      setStartConversion(false);
      if(getData) {
        getData()
      }
      // // Download the file in the response
      // //fileDownload(response.data,`${event.target.files[0].name.split('.')[0]}.zip`)
      // fileDownload(
      //   response.data,
      //   event.target.files[0].name.replace('.epub', '.c2e')
      // );
    } else {
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
    }
  };
  const selectSelection = (type) => {
    if (type === 'h5p') {
      fileinput.current.click();
    } else {
      setEpubData(true);
      fileinput.current.click();
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
            //fileinput.current.click();
            setShow(true);
          }}
        >
          Choose File
        </button>
      </div>
      {startConversion && (
        <div className="big-loader">
          <h4>Converting Your Upload Into C2E</h4>
          <p>please wait, it might took some time ...</p>
          <div className="flex">
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
          </div>
        </div>
      )}

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {false ? (
            <Formik
              initialValues={{
                title: '',
                description: '',
                name: '',
                email: '',
                url: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = 'Required';
                }
                if (!values.description) {
                  errors.description = 'Required';
                }
                if (!values.name) {
                  errors.name = 'Required';
                }
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                fileinput.current.click();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                    {errors.title && touched.title && errors.title}
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    ></textarea>
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </div>

                  <h2>C2E Licensee Information</h2>

                  <div class="form-group">
                    <label for="licensee_name">Name:</label>
                    <input
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      type="text"
                    />
                    {errors.name && touched.name && errors.name}
                  </div>
                  <div class="form-group">
                    <label for="licensee_email">Email:</label>
                    <input
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="email"
                    />
                    {errors.email && touched.email && errors.email}
                  </div>
                  <div class="form-group">
                    <label for="licensee_url">URL:</label>
                    <input
                      name="url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url}
                      type="url"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Upload
                  </button>
                </form>
              )}
            </Formik>
          ) : (
            <div className="selection-box">
              <div
                className="box"
                onClick={() => {
                  selectSelection('h5p');
                }}
              >
                <img src={h5p} alt="" />
              </div>
              <div
                className="box"
                onClick={() => {
                  selectSelection('epub');
                }}
              >
                <img src={epub} alt="" />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UploadFile;
