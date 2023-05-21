import Link from "next/link"

const NavItem = ({ text, href, active}: any) => {
    return (
        <Link href={href}  className={`nav__item ${active ? "active": ""}`}>
            {text}
        </Link>
    )
}

export default NavItem