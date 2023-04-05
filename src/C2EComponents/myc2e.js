import React, { useState, useRef } from 'react';
import c2e from '../assets/images/c2e.png';
import logo from '../assets/images/logo.png';
import upload from '../assets/images/upload (1).svg';
import JSZip from 'jszip';
import UploadFile from './upload';

const Myc2e = () => {
  const [contentData, setcontentData] = useState();
  const [contentDetail, setcontentDetail] = useState(null);
  const [projectJSON, setProjectJSON] = useState(null);
  const [playlists, setplaylists] = useState([]);
  const [activityh5p, setActivityh5p] = useState(null);
  const [loadzipper, setloadzipper] = useState(null);

  return (
    <div className="reader-c2e">
      <img src={logo} alt="logo" className="header-logo" />

      <div className="reader-main">
        <div className="img-box">
          <img src={c2e} alt="logo" />
        </div>
        <div className="uploadBox">
          <div className="box">
            <h1>Curriki Educational Experience Reader</h1>
            <div
              className="iconbox"

            >
              <img src={upload} alt="logo" />
            </div>
            <p className="text">Loreium ipsum dolet kilil asa</p>

            <UploadFile />
          </div>
        </div>
      </div>

      <footer class="footer-all">
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
      </footer>
    </div>
  );
};

export default Myc2e;
