'use client';
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import BookItem, { Book } from './components/book-item';
import EditBookForm from './components/edit-book-form';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { ToastContainer } from 'react-toastify';

export default function BookManagePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:12306/v1/book');
      const data = await res.json();
      setBooks(data?.data ?? []);
    } catch (error) {
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    setEditBook(book);
    onOpen();
  };

  return (
    <div className='w-full flex flex-wrap flex-row gap-4 items-center justify-between py-4'>
      {books.map((book) => {
        return (
          <BookItem
            key={book.id}
            cover={book.cover}
            name={book.name}
            author={book.author}
            desc={book.desc}
            onEdit={() => {
              handleEdit(book);
            }}
          />
        );
      })}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <EditBookForm
              editData={editBook}
              onClose={() => {
                fetchBooks();
                onClose();
              }}
            />
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}
