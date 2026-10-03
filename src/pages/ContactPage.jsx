import React from 'react';
import Contact from '../components/Contact';
import PageWrapper from '../components/PageWrapper';

export default function ContactPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "Achievements & Awards", href: "/achievements" }} 
      nextPage={{ label: "Back to Home", href: "/" }}
    >
      <Contact />
    </PageWrapper>
  );
}
