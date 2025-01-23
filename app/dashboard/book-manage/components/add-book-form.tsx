'use client';
import {
  Button,
  Form,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';

export type IProps = {
  onClose: () => void;
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const uploadRes = await (
    await fetch('http://localhost:12306/v1/book/upload', {
      method: 'POST',
      body: formData,
    })
  ).json();
  if (!uploadRes.success) throw new Error(uploadRes.message);
  return uploadRes.data;
};

function AddBookForm(props: IProps) {
  const { onClose } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.currentTarget));
      let cover = data.cover as File;
      if (cover?.size > 0) {
        data.cover = await uploadFile(cover);
      }
      console.log(`submit`, data);
      const resp = await fetch('http://localhost:12306/v1/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (!result.success) throw new Error(result.message);
      onClose();
    } catch (error: any) {
      toast.error(error?.message ?? '添加书籍失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      className='w-full flex flex-col gap-4'
      validationBehavior='native'
      onSubmit={handleSubmit}
    >
      <ModalHeader className='flex flex-col gap-1'>添加书籍</ModalHeader>
      <ModalBody className='w-full'>
        <Input
          isRequired
          errorMessage='书籍名称非法'
          label='名称'
          name='name'
          size='sm'
          type='text'
          isClearable
        />
        <Input
          isRequired
          errorMessage='作者名称非法'
          label='作者'
          name='author'
          type='text'
          size='sm'
          maxLength={10}
          isClearable
        />
        <Textarea
          label='描述'
          name='desc'
          type='text'
          size='sm'
          maxLength={100}
        />
        <Input
          label='封面'
          name='cover'
          type='file'
          size='sm'
          accept='image/*'
        />
      </ModalBody>
      <ModalFooter className='w-full flex gap-2'>
        <Button isLoading={isLoading} color='primary' type='submit'>
          Submit
        </Button>
        <Button type='reset' variant='flat'>
          Reset
        </Button>
      </ModalFooter>
    </Form>
  );
}

export default AddBookForm;
