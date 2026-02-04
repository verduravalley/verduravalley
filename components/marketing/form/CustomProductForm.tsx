'use client';

import { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslations } from "next-intl";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website?: string;
  productName: string;
  category: string;
  quantity: string;
  description: string;
};

type Props = {
  onSuccess?: () => void;
};

const CustomProductForm = ({ onSuccess }: Props) => {
  const t = useTranslations('contact');
  const tShop = useTranslations('shop');
  const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm<Inputs>({
    mode: "onChange",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isSubmitDisabled = !isValid || !captchaToken || isLoading;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact/custom-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captcha: captchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        if (onSuccess) onSuccess();
        reset();
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        toast.error(result.message || t('submitFailed'));
      }
    } catch (error) {
      console.error(error);
      toast.error(t('submitError'));
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMsg = ({ field }: { field: keyof Inputs }) => (
    errors[field] ? <span style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px', display: 'block' }}>{t('fieldRequired')}</span> : null
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rv-2-contact__form rv-inner-contact__form">
      <div className="row">
        {/* Contact Info */}
        <div className="col-12 mb-10">
          <h6 style={{ color: '#2d6a4f', fontWeight: 700, marginBottom: 0 }}>{t('contactInfo')}</h6>
        </div>
        <div className="col-12">
          <input type="text" placeholder={t('yourName')} disabled={isLoading} {...register("name", { required: true })} />
          <ErrorMsg field="name" />
        </div>
        <div className="col-sm-6 mt-20">
          <input type="email" placeholder={t('email')} disabled={isLoading} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          <ErrorMsg field="email" />
        </div>
        <div className="col-sm-6 mt-20">
          <input type="text" placeholder={t('businessName')} disabled={isLoading} {...register("businessName", { required: true })} />
          <ErrorMsg field="businessName" />
        </div>
        <div className="col-sm-6 mt-20">
          <input type="text" placeholder={t('website')} disabled={isLoading} {...register("website")} />
        </div>
        <div className="col-sm-6 mt-20 mb-10 phone-input-container">
          <Controller
            name="phone"
            control={control}
            rules={{ required: true, minLength: 8 }}
            render={({ field: { onChange, value } }) => (
              <div className="flex-column">
                <PhoneInput
                  country={'eg'}
                  value={value}
                  onChange={onChange}
                  disabled={isLoading}
                  inputProps={{ name: 'phone', required: true }}
                />
                <ErrorMsg field="phone" />
              </div>
            )}
          />
        </div>

        {/* Product Info */}
        <div className="col-12 mt-20 mb-10">
          <h6 style={{ color: '#2d6a4f', fontWeight: 700, marginBottom: 0 }}>{tShop('productInfo')}</h6>
        </div>
        <div className="col-sm-6">
          <input type="text" placeholder={tShop('productName')} disabled={isLoading} {...register("productName", { required: true })} />
          <ErrorMsg field="productName" />
        </div>
        <div className="col-sm-6">
          <input type="text" placeholder={tShop('category')} disabled={isLoading} {...register("category", { required: true })} />
          <ErrorMsg field="category" />
        </div>
        <div className="col-12 mt-20">
          <input type="text" placeholder={tShop('quantity')} disabled={isLoading} {...register("quantity", { required: true })} />
          <ErrorMsg field="quantity" />
        </div>
        <div className="col-12">
          <textarea placeholder={tShop('productDescription')} disabled={isLoading} {...register("description", { required: true })}></textarea>
          <ErrorMsg field="description" />
        </div>

        {/* reCAPTCHA & Submit */}
        <div className="col-12 mb-3 mt-10">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={(value) => setCaptchaToken(value)}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: '#2d6a4f',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              opacity: isSubmitDisabled ? 0.5 : 1,
              cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? t('sending') : tShop('submitRequest')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomProductForm;
