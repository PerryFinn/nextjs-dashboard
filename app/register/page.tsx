'use client';

import React, { FormEventHandler } from 'react';
import { Form, Input, Button } from '@nextui-org/react';

const Register = () => {
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  return (
    <Form
      className='w-full max-w-xs'
      validationBehavior='native'
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage='Please enter a valid email'
        label='Email'
        labelPlacement='outside'
        name='email'
        placeholder='Enter your email'
        type='email'
      />
      <Button type='submit' variant='bordered'>
        Submit
      </Button>
      {submitted && (
        <div className='text-small text-default-500'>
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
};

export default Register;
