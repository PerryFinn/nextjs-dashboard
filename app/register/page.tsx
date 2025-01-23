'use client';

import React, { FormEventHandler } from 'react';
import { Form, Input, Button } from "@heroui/react";
import AcmeLogo from '../ui/acme-logo';
import RegisterForm from '../ui/register-form';
import { lusitana } from '../ui/fonts';

const RegisterPage = () => {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 gap-4'>
        <div className='flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36'>
          <div className='w-32 text-white md:w-36'>
            <AcmeLogo />
          </div>
        </div>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Sign up to continue.
        </h1>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
