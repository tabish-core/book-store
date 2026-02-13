import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const BackButton = ({ destination = '/' }) => {
  return (
    <Link
      to={destination}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50 bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 rounded-none hover:bg-slate-950 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
    >
      <HiOutlineArrowLeft className="text-lg" />
      Return
    </Link>
  );
};

export default BackButton;