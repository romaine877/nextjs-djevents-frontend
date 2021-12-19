import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt } from 'react-icons/fa'
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Events Ja</a>
                </Link>
            </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>View Events</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/events/add'>
                            <a>Add Event</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/account/login'>
                            <a className='btn-secondary'> <FaSignInAlt/> Login</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
