import Link from "next/link";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogDetailBottomAction = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-bottom-actions" position={40}>
      <div className="rv-blog-details-tags">
        <h6 className="rv-blog-details-bottom-actions__title">Post Tags:</h6>
        <Link href="#" className="rv-blog-details-tag">
          Education
        </Link>
        <Link href="#" className="rv-blog-details-tag">
          Study
        </Link>
        <Link href="#" className="rv-blog-details-tag">
          LMS
        </Link>
      </div>

      <div className="rv-blog-details-shares">
        <h6 className="rv-blog-details-bottom-actions__title">Share:</h6>
        <div className="rv-1-socials rv-inner-socials">
          <Link href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link href="#">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link href="#">
            <i className="fa-brands fa-discord"></i>
          </Link>
          <Link href="#">
            <i className="fa-brands fa-pinterest"></i>
          </Link>
        </div>
      </div>
    </DivAnimateYAxis>
  );
};

export default BlogDetailBottomAction;
