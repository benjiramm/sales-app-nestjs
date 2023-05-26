import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavItem = ({ text, href, active}: any) => {
    return (
        <Link href={href}  className={`nav__item ${active ? "active": ""}`}>
            {" " + text}
        </Link>
    )
}

export default NavItem