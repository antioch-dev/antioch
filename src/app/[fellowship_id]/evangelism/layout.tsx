
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Church Evangelism',
  description: 'Specific section layout',
}

export default function EvangelismLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div className="evangelism-layout-wrapper">
      {children}
    </div>
  )
}