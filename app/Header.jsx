import Image from "next/image"
import Link from "next/link"
import Logo from '../public/media/Logo.svg'

function Header() {
    return (
        <header>
            <div>
                <Link href="/"><Image src={Logo} alt="logo" /></Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/">ראשי</Link></li>
                    <li><Link href="/stores">חנויות</Link></li>
                    <li><Link href="/products">מוצרים</Link></li>
                    <li><Link href="/categories">קטגוריות</Link></li>
                </ul>
            </nav>
            <div>
                <Link href="register"><button>הרשמה</button></Link>
                <button>התחברות</button>
            </div>
        </header>
    )
}

export default Header