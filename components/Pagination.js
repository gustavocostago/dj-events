import Link from "next/link";
import {FcPrevious, FcNext} from 'react-icons/fc';
export default function Pagination({page,total,PER_PAGE}) {
  const lastPage = Math.ceil(total.meta.pagination.total/PER_PAGE)
  return (
    <div>
      {page>1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a><FcPrevious/></a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a><FcNext/></a>
        </Link>
      )}
    </div>
  )
}
