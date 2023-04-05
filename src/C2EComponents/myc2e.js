import React, { useState, useEffect } from 'react';

import { Web3Auth } from '@web3auth/modal';
import { ADAPTER_EVENTS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
// import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ProgressBar from 'react-bootstrap/ProgressBar';

import upload from '../assets/images/upload (1).svg';
import Myc2eOverview from './myc2eoverview';
import Header from './header';

import UploadFile from './upload';

const Myc2e = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [web3auth, setWeb3auth] = useState(null);
  const [walletConnection, setWalletConneciton] = useState(null);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.connect();
  };

  useEffect(() => {
    (async () => {
      const web3auth = new Web3Auth({
        clientId:
          'BNW0_55WnZZSF6hjmoLGsx2d7NQ_KHuFQnsGOPUPjwWDJAAiT-9iBfu_TeLRkLH3NiKfao04OgEgeCS86JfSFeo',
        chainConfig: {
          chainNamespace: 'eip155',
          chainId: '0x1',
        },
      });
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
        console.log('connected to wallet', web3auth);

        const user = await web3auth.getUserInfo();
        setWalletConneciton(user);
        console.log('🚀 ~ file: signup-web3auth.js:46 ~ getUserInfo ~ user:', user);

        // web3auth.provider will be available here after user is connected
      });
      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log('connecting');
      });
      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log('disconnected');
        setWalletConneciton(null);
      });

      setWeb3auth(web3auth);
      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          network: 'testnet',
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
              After you have licensed a C2E from a digital marketplace, you will receive an email
              with instructions on how to download it.
              <br /> After the C2E is in your hand, you can open it in a C2E reader, like this one.
            </p>
          </div>
        ) : (
          <div className="text-detail">
            <h5>Imagine a world…</h5>
            <p>
              … where access to high quality learning resources is equitable, affordable, and widely
              available. <br />
              <br /> … where digital content creators have access to resources and incentives to
              build quality interactive learning experiences, and marketplaces where they can get
              paid fairly for their efforts.
              <br /> <br /> … where the quality and appropriateness of digital educational content
              can be vetted before it enters a marketplace.
            </p>
          </div>
        )}

        <div className="uploadBox">
          <div className="box">
            <h1>Curriki Educational Experiences Writer</h1>
            {walletConnection && (
              <>
                <div className="iconbox">
                  <img src={upload} alt="doge" />
                </div>
                <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} visuallyHidden />
              </>
            )}

            {walletConnection ? (
              <p className="text">Upload C2E from your local device</p>
            ) : (
              <p className="text text-space">Log In and Experience C2Es NOW</p>
            )}
            {walletConnection ? (
              <UploadFile setUploadProgress={setUploadProgress} />
            ) : (
              <button onClick={() => login()}>LET’s GET STARTED!</button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="iconbox">
        <img src={upload} alt="logo" />
      </div>
            {uploadProgress > 0 && <div>Progress: {uploadProgress}%</div>}*/}
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
