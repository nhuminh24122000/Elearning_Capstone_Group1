import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Suspense } from 'react'
import { Outlet } from "react-router-dom";
import AlertPopUp from "../../components/AlertPopup/AlertPopUp";


export default function HomeTemplate(props) {
  const {alert} = props;
  return (
    <React.Fragment>
      <Header />
      <AlertPopUp alert={alert}/>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}