import React from "react";
import { Modal } from "react-bootstrap";

const RoyaltyInformation = ({ show, setShow }) => {
  return (
    <div className="royalty-modal">
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
        aria-label="royalty-modal"
        contentClassName="royalty-modal-content"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1 className="royalty-heading">Royalty-Based Content</h1>

          <div className="license-card-box">
            <div className="lic-cards">
              <div className="c2e-linc-card">
                <p>Financial Year 2023 Chart</p>
                <div
                  className="lic-bg-image"
                  style={{
                    backgroundImage: `url(${""})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <h4>Terms $10/year Unlimited </h4>
              </div>
            </div>
            <div className="lic-cards">
              <div className="c2e-linc-card">
                <p>Financial Year 2023 Chart</p>
                <div
                  className="lic-bg-image"
                  style={{
                    backgroundImage: `url(${""})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <h4>Terms $10/year Unlimited </h4>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoyaltyInformation;
