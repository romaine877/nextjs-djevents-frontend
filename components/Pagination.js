import { PER_PAGE } from "../config"
import Link from "next/link"
function Pagination ({page, total}) {
    const lastPage = Math.ceil(total/PER_PAGE)
    return (
        <>
            {page> 1 && <Link href={`/events?page=${page-1}`}>
                <a className="btn-secondary">Previous</a>
                </Link>}
            {page< lastPage && <Link href={`/events?page=${page+1}`}>
                <a className="btn-secondary">Next</a>
                </Link>}
        </>
    )
}

export default Pagination
