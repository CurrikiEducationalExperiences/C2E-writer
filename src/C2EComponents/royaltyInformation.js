import React from "react";
import { Modal, Accordion } from "react-bootstrap";

import BannerImg from "../assets/images/course-main-img.png";
import Projectimg from "../assets/images/projectimg.png";

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
        <Modal.Header closeButton>
          <h1 className="royalty-heading">Royalty Information</h1>
        </Modal.Header>
        <Modal.Body>
          <h2 className="royalty-sub-heading">Royalty-Based Content</h2>

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
                  <div className="c2e-royalty-modal-detail">
                    <table>
                      <tr>
                        <th className="left-td-border">Name</th>
                        <th>Details</th>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Royalty Agreement Number</span>
                        </td>
                        <td>Financial Year 2023 chart</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0"> Content</span>
                        </td>
                        <td>05/05/2023</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Agreement Date</span>
                        </td>
                        <td>Reusable with royalties</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">License Expiration Date</span>
                        </td>
                        <td>10/05/2030</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Rights</span>
                        </td>
                        <td>ABC Publishers</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Name</span>
                        </td>
                        <td>www.abc.com</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Url</span>
                        </td>
                        <td>$10 per year unlimited use </td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Terms </span>
                        </td>
                        <td>LSC-Pub-123456789</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Status</span>
                        </td>
                        <td className="expiring-soon">Expiring Soon</td>
                      </tr>
                    </table>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="ass-header-info">
                    <img src={Projectimg} alt="banner" />
                    <div className="info-detail">
                      <h3>Financial Year 2023 Chart</h3>
                      <p>Terms $10/year Unlimited </p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="c2e-royalty-modal-detail">
                    <table>
                      <tr>
                        <th className="left-td-border">Name</th>
                        <th>Details</th>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Royalty Agreement Number</span>
                        </td>
                        <td>Financial Year 2023 chart</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0"> Content</span>
                        </td>
                        <td>05/05/2023</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Agreement Date</span>
                        </td>
                        <td>Reusable with royalties</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">License Expiration Date</span>
                        </td>
                        <td>10/05/2030</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Rights</span>
                        </td>
                        <td>ABC Publishers</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Name</span>
                        </td>
                        <td>www.abc.com</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Url</span>
                        </td>
                        <td>$10 per year unlimited use </td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Publisher Terms </span>
                        </td>
                        <td>LSC-Pub-123456789</td>
                      </tr>
                      <tr>
                        <td className="left-td-border">
                          <span className="m-0">Status</span>
                        </td>
                        <td className="expiring-soon">Expiring Soon</td>
                      </tr>
                    </table>
                  </div>
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
