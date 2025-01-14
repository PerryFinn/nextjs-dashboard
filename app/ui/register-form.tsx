'use client';

import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { useActionState, useState } from 'react';
import { register } from '../lib/actions';
import { Button } from '@nextui-org/button';
import { Form, Input } from '@nextui-org/react';
import Link from 'next/link';

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState<
    string,
    FormData
  >(register, '');
  return (
    <div className='block'>
      <Form
        className='w-full space-y-3 gap-5'
        validationBehavior='native'
        action={formAction}
      >
        <Input
          isRequired
          errorMessage='Please enter a valid email'
          label='Email'
          labelPlacement='outside'
          name='username'
          placeholder='Enter your email'
          type='email'
        />
        <Input
          isRequired
          errorMessage='Please enter a valid password'
          label='Password'
          labelPlacement='outside'
          name='password'
          placeholder='Enter your password'
          type='password'
        />
        <div className='flex items-center justify-between w-full'>
          <Button type='submit' aria-disabled={isPending}>
            Submit
          </Button>
          <Link href='/login'>
            <Button className='w-full'>
              已有账号？去登录
              <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
            </Button>
          </Link>
        </div>
      </Form>
      <div className='flex h-8 items-end space-x-1 mt-2'>
        {/* Add form errors here */}
        {errorMessage && (
          <>
            <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
}
