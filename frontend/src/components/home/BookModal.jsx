import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import Dialog from '../ui/Dialog';
import Badge from '../ui/Badge';

const BookModal = ({ book, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="rounded-none border-4 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Close - Hard square button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-950 hover:bg-slate-950 hover:text-white transition-colors z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <AiOutlineClose className="text-xl" />
      </button>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Image/Cover */}
        <div className="w-full md:w-2/5 border-b-2 md:border-b-0 md:border-r-2 border-slate-950 bg-slate-100 p-8 flex items-center justify-center">
          {book.imageURL ? (
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full h-auto object-cover border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          ) : (
            <div className="w-full aspect-[2/3] border-2 border-slate-950 flex flex-col items-center justify-center bg-white p-4 text-center">
              <PiBookOpenTextLight className="text-6xl text-slate-950 mb-4" />
              <span className="font-mono text-xs uppercase font-bold">No Cover</span>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-3/5 p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-slate-950 text-white border-transparent text-sm px-3 py-1">
              Ref: {book._id?.slice(-6).toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {book.publishYear}
            </Badge>
          </div>

          <h2 className="text-4xl font-black uppercase leading-[0.9] mb-4 text-slate-950">
            {book.title}
          </h2>

          <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-950 pb-6 w-full">
            <BiUserCircle className="text-3xl text-slate-950" />
            <span className="text-xl font-mono font-bold uppercase">{book.author}</span>
          </div>

          <div className="prose prose-slate max-w-none">
            <h4 className="font-black uppercase text-lg mb-2">Manifesto / Summary</h4>
            <p className="font-mono text-sm leading-relaxed text-slate-700">
              <span className="font-bold bg-orange-200 px-1">"{book.title}"</span> is a work recorded in the database under the authorship of <span className="font-bold">{book.author}</span>.
              Published in the year {book.publishYear}. System ID: {book._id}.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookModal;