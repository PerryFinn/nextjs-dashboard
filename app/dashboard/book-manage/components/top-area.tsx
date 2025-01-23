'use client';

import { Button } from "@heroui/button";
import {
  Form,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import React, { FormEventHandler, useState } from 'react';
import AddBookForm from './add-book-form';

function TopArea() {
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.username) {
      setErrors({ username: 'Username is required' });

      return;
    }

    const result = data;

    setErrors(result.errors);
  };
  return (
    <div className='w-full flex flex-row justify-between items-center'>
      <Form
        className='w-96 max-w-xs flex flex-row gap-3'
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <Input label='book name' name='book' size='sm' />
        <Button type='submit' variant='flat' size='lg'>
          Search
        </Button>
      </Form>
      <Button onPress={onOpen} color='success' variant='flat' size='lg'>
        Add Book
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <AddBookForm onClose={onClose} />}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TopArea;
