'use client';

import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { useActionState, useEffect } from 'react';
import { authenticate } from '../lib/actions';
import { Button } from "@heroui/button";
import { Link } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    void 0
  );
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);
  return (
    <form action={formAction} className='space-y-3'>
      <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='email'
                type='email'
                name='email'
                placeholder='Enter your email address'
                required
              />
              <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='password'
                type='password'
                name='password'
                placeholder='Enter password'
                required
                minLength={6}
              />
              <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>
        <Button type='submit' className='mt-4 w-full' aria-disabled={isPending}>
          Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
        </Button>
        <Link href='/register'>
          <Button className='mt-4 w-full'>
            还没账号？去注册
            <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
          </Button>
        </Link>
        <div className='flex h-8 items-end space-x-1'>
          {/* Add form errors here */}
          {errorMessage && (
            <>
              <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
