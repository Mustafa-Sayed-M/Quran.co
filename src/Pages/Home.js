import React from 'react';
import SomeChapters from '../Components/Sections/Chapters/SomeChapters/SomeChapters';
import RecitersSection from '../Components/Sections/RecitersSection/RecitersSection';
import AhadisSection from '../Components/Sections/AhadisSection/AhadisSection';
import Header from '../Components/Header/Header';

function Home() {
  return (
    <div className='home-page'>
      {/* Header */}
      <Header />
      {/* Some Chapters */}
      <SomeChapters />
      {/* RecitersSection */}
      <RecitersSection />
      {/* Ahadis Section */}
      <AhadisSection />
    </div>
  )
}

export default Home;