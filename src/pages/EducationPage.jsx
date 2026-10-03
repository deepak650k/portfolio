import React from 'react';
import Education from '../components/Education';
import PageWrapper from '../components/PageWrapper';

export default function EducationPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "About Me", href: "/about" }} 
      nextPage={{ label: "Technical Skills", href: "/skills" }}
    >
      <Education />
    </PageWrapper>
  );
}
