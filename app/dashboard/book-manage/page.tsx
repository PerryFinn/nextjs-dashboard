import BookItem from './components/book-item';

export default function BookManagePage() {
  const mockArr = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className='w-full flex flex-wrap flex-row gap-4 items-center justify-between py-4'>
      {mockArr.map((item) => {
        return (
          <BookItem
            key={item}
            id={item.toString()}
            cover='https://nextui.org/images/hero-card.jpeg'
            name='Book Name'
            author='Author Name'
            desc='Book Description'
          />
        );
      })}
    </div>
  );
}
