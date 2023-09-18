
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import LOGO from "../assets/img/common/small-logo.png";

export default (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      {/* <Image className="loader-element animate__animated animate__jackInTheBox" src={LOGO} height={40} /> */}
      <Spinner className="loader-element animate__animated animate__jackInTheBox" size="lg" animation="border" variant="warning" />
    </div>
  );
};
