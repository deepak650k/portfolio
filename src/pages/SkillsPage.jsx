import React from 'react';
import Skills from '../components/Skills';
import PageWrapper from '../components/PageWrapper';

export default function SkillsPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "Academic Journey", href: "/education" }} 
      nextPage={{ label: "Featured Projects", href: "/projects" }}
    >
      <Skills />
    </PageWrapper>
  );
}
