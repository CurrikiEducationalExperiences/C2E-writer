import React from "react";
import { Modal, Accordion } from "react-bootstrap";

import BannerImg from "../assets/images/course-main-img.png";

const RoyaltyInformation = ({ show, setShow }) => {
  return (
    <div className="royalty-modal">
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        size="xl"
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
          <div className="royalty-accordion">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="ass-header-info">
                    <img src={BannerImg} alt="banner" />
                    <div className="info-detail">
                      <h3>Financial Year 2023 Chart</h3>
                      <p>Terms $10/year Unlimited </p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoyaltyInformation;
