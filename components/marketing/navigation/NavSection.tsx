'use client';

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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
const NavSection = ({ style, onClose }: Props & { onClose?: () => void }) => {
  const t = useTranslations('nav');
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

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`rv-1-header__nav ${style}`}>
      <ul className="justify-content-center">
        <li>
          <Link href="/" onClick={handleLinkClick}>{t('home')}</Link>
        </li>

        <li className={dropdown.pages ? "rv-dropdown-active" : ""}>
          <button
            onClick={() => handleToggleDropdown("pages")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "default !important",
              textAlign: "start",
              width: "100%",
              fontWeight: 500,
              fontFamily: 'inherit',
              color: 'inherit',
              textDecoration: "none"
            }}
          >{t('about')}</button>
          <ul className="sub-menu">
            <li>
              <Link href="/about" onClick={handleLinkClick}>{t('aboutUs')}</Link>
            </li>
            <li>
              <Link href="/leadership" onClick={handleLinkClick}>{t('leadership')}</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/products" onClick={handleLinkClick}>{t('products')}</Link>
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
              textAlign: "start",
              width: "100%",
              fontWeight: 500,
              fontFamily: 'inherit',
              color: 'inherit',
              textDecoration: "none"
            }}
          >
            {t('sustainability')}
          </button>
          <ul className="sub-menu">
            <li>
              <Link href="/services/code-of-conduct" onClick={handleLinkClick}>{t('codeOfConduct')}</Link>
            </li>
            <li>
              <Link href="/services/sustainability-governance" onClick={handleLinkClick}>{t('sustainabilityPage')}</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/contact" onClick={handleLinkClick}>{t('contact')}</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSection;
