import React from 'react';
import AboutProject from '../components/AboutProject/AboutProject';
import AboutMe from '../components/AboutMe/AboutMe';
import Promo from '../components/Promo/Promo';
import Techs from '../components/Techs/Techs';
import Portfolio from '../components/Portfolio/Portfolio';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Main = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;
