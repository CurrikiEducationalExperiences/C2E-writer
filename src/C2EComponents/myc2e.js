import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Web3Auth } from "@web3auth/modal";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "react-bootstrap/Modal";
import upload from "../assets/images/upload (1).svg";
import Header from "./header";
import UploadFile from "./upload";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import { Formik } from "formik";

import FileIcon from "../assets/images/file.svg";
import FileIconBlack from "../assets/images/file-black.svg";
import ListingIcon from "../assets/images/listing.svg";
import AddIcon from "../assets/images/add.svg";
import ListingWhite from "../assets/images/listing-white.svg";
import AddWhite from "../assets/images/add-white.svg";
import h5p from "../assets/images/woo.png";
import epub from "../assets/images/amazon.png";

const Myc2e = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [web3auth, setWeb3auth] = useState(null);
  const [walletConnection, setWalletConneciton] = useState(null);
  const [show, setShow] = useState();
  const [showListing, setShowListing] = useState();
  const [activEpub, setActivEpub] = useState();
  const [activeEpubUrl, setActiveEpubUrl] = useState();
  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.connect();
  };
  const [allData, setAllData] = useState();
  const url = "https://c2e-provider-api.curriki.org";
  const getData = () => {
    fetch(url + "/c2e-media").then((data) =>
      data.json().then((value) => {
        setAllData(value);
      }),
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      const web3auth = new Web3Auth({
        clientId:
          "BNW0_55WnZZSF6hjmoLGsx2d7NQ_KHuFQnsGOPUPjwWDJAAiT-9iBfu_TeLRkLH3NiKfao04OgEgeCS86JfSFeo",
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x1",
        },
      });
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
        console.log("connected to wallet", web3auth);

        const user = await web3auth.getUserInfo();
        setWalletConneciton(user);
        console.log(
          "🚀 ~ file: signup-web3auth.js:46 ~ getUserInfo ~ user:",
          user,
        );

        // web3auth.provider will be available here after user is connected
      });
      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });
      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setWalletConneciton(null);
      });

      setWeb3auth(web3auth);
      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          network: "testnet",
        },
      });
      web3auth.configureAdapter(openloginAdapter);

      await web3auth.initModal();
    })();
  }, []);

  return (
    <div className="reader-c2e">
      <Header web3auth={web3auth} walletConnection={walletConnection} />

      <div className="reader-main">
        {/*<div className="img-box">
            <img src={c2e} alt="logo" />
           </div>*/}

        {walletConnection ? (
          <div className="login-text text-detail">
            <h3>How does it work?</h3>
            <p>
              After you have licensed a C2E from a digital marketplace, you will
              receive an email with instructions on how to download it.
              <br />
              Once a copy is downloaded , please navigate to{" "}
              <a
                href="https://c2e-reader.curriki.org"
                target="_blank"
                rel="noreferrer"
              >
                C2E READER.
              </a>
            </p>
          </div>
        ) : (
          <div className="text-detail">
            <h5>Imagine a world…</h5>
            <p>
              … where access to high quality learning resources is equitable,
              affordable, and widely available. <br />
              <br /> … where digital content creators have access to resources
              and incentives to build quality interactive learning experiences,
              and marketplaces where they can get paid fairly for their efforts.
              <br /> <br /> … where the quality and appropriateness of digital
              educational content can be vetted before it enters a marketplace.
            </p>
          </div>
        )}
        <div className="uploadBox">
          <div className="box">
            <h1>Curriki Educational Experiences Writer</h1>
            {walletConnection && (
              <>
                <div className="iconbox">
                  <CircularProgressbarWithChildren value={uploadProgress}>
                    {!!uploadProgress ? (
                      uploadProgress + "%"
                    ) : (
                      <img src={upload} alt="" />
                    )}
                  </CircularProgressbarWithChildren>
                </div>
              </>
            )}

            {walletConnection ? (
              <p className="text">Upload a file from your local device</p>
            ) : (
              <p className="text text-space">Log In and Experience C2Es Now</p>
            )}
            {walletConnection ? (
              <UploadFile
                setUploadProgress={setUploadProgress}
                getData={getData}
              />
            ) : (
              // <form
              //   action="https://writer-dev.curriki.org/upload"
              //   method="post"
              //   enctype="multipart/form-data"
              // >
              //   File to be uploaded:{' '}
              //   <input type="file" name="uploadFile" id="" />
              //   <button type="submit">Upload</button>
              // </form>
              // <FileUploadDownload />
              <button onClick={() => login()}>LET’s GET STARTED!</button>
            )}
          </div>
        </div>
      </div>
      {walletConnection && (
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="profile"
            title={
              <div className="d-flex">
                <img src={FileIcon} alt="file" className="blue-file-icon" />
                <img
                  src={FileIconBlack}
                  alt="file"
                  className="black-file-icon"
                />
                Epub File
              </div>
            }
          >
            <Accordion defaultActiveKey="0">
              {allData
                ?.filter(
                  (data) => data.type === "epub" && data.parentId === null,
                )
                ?.map((value, counter) => {
                  return (
                    <Accordion.Item eventKey={String(counter)}>
                      <Accordion.Header>{value.title}</Accordion.Header>
                      <Accordion.Body>
                        {allData
                          ?.filter(
                            (data1) =>
                              data1.type === "epub" &&
                              data1.parentId === value.id,
                          )
                          ?.map((value1, counter1) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  padding: "10px 0px",
                                  alignItems: "center",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                <div>{value1.title}</div>
                                <div
                                  className=""
                                  style={{
                                    display: "flex",
                                    gap: "12px",
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      setShow(true);
                                      setActivEpub(value1);
                                    }}
                                    class="btn btn-primary sec-btn"
                                  >
                                   <img
                                      src={ListingIcon}
                                      alt="file"
                                      width={20}
                                      height={20}
                                      className="blue-listing-icon"
                                    />
                                    <img
                                      src={ListingWhite}
                                      alt="file"
                                      width={20}
                                      height={20}
                                      className="white-listing-icon"
                                    />
                                    Show Listing
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowListing(true);
                                      setActivEpub(value1);
                                    }}
                                    class="btn btn-primary sec-btn"
                                  >
                                    <img
                                      src={ListingIcon}
                                      alt="file"
                                      width={20}
                                      height={20}
                                      className="blue-listing-icon"
                                    />
                                    <img
                                      src={ListingWhite}
                                      alt="file"
                                      width={20}
                                      height={20}
                                      className="white-listing-icon"
                                    />
                                    Create Listing
                                  </button>
                                   <button
                                    onClick={() => {
                                      setShow(true);
                                      setActivEpub(value1);
                                    }}
                                    class="btn btn-primary sec-btn"
                                  >
                                    <img
                                      src={AddIcon}
                                      alt="file"
                                      width={14}
                                      height={14}
                                      className="blue-add-icon"
                                    />
                                    <img
                                      src={AddWhite}
                                      alt="file"
                                      width={14}
                                      height={14}
                                      className="white-add-icon"
                                    />
                                    Create C2E
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </Tab>
          <Tab
            eventKey="contact"
            title={
              <div className="d-flex">
                <img src={FileIcon} alt="file" className="blue-file-icon" />
                <img
                  src={FileIconBlack}
                  alt="file"
                  className="black-file-icon"
                />
                CurrikiStudio File
              </div>
            }
          >
            {allData
              ?.filter((data) => data.type !== "epub")
              ?.map((value) => {
                return <div>{value.title}</div>;
              })}
          </Tab>
        </Tabs>
      )}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Formik
            initialValues={{
              title: allData?.filter(
                (data) => data.id === activEpub?.parentId,
              )?.[0]?.title,
              // description: '',
              name: "",
              email: "",

              url: "https://twitter.com",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Required";
              }
              // if (!values.description) {
              //   errors.description = 'Required';
              // }
              if (!values.name) {
                errors.name = "Required";
              }

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setActiveEpubUrl();
              const response = await axios.post(
                url + "/c2e/cee-media",
                { ...values, ceeMediaId: activEpub?.id },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },

                  //  responseType: 'blob',
                },
              );
              if (response) {
                setActiveEpubUrl(response.data?.id);
              }
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
              <form onSubmit={handleSubmit} className="c2e-lisence">
                <h2>{activEpub?.title}</h2>
                <h3>C2E Licensee Information</h3>
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    display
                    readOnly
                  />
                  <div className="error">
                    {errors.title && touched.title && errors.title}
                  </div>
                </div>
                <div class="form-group">
                  <label for="licensee_name">Name:</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                  />
                  <div className="error">
                    {errors.name && touched.name && errors.name}
                  </div>
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
                  <div className="error">
                    {errors.email && touched.email && errors.email}
                  </div>
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
                <a
                  href={url + "/c2e-storage/c2eid-" + activeEpubUrl + ".c2e"}
                  download
                  title=""
                >
                  {activeEpubUrl}
                </a>
                <button
                  onClick={() => setShow(false)}
                  type="button"
                  class="btn btn-secondary"
                >
                  Close
                </button>{" "}
                &nbsp;
                <button type="submit" class="btn btn-primary">
                  {isSubmitting ? "Generating ...." : "Create C2E"}
                </button>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <LinstingModule
        showListing={showListing}
        setShowListing={setShowListing}
      />

      {/*<footer class="footer-all">
        <a
          rel="noreferrer"
          class="footer-link"
          href="https://www.curriki.org/terms-of-service/"
          target="_blank"
        >
          Terms of Use
        </a>
        <a
          rel="noreferrer"
          class="footer-link"
          href="https://www.curriki.org/privacy-policy/"
          target="_blank"
        >
          Privacy Policy
        </a>
        <a
          rel="noreferrer"
          class="footer-link"
          href="https://www.currikistudio.org/help/"
          target="_blank"
        >
          Help Center
        </a>
          </footer>*/}
    </div>
  );
};

export default Myc2e;

const LinstingModule = ({ showListing, setShowListing }) => {
  const [steps, setSteps] = useState(1);

  return (
    <Modal
      show={showListing}
      onHide={() => {
        setShowListing(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="right-aligned-modal"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <div className="list-steps">
          <div className="step">
            <h5 className="">Select</h5>
          </div>
          <div className={`step ${steps === 1 && "disable"}`}>
            <h5 className="">Describe</h5>
          </div>
          <div
            className={`step ${steps === 1 || steps === 2 ? "disable" : ""}`}
          >
            <h5 className="">Finish</h5>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="uploadBox modial-iner-box">
          {steps === 1 ? (
            <div className="">
              <div className="selection-box mb-5">
                <div className="box" onClick={() => {}}>
                  <img src={h5p} alt="" />
                </div>
                <div className="box" onClick={() => {}}>
                  <img src={epub} alt="" />
                </div>
              </div>
            </div>
          ) : steps === 2 ? (
            <div>
              <Formik
                initialValues={{
                  productName: "",
                  price: "",
                  quantity: "",
                  productDiscription: "",
                  size: "",
                  title: "",
                  name: "",
                  email: "",
                  url: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.productName) {
                    errors.productName = "Required";
                  }
                  if (!values.price) {
                    errors.price = "Required";
                  }
                  if (!values.productDiscription) {
                    errors.productDiscription = "Required";
                  }
                  if (!values.url) {
                    errors.url = "Required";
                  }
                  if (!values.quantity) {
                    errors.quantity = "Required";
                  }
                  if (!values.title) {
                    errors.title = "Required";
                  }
                  if (!values.size) {
                    errors.size = "Required";
                  }
                  if (!values.name) {
                    errors.name = "Required";
                  }
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email,
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    console.log("login", values);
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
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
                  <form onSubmit={handleSubmit} className="formik-box">
                    <h5>Owner Information</h5>
                    <div className="input-flex-box">
                      <div className="input-box">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                        />
                        <p className="error">
                          {errors.title && touched.title && errors.title}
                        </p>
                      </div>

                      <div className="input-box">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <p className="error">
                          {errors.name && touched.name && errors.name}
                        </p>
                      </div>
                    </div>

                    <div className="input-flex-box">
                      <div className="input-box">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <p className="error">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>

                      <div className="input-box">
                        <label>Publisher URL</label>
                        <input
                          type="text"
                          name="url"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.url}
                        />
                        <p className="error">
                          {errors.url && touched.url && errors.url}
                        </p>
                      </div>
                    </div>
                    {/*
                     */}
                    <h5>Store Information</h5>
                    <div className="input-flex-box">
                      <div className="input-box">
                        <label>Product Name</label>
                        <input
                          type="text"
                          name="productName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.productName}
                        />
                        <p className="error">
                          {errors.productName &&
                            touched.productName &&
                            errors.productName}
                        </p>
                      </div>

                      <div className="input-box">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                        />
                        <p className="error">
                          {errors.price && touched.price && errors.price}
                        </p>
                      </div>
                    </div>
                    <div className="input-flex-box">
                      <div className="input-box">
                        <label>Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                        />
                        <p className="error">
                          {errors.quantity &&
                            touched.quantity &&
                            errors.quantity}
                        </p>
                      </div>
                      <div className="input-box">
                        <label>Size</label>
                        <input
                          type="number"
                          name="size"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.size}
                        />
                        <p className="error">
                          {errors.size && touched.size && errors.size}
                        </p>
                      </div>
                    </div>
                    <div className="input-box">
                      <label>Product Description</label>
                      <textarea
                        type="text"
                        name="productDiscription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.productDiscription}
                      />
                      <p className="error">
                        {errors.productDiscription &&
                          touched.productDiscription &&
                          errors.productDiscription}
                      </p>
                    </div>
                    {steps === 2 && (
                      <div className="form-btn">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary "
                          onClick={() => {
                            if (
                              values.productName !== "" ||
                              values.price !== "" ||
                              values.quantity !== "" ||
                              values.productDiscription !== "" ||
                              values.size !== "" ||
                              values.title !== "" ||
                              values.name !== "" ||
                              values.email !== "" ||
                              values.url !== ""
                            ) {
                              setSteps(3);
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          ) : (
            steps === 3 && (
              <div className="w-100 ">
                <h3 className="product-heading text-center mt-5">
                  Thank You For Submition
                </h3>
              </div>
            )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            if (steps === 1) {
              setSteps(2);
            } else if (steps === 2) {
              setSteps(1);
            } else if (steps === 3) {
              setSteps(2);
            }
          }}
          type="button"
          className="btn btn-primary"
        >
          {steps === 1 ? "Next" : "Back"}
        </button>
        {steps === 3 && (
          <button
            onClick={() => {
              setShowListing(false);
            }}
            type="button"
            className="btn btn-secondary"
          >
            Close
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
