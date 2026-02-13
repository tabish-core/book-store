import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
      {books.map((item, index) => (
        <BookSingleCard key={item._id} book={item} index={index} />
      ))}
    </div>
  );
};

export default BooksCard;