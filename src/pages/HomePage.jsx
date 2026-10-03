import React from 'react';
import Hero from '../components/Hero';
import PageWrapper from '../components/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper nextPage={{ label: "Discover My Story", href: "/about" }}>
      <Hero />
    </PageWrapper>
  );
}
