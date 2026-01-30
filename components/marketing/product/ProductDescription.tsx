type Props = {
  description?: string;
};

const ProductDescription = ({ description }: Props) => {
  return (
    <div className="rv-product-details__descr">
      <h6 className="rv-product-details-bottom__title">Product Description</h6>
      <div 
        className="rv-product-details__long-descr"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </div>
  );
};

export default ProductDescription;
