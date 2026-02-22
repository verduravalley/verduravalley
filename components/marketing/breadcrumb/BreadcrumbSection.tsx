'use client';

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  currentPage?: string;
};
const BreadcrumbSection = ({ title, currentPage }: Props) => {
  const t = useTranslations('breadcrumb');

  return (
    <div className="rv-breadcrumb py-4">
      <div className="container">
        <h1 className="rv-breadcrumb__title">{title}</h1>

        {/* <ul className="rv-breadcrumb__nav d-flex justify-content-center">
          <li>
            <Link href="/">
              <i className="fa-solid fa-sharp fa-home"></i> {t('home')}
            </Link>
          </li>
          <li className="current-page">
            <span className="dvdr"> &#47;</span>
            <span>{currentPage ? currentPage : title}</span>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default BreadcrumbSection;
