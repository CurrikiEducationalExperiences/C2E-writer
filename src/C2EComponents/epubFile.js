import React, { useState, useEffect, useContext } from "react"
import Accordion from "react-bootstrap/Accordion"
import { GoogleLogin } from "@react-oauth/google"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Header from "./header"
import UploadFile from "./upload"
import Tab from "react-bootstrap/Tab"
import axios from "axios"
import Tabs from "react-bootstrap/Tabs"
import Spinner from "react-bootstrap/Spinner"
import { Formik } from "formik"
import RoyaltyInformationModal from "./royaltyInformation"
import { UserContext } from "../App"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "react-circular-progressbar/dist/styles.css"
import upload from "../assets/images/upload (1).svg"
import FileIcon from "../assets/images/file.svg"
import FileIconBlack from "../assets/images/file-black.svg"
import ListingIcon from "../assets/images/listing.svg"
import ListingWhite from "../assets/images/listing-white.svg"
import BookIcon from "../assets/images/icons/book.svg"
import StoreIcon from "../assets/images/icons/store.svg"
import CloseIcon from "../assets/images/icons/close-black.svg"
import AdditionalIcon from "../assets/images/icons/Additional-info.svg"
import RoyaltyInfoIcon from "../assets/images/icons/royalty-info.svg"
import AdditionalIconWhite from "../assets/images/icons/additional-white.svg"
import RoyaltyInfoIconWhite from "../assets/images/icons/royalty-white.svg"
import Wiley from "../assets/images/wiley.png"
import SKUIcon from "../assets/images/icons/form/sKU.svg"
import NameIcon from "../assets/images/icons/form/Name.svg"
import DescriptionIcon from "../assets/images/icons/form/Description.svg"
import PrceIcon from "../assets/images/icons/form/Price.svg"
import EmailIcon from "../assets/images/icons/form/Email.svg"
import UrlIcon from "../assets/images/icons/form/Url.svg"
import TitleIcon from "../assets/images/icons/form/title.svg"


function escapeSpecialCharacters(inputString) {
  return inputString
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x2014;/g, "—")
    .replace(/&#x2019;/g, "’")
    .replace(/&amp;/g, "&")
}

const Epubfile = () => {
  const user = useContext(UserContext)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [show, setShow] = useState()
  const [showListing, setShowListing] = useState()
  const [activEpub, setActivEpub] = useState()
  const [royaltyModal, setRoyaltyModal] = useState()
  const [activeEpubUrl, setActiveEpubUrl] = useState()
  const [showconfirm, setshowconfirm] = useState()
  const [batch, setBatch] = useState(false)
  const [allData, setAllData] = useState()
  const url = process.env.REACT_APP_API_URL // "https://c2e-provider-api.curriki.org";
  const [allStores, setAllStores] = useState([])
  const [writer, setWriter] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showFullDescription, setShowFullDescription] = useState("See less")

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])

  const toggleSelectAll = (event, parentId) => {
    const itemsToSelect = allData.filter(
      (data1) => data1.type === "epub" && data1.parentid === parentId
    )

    let temp = []
    let includetemp = selectedItems
    itemsToSelect.filter((data) => {
      if (!selectedItems?.includes(data.id)) {
        temp.push(data.id)
      } else {
        includetemp = includetemp.filter((data1) => data1 !== data.id)
      }
    })
    setSelectedItems([...includetemp, ...temp])
  }

  const toggleItemSelection = (item, parentId) => {
    if (selectedItems.includes(parentId)) {
      setSelectedItems(selectedItems.filter((data) => data !== parentId))
    } else {
      setSelectedItems([...selectedItems, parentId])
    }
  }

  const getData = () => {
    fetch(url + "/c2e-media").then((data) =>
      data.json().then((value) => {
        setAllData(value)
      })
    )

    fetch(url + "/c2e-stores").then((data) =>
      data.json().then((value) => {
        setAllStores(
          value.map((store) => {
            return { ...store, img: Wiley }
          })
        )
      })
    )

    fetch(url + "/c2e-writers").then((data) =>
      data.json().then((value) => {
        setWriter(value.length > 0 ? value[0] : null)
      })
    )
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="reader-c2e">
      <Header />

      <div className="reader-main">
        {user ? (
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
            {user && (
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

            {user ? (
              <p className="text">Upload a file from your local device</p>
            ) : (
              <p className="text text-space">Log In and Experience C2Es Now</p>
            )}
            {user ? (
              <UploadFile
                setUploadProgress={setUploadProgress}
                getData={getData}
              />
            ) : (
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  localStorage.setItem(
                    "oAuthToken",
                    credentialResponse.credential
                  )
                  window.location.reload()
                }}
                onError={() => {
                  console.log("Login Failed")
                  window.location.reload()
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
          position: "relative",
          top: "35px",
        }}
      >
        <button
          onClick={() => {
            setshowconfirm(true)
            setBatch(true)
            setActivEpub()
          }}
          class="btn btn-primary"
          disabled={selectedItems.length === 0}
        >
          List Selected Items
        </button>
      </div>

      {user && (
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
                  (data) => data.type === "epub" && data.parentid === null
                )
                ?.map((value, counter) => {
                  return (
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "11",
                          top: "10px",
                          left: "5px",
                        }}
                      >
                        <input
                          style={{ height: "16px", width: "16px" }}
                          type="checkbox"
                          // checked={

                          // }
                          onChange={(event) => toggleSelectAll(event, value.id)}
                        />
                      </div>
                      <Accordion.Item eventKey={String(counter)}>
                        <Accordion.Header>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "35px",
                              paddingLeft: "25px",
                            }}
                          >
                            {value.title}
                            <div>ISBN {value.identifier}</div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {allData
                            ?.filter(
                              (data1) =>
                                data1.type === "epub" &&
                                data1.parentid === value.id
                            )
                            ?.map((value1, counter1) => {
                              return (
                                <div
                                  key={value1.id}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "10px 0px",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  <div>
                                    <div
                                      style={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "12px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      <div
                                        style={{
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <input
                                          style={{
                                            height: "16px",
                                            width: "16px",
                                          }}
                                          type="checkbox"
                                          checked={selectedItems.includes(
                                            value1.id
                                          )}
                                          onChange={() =>
                                            toggleItemSelection(
                                              value1,
                                              value1.id
                                            )
                                          }
                                        />
                                      </div>
                                      {escapeSpecialCharacters(value1.title)}
                                    </div>

                                    <div
                                      style={{
                                        marginLeft: "27px",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {showFullDescription === "See less"
                                        ? value1.description.slice(0, 140)
                                        : value1.description}
                                      {
                                        <span
                                          style={{
                                            marginLeft: "2px",
                                            color: "blue",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setShowFullDescription(
                                              showFullDescription === "See more"
                                                ? "See less"
                                                : "See more"
                                            )
                                          }
                                        >
                                          {showFullDescription === "See less"
                                            ? "See more"
                                            : "See less"}
                                        </span>
                                      }
                                    </div>
                                  </div>
                                  <div
                                    className=""
                                    style={{
                                      display: "flex",
                                      gap: "12px",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        setShowListing(true)
                                        setActivEpub(value1)
                                        setBatch(false)
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
                                  </div>
                                </div>
                              )
                            })}
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  )
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
                return <div>{value.title}</div>
              })}
          </Tab>
        </Tabs>
      )}
      <Modal show={showconfirm}>
        <Modal.Body className="body-modal">
          Are you sure you want to continue?
        </Modal.Body>
        <Modal.Footer className="footer-modal">
          <Button
            variant="primary"
            onClick={() => {
              setshowconfirm(false)
              setShowListing(true)
            }}
          >
            Continue
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setshowconfirm(false)
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={() => {
          setShow(false)
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
                (data) => data.id === activEpub?.parentId
              )?.[0]?.title,
              // description: '',
              name: "",
              email: "",

              url: "https://twitter.com",
            }}
            validate={(values) => {
              //   const errors = {}
              //   if (!values.title) {
              //     errors.title = "Required"
              //   }
              //   // if (!values.description) {
              //   //   errors.description = 'Required';
              //   // }
              //   if (!values.name) {
              //     errors.name = "Required"
              //   }
              //   if (!values.email) {
              //     errors.email = "Required"
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = "Invalid email address"
              //   }
              //   return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setActiveEpubUrl()
              const response = await axios.post(
                url + "/c2e/media",
                { ceeMediaId: activEpub?.id, licensee: { ...values } },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },

                  //  responseType: 'blob',
                }
              )
              if (response) {
                setActiveEpubUrl(response.data?.id)
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
      <ListingModule
        showListing={showListing}
        setShowListing={setShowListing}
        activEpub={activEpub}
        allData={allData}
        setRoyaltyModal={setRoyaltyModal}
        allStores={allStores}
        writer={writer}
        batch={batch}
        selectedItems={selectedItems}
      />

      <RoyaltyInformationModal show={royaltyModal} setShow={setRoyaltyModal} />
    </div>
  )
}

export default Epubfile

const ListingModule = ({
  showListing,
  setShowListing,
  setRoyaltyModal,
  activEpub,
  allData,
  allStores,
  writer,
  batch,
  selectedItems,
}) => {
  const user = useContext(UserContext)
  const [steps, setSteps] = useState(1)
  const [selectedStore, setSelectedStore] = useState()
  const [startDate, setStartDate] = useState(1)
  const url = process.env.REACT_APP_API_URL //"https://c2e-provider-api.curriki.org";


  function addMonthsOrYears(type, number) {
    // Get the current date
    const currentDate = new Date()

    if (type === "monthly") {
      // Add the specified number of months
      currentDate.setMonth(currentDate.getMonth() + number)
    } else if (type === "yearly") {
      // Add the specified number of years
      currentDate.setFullYear(currentDate.getFullYear() + number)
    }
    return currentDate.toDateString()
  }
  return (
    <Modal
      show={showListing}
      onHide={() => {
        setShowListing(false)
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="right-aligned-modal"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="uploadBox modial-iner-box">
          <button
            type="button"
            onClick={() => {
              setShowListing(false)
              setSteps(1)
            }}
            className="close-btn"
          >
            <img src={CloseIcon} alt="close" />
          </button>
          {steps !== 3 && (
            <div className="list-steps">
              <div className="step">
                <h5 className="">Select</h5>
              </div>
              <div className={`step ${steps === 1 && "disable"}`}>
                <h5 className="">Describe</h5>
              </div>
            </div>
          )}
          <br />
          {steps !== 3 && (
            <div className="modal-title-heading">
              {selectedStore && (
                <h1>
                  <img src={StoreIcon} alt="store" /> {selectedStore?.name}
                </h1>
              )}
              <h2>{activEpub?.title}</h2>
              <h3>
                <img src={BookIcon} alt="book" />
                {
                  allData?.filter(
                    (data) => data.id === activEpub?.parentId
                  )?.[0]?.title
                }
              </h3>
            </div>
          )}

          {steps === 1 ? (
            <div className="e-commerce-stor">
              <div className="selection-stor-box mb-5">
                {allStores?.map((data) => {
                  return (
                    <div
                      className="box"
                      onClick={() => {
                        setSteps(2)
                        setSelectedStore(data)
                      }}
                    >
                      <img src={data.img} alt="" />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : steps === 2 ? (
            <div>
              <Formik
                initialValues={{
                  c2eTitle: activEpub?.title,
                  sku: activEpub?.identifier,
                  price: "",
                  c2eDiscription: activEpub?.description,
                  ownerName: user?.name,
                  ownerEmail: user?.email,
                  ownerLicense: "",
                  url: "",
                  publisherName: writer.name,
                  publisherEmail: writer.email,
                  publisherUrl: writer.url,
                  subscription_term: "",
                  copyrightYear: "",
                  usageType: ["usage"],
                }}
                enableReinitialize
                validate={(values) => {
                  const errors = {}

                  if (
                    !values.price &&
                    !values.usageType?.includes("creative common")
                  ) {
                    errors.price = "Required"
                  }

                  // else if (values.price && (!/^\d+$/.test(values.price) || parseInt(values.price, 10) <= 0)) {
                  //   errors.price = "Price must be a positive integer";
                  // }

                  // if (
                  //   !values.subscription_term &&
                  //   values.usageType?.includes('usage')
                  // ) {
                  //   errors.subscription_term = 'Required';
                  // }

                  if (
                    !values.subscription_term &&
                    values.usageType?.includes("Subscription")
                  ) {
                    errors.subscription_term = "Required"
                  }
                  if (!values.c2eDiscription) {
                    errors.c2eDiscription = "Required"
                  }

                  return errors
                }}
                onSubmit={async (values) => {
                  const url1 = batch
                    ? "/c2e-listings/media/batch"
                    : "/c2e-listings/media"
                  const key = batch ? "ceeMediaIds" : "ceeMediaId"
                  const payload = {
                    [key]: batch ? selectedItems : activEpub.id,
                    ceeWriterId: writer.id,
                    ceeStoreId: selectedStore.id,
                    title: values.c2eTitle,
                    description: values.c2eDiscription,
                    identifier: {
                      identifierType: activEpub?.identifierType,
                      identifierValue: values.sku,
                    },
                    copyrightHolder: {
                      name: values.ownerName,
                      email: values.ownerEmail,
                      url: values.url,
                    },
                    price:
                      values.usageType?.includes("creative common") ||
                      /^\d+$/.test(!values.usageType) ||
                      !values.usageType === ""
                        ? "0"
                        : String(values.price),
                    licenseType:
                      typeof values.usageType === "object"
                        ? String(values.usageType?.[0])
                        : String(values.usageType),
                    licenseTerms: values.usageType.includes("Subscription")
                      ? `${values.subscription_term}, ${startDate}`
                      : values.usageType.includes("usage") ||
                        values.usageType.includes("Subscription")
                      ? String(values.subscription_term)
                      : "",
                  }
                  try {
                    const response = await axios.post(url + url1, payload)
                    if (response) {
                      setSteps(3)
                    }
                  } catch (e) {}
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
                  setFieldValue,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="formik-box">
                      <div className="stor-flex-box">
                        <h5>C2E Details</h5>
                        <div className="input-box">
                          <label>
                            <img src={SKUIcon} alt="aku" /> ISBN
                          </label>
                          <input
                            type="text"
                            name="sku"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sku}
                          />
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={NameIcon} alt="name" /> C2E Title *
                          </label>
                          <input
                            type="text"
                            name="c2eTitle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.c2eTitle}
                          />
                          <p className="error">
                            {errors.c2eTitle &&
                              touched.c2eTitle &&
                              errors.c2eTitle}
                          </p>
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={DescriptionIcon} alt="DescriptionIcon" />
                            C2E Description<span className="error">*</span>
                          </label>
                          <ReactQuill
                            className="quil_box"
                            theme="snow"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("c2eDiscription", e)
                              console.log("handleChange", e)
                            }}
                            value={values.c2eDiscription}
                          />
                          {/* <textarea type="text" name="c2eDiscription" onChange={handleChange} onBlur={handleBlur} value={values.c2eDiscription} /> */}
                        </div>
                        <div className="input-box">
                          <p className="error">
                            {errors.c2eDiscription &&
                              touched.c2eDiscription &&
                              errors.c2eDiscription}
                          </p>
                        </div>
                      </div>
                      <div className="stor-flex-box">
                        <h5>Author Details</h5>

                        <div className="input-box">
                          <label>
                            <img src={NameIcon} alt="neme" /> Name
                          </label>
                          <input
                            type="text"
                            name="ownerName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ownerName}
                            readOnly
                          />
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={EmailIcon} alt="email" /> Email
                          </label>
                          <input
                            type="email"
                            name="ownerEmail"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ownerEmail}
                            readOnly
                          />
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={UrlIcon} alt="pub" /> URL
                          </label>
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
                    </div>

                    <div className="formik-box">
                      <div className="stor-flex-box">
                        <h5>C2E License Types </h5>
                        {/* <div className="input-box">
                          <label>Set Usage Type</label>
                        </div> */}

                        <div className="d-flex check-box">
                          <div className="check">
                            <input
                              type="radio"
                              name="usageType"
                              value="usage"
                              onChange={(e) => {
                                setFieldValue("subscription_term", "")
                                handleChange(e)
                              }}
                              onBlur={handleBlur}
                              checked={values.usageType.includes("usage")}
                            />
                            <label className="ml-2">Usage</label>
                          </div>
                          <div className="check">
                            <input
                              type="radio"
                              name="usageType"
                              value="Subscription"
                              onChange={(e) => {
                                setFieldValue("subscription_term", "")

                                handleChange(e)
                              }}
                              onBlur={handleBlur}
                              checked={values.usageType.includes(
                                "Subscription"
                              )}
                            />
                            <label className="ml-2">Subscription</label>
                          </div>
                          <div className="check">
                            <input
                              type="radio"
                              name="usageType"
                              value="Purchased"
                              onChange={(e) => {
                                setFieldValue("subscription_term", "")
                                handleChange(e)
                              }}
                              onBlur={handleBlur}
                              checked={values.usageType.includes("Purchased")}
                            />
                            <label className="ml-2">Purchased</label>
                          </div>
                          <div className="check">
                            <input
                              type="radio"
                              name="usageType"
                              value="creative common"
                              onChange={(e) => {
                                setFieldValue("subscription_term", "")
                                handleChange(e)
                              }}
                              onBlur={handleBlur}
                              checked={values.usageType.includes("creative")}
                            />
                            <label className="ml-2">Creative Commons</label>
                          </div>
                        </div>

                        <h5>License Terms </h5>

                        {/* <div className="input-box">
                          <label>
                            <img src={TitleIcon} alt="title" /> License Terms
                          </label>
                          <input
                            type="text"
                            name="ownerLicense"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ownerLicense}
                          />
                        </div> */}
                        {values.usageType.includes("Subscription") && (
                          <div style={{ display: "flex", gap: "15px" }}>
                            <div className="input-box">
                              <label>
                                <img src={TitleIcon} alt="title" /> Term
                              </label>
                              <select
                                type="text"
                                name="subscription_term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subscription_term}
                              >
                                <option value="">Select </option>
                                <option value="monthly">Monthly</option>

                                <option value="yearly">Yearly</option>
                              </select>
                            </div>

                            <div className="input-box">
                              <label>
                                <img src={PrceIcon} alt="" />
                                Quantity
                              </label>
                              <input
                                type="number"
                                name="subscription_term"
                                onChange={(e) => {
                                  setStartDate(e.target.value)
                                }}
                                onBlur={(e) => {
                                  setStartDate(e.target.value)
                                }}
                                value={startDate}
                              />
                            </div>
                          </div>
                        )}
                        {values.usageType.includes("Subscription") &&
                          values.subscription_term &&
                          startDate && (
                            <p>
                              <strong>Expiration Date:</strong>{" "}
                              {addMonthsOrYears(
                                values.subscription_term,
                                parseInt(startDate)
                              )}{" "}
                            </p>
                          )}
                        {/* {values.usageType.includes('usage') && (
                          <div className="input-box">
                            <label>
                              <img src={PrceIcon} alt="" /> Number of Users *
                            </label>
                            <input
                              type="number"
                              name="subscription_term"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.userscount}
                            />
                          </div>
                        )} */}
                        <div className="input-box">
                          <p className="error">
                            {errors.subscription_term &&
                              touched.subscription_term &&
                              errors.subscription_term}
                          </p>
                        </div>
                        <div className="input-box">
                          <label>
                            <img src={PrceIcon} alt="" /> Price ($USD){" "}
                            <span className="error">*</span>
                          </label>
                          <input
                            type="string"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={
                              values.usageType.includes("creative common")
                                ? true
                                : false
                            }
                            value={
                              values.usageType.includes("creative common")
                                ? 0
                                : values.price
                            }
                          />
                          <p className="error">
                            {errors.price && touched.price && errors.price}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "32px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setRoyaltyModal(true)}
                            className="btn btn-primary sec-btn"
                          >
                            <img
                              src={RoyaltyInfoIcon}
                              alt="file"
                              width={20}
                              height={20}
                              className="blue-add-icon"
                            />
                            <img
                              src={RoyaltyInfoIconWhite}
                              alt="file"
                              width={20}
                              height={20}
                              className="white-add-icon"
                            />
                            Royalty Information
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary sec-btn"
                          >
                            <img
                              src={AdditionalIcon}
                              alt="file"
                              width={20}
                              height={20}
                              className="blue-add-icon"
                            />
                            <img
                              src={AdditionalIconWhite}
                              alt="file"
                              width={20}
                              height={20}
                              className="white-add-icon"
                            />
                            Additional Information
                          </button>
                        </div>
                      </div>

                      <div className="stor-flex-box">
                        <h5> C2E Provider Details</h5>

                        <div className="input-box">
                          <label>
                            <img src={NameIcon} alt="neme" /> Name
                          </label>
                          <input
                            type="text"
                            name="publisherName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.publisherName}
                            readOnly
                          />
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={EmailIcon} alt="email" /> Email
                          </label>
                          <input
                            type="email"
                            name="publisherEmail"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.publisherEmail}
                            readOnly
                          />
                        </div>

                        <div className="input-box">
                          <label>
                            <img src={UrlIcon} alt="pub" /> URL
                          </label>
                          <input
                            type="text"
                            name="publisherUrl"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={""}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {steps === 2 && (
                      <div className="form-btn">
                        {isSubmitting ? (
                          <button
                            type="button"
                            disabled={isSubmitting}
                            className="btn btn-primary "
                          >
                            <Spinner
                              animation="grow"
                              variant="light"
                              size="sm"
                            />
                            &nbsp;
                            <Spinner
                              animation="grow"
                              variant="light"
                              size="sm"
                            />
                            &nbsp;
                            <Spinner
                              animation="grow"
                              variant="light"
                              size="sm"
                            />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary "
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          ) : (
            steps === 3 && (
              <div className="style-thankyou">
                <h3
                  className="product-heading text-center mt-5"
                  style={{ color: "green" }}
                >
                  Thank You For Submission!
                </h3>
                <p>
                  You have successfully listed {activEpub?.title} on{" "}
                  {selectedStore?.name}
                </p>
              </div>
            )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {steps !== 1 && (
          <button
            onClick={() => {
              if (steps === 1) {
                setSteps(2)
              } else if (steps === 2) {
                setSteps(1)
              } else if (steps === 3) {
                setSteps(2)
              }
            }}
            type="button"
            className="btn btn-primary"
          >
            Back
          </button>
        )}
        {steps === 3 && (
          <button
            onClick={() => {
              setShowListing(false)
            }}
            type="button"
            className="btn btn-secondary"
          >
            Close
          </button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
