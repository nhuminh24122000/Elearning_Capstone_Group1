import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Suspense } from 'react'
import { Outlet } from "react-router-dom";


export default function HomeTemplate() {

  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}