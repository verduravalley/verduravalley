'use client';

import { useEffect, useRef, useState } from "react";
import NavSection from "../navigation/NavSection";
import { useAppDispatch } from "@/store/hooks";
import { toggleSearchModalOpen } from "@/store/features/searchModalSlice";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import CloudinaryImage from "@/components/CloudinaryImage";

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations('header');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const openSearchModal = () => {
    dispatch(toggleSearchModalOpen());
  };

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setIsHeaderFixed(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200 && !isSidebarOpen) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSidebar]);
  return (
    <header className="rv-1-header rv-inner-header p-0">
      <div
        className={`rv-20-header-bottom to-be-fixed${isHeaderFixed ? " fixed" : ""}`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <div className="rv-1-logo">
                <Link href="/">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
                    alt="logo"
                    className="logo"
                    width={90}
                    height={30}
                    priority={true}
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-10 col-6 order-2 order-lg-1">
              <div className="d-flex align-items-center justify-content-end justify-content-lg-between">
                <div
                  className={`rv-1-header-nav__sidebar${isSidebarOpen ? " active" : ""}`}
                  ref={sidebarRef}
                >
                  <div className="sidebar-heading d-lg-none d-flex align-items-center justify-content-between">
                    <Link href="/" className="logo-container">
                      <CloudinaryImage
                        src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
                        alt="logo"
                        width={90}
                        height={30}
                      />
                    </Link>
                    <button
                      className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-20-mobile-menu-btn sidebar-close-btn"
                      onClick={closeSidebar}
                      aria-label="Close menu"
                    >
                      <i className="fa-regular fa-xmark" aria-hidden="true"></i>
                    </button>
                  </div>

                  <NavSection style="rv-20-header__nav" onClose={closeSidebar} />
                </div>

                <div className="d-flex justify-content-end align-items-center gap-2 flex-nowrap">
                  <button
                    onClick={switchLocale}
                    className="rv-lang-switch-btn"
                    style={{
                      background: 'none',
                      border: '1px solid rgba(0,0,0,0.15)',
                      borderRadius: '20px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--rv-pr-1, #333)',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      textDecoration: 'none',
                    }}
                  >
                    <Globe size={14} />
                    {tc('switchLang')}
                  </button>
                  <div className="rv-inner-header-right-btns rv-15-header-right-btns rv-20-header-bottom-right-btns">
                    <Link href="/contact" className="d-sm-inline-block d-none">
                      {t('talkToExperts')}
                    </Link>
                  </div>
                  <button
                    className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-20-mobile-menu-btn d-lg-none d-inline-block"
                    id="rv-1-header-mobile-menu-btn"
                    onClick={openSidebar}
                    aria-label="Open menu"
                    aria-expanded={isSidebarOpen}
                  >
                    <i className="fa-regular fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
