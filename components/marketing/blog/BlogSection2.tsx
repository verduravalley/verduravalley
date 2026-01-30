import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { blogData3 } from "@/data/Data";
import Link from "next/link";

const BlogSection2 = () => {
  return (
    <section className="rv-12-blogs rv-section-spacing">
      <div className="container">
        <div className="rv-7-section__heading">
          <div>
            <h6 className="rv-7-section__sub-title rv-text-anime">
              Blogs and News
            </h6>
          </div>
          <div>
            <h2 className="rv-7-section__title rv-text-anime">
              Recent Blog Posts
            </h2>
          </div>
        </div>

        <DivAnimateYAxis className="row g-30 justify-content-center">
          {blogData3.slice(9, 12).map((item) => (
            <div
              className="col-lg-4 col-md-6 col-sm-8 col-9 col-xxs-12"
              key={item.id}
            >
              <div>
                <div className="rv-3-blog rv-12-blog">
                  <div className="rv-3-blog__img">
                    <img src={item.img} alt="Blog Image" />
                  </div>

                  <div className="rv-3-blog__txt">
                    <ul className="rv-3-blog__infos">
                      <li className="rv-3-blog__info rv-3-blog__cat">
                        {item.category}
                      </li>
                      <li className="rv-3-blog__info">
                        <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434567/rv-1-icon-4_yxelnb.png" alt="icon" />
                        {item.date}
                      </li>
                    </ul>
                    <h4 className="rv-3-blog__title">
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <Link href={`/blog/${item.slug}`} className="rv-12-blog__btn">
                      Read More <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default BlogSection2;
