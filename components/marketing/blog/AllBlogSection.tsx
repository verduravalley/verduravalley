import { blogData3 } from "@/data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import Link from "next/link";

const AllBlogSection = () => {
  return (
    <section className="rv-inner-blogs rv-section-spacing">
      <div className="container">
        <div className="rv-inner-blogs__row">
          {blogData3.slice(0, 9).map((item) => (
            <DivAnimateYAxis
              duration={1.2 + 0.1 * item.id}
              className={`rv-1-blog rv-inner-blog ${
                item.big ? "rv-inner-blog--big" : ""
              } ${item.small ? "rv-inner-blog--small" : ""}`}
              key={item.id}
            >
              <div className="rv-1-blog__img">
                <img src={item.img} alt="Blog Image" />
              </div>

              <div className="rv-1-blog__txt">
                <ul className="rv-1-blog__infos">
                  <li>
                    <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434567/rv-1-icon-4_yxelnb.png" alt="icon" />{" "}
                    {item.date}
                  </li>
                  <li>
                    <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434568/rv-1-icon-5_yqy2lf.png" alt="icon" />{" "}
                    {item.comments} Comments
                  </li>
                </ul>
                <div>
                  <h4 className="rv-1-blog__title">
                    <Link href={`/blog/${item.slug}`}>{item.title}.</Link>
                  </h4>
                </div>

                <Link
                  href={`/blog/${item.slug}`}
                  className="rv-1-schedule-conf__btn rv-1-blog__btn"
                >
                  Read More <i className="fa-light fa-arrow-right"></i>
                </Link>
              </div>
            </DivAnimateYAxis>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogSection;
