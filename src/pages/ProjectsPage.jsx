import React from 'react';
import Projects from '../components/Projects';
import PageWrapper from '../components/PageWrapper';

export default function ProjectsPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "Technical Skills", href: "/skills" }} 
      nextPage={{ label: "Achievements & Honors", href: "/achievements" }}
    >
      <Projects />
    </PageWrapper>
  );
}
