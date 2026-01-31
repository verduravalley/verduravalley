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
const NavSection = ({ style }: Props) => {
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

  return (
    <div className={`rv-1-header__nav ${style}`}>
      <ul className="justify-content-center">
        <li>
          <Link href="/">{t('home')}</Link>
        </li>

        <li>
          <button
            onClick={() => handleToggleDropdown("pages")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "default !important",
              textAlign: "start",
              width: "100%",
            }}
          >{t('about')}</button>
          <ul className="sub-menu">
            <li>
              <Link href="/about">{t('aboutUs')}</Link>
            </li>
            <li>
              <Link href="/leadership">{t('leadership')}</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/products">{t('products')}</Link>
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
            }}
          >
            {t('sustainability')}
          </button>
          <ul className="sub-menu">
            <li>
              <Link href="/services/code-of-conduct">{t('codeOfConduct')}</Link>
            </li>
            <li>
              <Link href="/services/sustainability-governance">{t('sustainabilityPage')}</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/contact">{t('contact')}</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSection;
