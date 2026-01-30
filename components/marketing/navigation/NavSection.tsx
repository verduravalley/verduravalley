import { useState } from "react";
import Link from "next/link";
type Props = {
  style: string;
};
type DropdownState = {
  home: boolean;
  pages: boolean;
  shop: boolean;
  blog: boolean;
  sustainability: boolean;
};
const NavSection = ({ style }: Props) => {
  const [dropdown, setDropdown] = useState<DropdownState>({
    home: false,
    pages: false,
    shop: false,
    blog: false,
    sustainability: false,
  });

  const handleToggleDropdown = (dropdownName: keyof DropdownState) => {
    if (window.innerWidth < 992) {
      setDropdown((prevState) => ({
        ...prevState,
        [dropdownName]: !prevState[dropdownName],
      }));
    }
  };

  return (
    <div className={`rv-1-header__nav ${style}`}>
      <ul className="justify-content-center">
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <button
            onClick={() => handleToggleDropdown("pages")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "default !important",
              textAlign: "left",
              width: "100%",
            }}
          >About</button>
          <ul className="sub-menu">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/leadership">Leadership</Link>
            </li>
          </ul>
        </li>

        {/* <li className={dropdown.pages ? "rv-dropdown-active" : ""}>
          <button
            onClick={() => handleToggleDropdown("pages")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "default !important",
              textAlign: "left",
              width: "100%",
            }}
          >
            Pages
          </button>
          <ul className="sub-menu">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/services/web-solution">Service Details</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/projects/sustainable-planting-drive">
                Project Details
              </Link>
            </li>
            <li>
              <Link href="/leadership">Team Members</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </li> */}

        <li>
          <Link href="/products">Products</Link>
        </li>
 <li className={dropdown.sustainability ? "rv-dropdown-active" : ""}>
          <button
            onClick={() => handleToggleDropdown("sustainability")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "default !important",
              whiteSpace: "nowrap",
              textAlign: "left",
              width: "100%",
            }}
          >
            Sustainability & Governance 
          </button>
          <ul className="sub-menu">
            <li>
              <Link href="/services/code-of-conduct">Code of Conduct</Link>
            </li>
            <li>
              <Link href="/services/sustainability-governance">Sustainability</Link>
            </li>
          </ul>
        </li>

        {/* <li className={dropdown.blog ? "rv-dropdown-active" : ""}>
          <a role="button" onClick={() => handleToggleDropdown("blog")}>
            Blog
          </a>
          <ul className="sub-menu">
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/blog/finding-creative-flow-organic">Blog Details</Link>
            </li>
          </ul>
        </li> */}

        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSection;
