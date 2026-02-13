import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';

const BooksTable = ({ books }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="overflow-x-auto border-2 border-slate-950 dark:border-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-950 text-white dark:bg-zinc-50 dark:text-zinc-950">
            <th className="px-6 py-4 text-sm font-black uppercase tracking-wider border-r-2 border-white dark:border-zinc-950">#</th>
            <th className="px-6 py-4 text-sm font-black uppercase tracking-wider border-r-2 border-white dark:border-zinc-950">Title</th>
            <th className="px-6 py-4 text-sm font-black uppercase tracking-wider border-r-2 border-white dark:border-zinc-950 max-md:hidden">Author</th>
            <th className="px-6 py-4 text-sm font-black uppercase tracking-wider border-r-2 border-white dark:border-zinc-950 max-md:hidden">Year</th>
            <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-900">
          {books.map((book, i) => (
            <tr key={book._id} className="border-b-2 border-slate-950 dark:border-zinc-50 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors">
              <td className="px-6 py-4 text-sm font-mono font-bold text-slate-500 dark:text-zinc-500 border-r-2 border-slate-950 dark:border-zinc-50">{i + 1}</td>
              <td className="px-6 py-4 text-sm font-bold uppercase text-slate-950 dark:text-zinc-50 border-r-2 border-slate-950 dark:border-zinc-50">{book.title}</td>
              <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-zinc-300 border-r-2 border-slate-950 dark:border-zinc-50 max-md:hidden">{book.author}</td>
              <td className="px-6 py-4 text-sm font-mono font-bold text-slate-950 dark:text-zinc-50 border-r-2 border-slate-950 dark:border-zinc-50 max-md:hidden">{book.publishYear}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Link to={`/books/details/${book._id}`} className="p-2 border-2 border-slate-950 dark:border-zinc-50 hover:bg-slate-950 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors">
                    <BsInfoCircle className="text-lg" />
                  </Link>
                  {isAuthenticated && (
                    <>
                      <Link to={`/books/edit/${book._id}`} className="p-2 border-2 border-slate-950 dark:border-zinc-50 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                        <AiOutlineEdit className="text-lg" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`} className="p-2 border-2 border-slate-950 dark:border-zinc-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                        <MdOutlineDelete className="text-lg" />
                      </Link>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;