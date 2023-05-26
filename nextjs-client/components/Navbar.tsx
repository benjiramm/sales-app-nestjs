import Link from "next/link"
import {  useState } from "react"
import NavItem from "./Link"

const MENU_LIST = [
  { text: "תוצאות התחרות", href: "/" },
  { text: "פריטים שניתן למכור", href: "/items" },
  { text: "התחבר", href: "/login"}
]



const Navbar = () => {
    const [navActive, setNavActive] = useState<boolean | null>(null)
    const [activeIdx, setActiveIdx] = useState(-1)

    return <header>
        <nav>
            <div 
            onClick={() => setNavActive(!navActive)} 
            className={`nav__menu-bar`}
            >
                <div/>
                <div/>
                <div/>
            </div>
            <div className={`${navActive ? "active" : ""} nav__menu-list`}>
                {MENU_LIST.map((menu, idx) => (
                    <div
                    onClick={() => {
                        setActiveIdx(idx)
                        setNavActive(false)
                    }}
                    key={menu.text}
                    >
                        <NavItem active={activeIdx === idx} {...menu}/>
                    </div>
                ))}
            </div>
            <Link href={"/"}>
                <h1 className="logo">תחרות מכירות</h1>
            </Link>     
        </nav>
        
    </header>
}

export default Navbar