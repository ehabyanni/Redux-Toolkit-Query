'use client'
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'next/app';
import UsersList from './components/UsersList';

function page() {
  return (
    <div className='conatiner mx-auto bg-white text-black'>
      <UsersList />
    </div>
  )
}

export default page