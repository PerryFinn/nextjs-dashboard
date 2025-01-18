'use client';
import {
  Card,
  Image,
  Button,
  CardFooter,
  CardHeader,
  Badge,
  Chip,
} from '@nextui-org/react';
import React from 'react';
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

function BookItem({
  id,
  name,
  author,
  desc,
  cover,
}: {
  id: string;
  name: string;
  author: string;
  desc: string;
  cover: string;
}) {
  return (
    <Card isFooterBlurred className='border-none' radius='lg'>
      <Image
        alt={desc}
        className='object-cover'
        height={200}
        draggable={false}
        src={cover}
        width={200}
      />
      <CardHeader className='absolute top-1 w-[calc(100%_-_8px)] ml-1 z-10 flex-col items-end gap-1'>
        <div className='truncate before:bg-white/10 border-white/20 border-1 py-1 before:rounded-xl rounded-large w-full shadow-small backdrop-blur-sm text-white text-center'>
          {name}
        </div>
        <Chip
          size='sm'
          color='success'
          variant='dot'
          className='text-gray-500 max-w-20 truncate rounded-md border-1'
        >
          {author}
        </Chip>
      </CardHeader>
      <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
        <Button
          className='text-tiny text-white bg-black/20 px-1 min-w-12'
          color='default'
          radius='sm'
          size='sm'
          variant='flat'
        >
          <DocumentMagnifyingGlassIcon className='size-5' title='详情' />
        </Button>
        <Button
          className='text-tiny text-white bg-black/20 px-1 min-w-12'
          color='default'
          radius='sm'
          size='sm'
          variant='flat'
        >
          <ArrowPathIcon className='size-5' title='更新' />
        </Button>
        <Button
          className='text-tiny text-white bg-black/20 px-1 min-w-12'
          color='default'
          radius='sm'
          size='sm'
          variant='flat'
        >
          <TrashIcon className='size-5' title='删除' />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BookItem;
