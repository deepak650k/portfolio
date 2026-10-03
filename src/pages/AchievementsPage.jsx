import React from 'react';
import Achievements from '../components/Achievements';
import PageWrapper from '../components/PageWrapper';

export default function AchievementsPage() {
  return (
    <PageWrapper 
      prevPage={{ label: "Featured Projects", href: "/projects" }} 
      nextPage={{ label: "Get in Touch", href: "/contact" }}
    >
      <Achievements />
    </PageWrapper>
  );
}
