import React from 'react';
import About from '../components/About';
import PageWrapper from '../components/PageWrapper';

export default function AboutPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "Home", href: "/" }} 
      nextPage={{ label: "Academic Journey", href: "/education" }}
    >
      <About />
    </PageWrapper>
  );
}
