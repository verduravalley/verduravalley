'use client';

import { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website?: string;
  subject: string;
  msg: string;
};
type Props = {
  innerPage?: boolean;
  isModal?: boolean;
  productInfo?: {
    name: string;
    slug: string;
  };
  onSuccess?: () => void;
};
const ContactForm = ({ innerPage, isModal, productInfo, onSuccess }: Props) => {
  const t = useTranslations('contact');
  const tShop = useTranslations('shop');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: productInfo ? {
      subject: tShop('inquirySubject', { name: productInfo.name }),
      msg: tShop('inquiryMessage', { name: productInfo.name, slug: productInfo.slug })
    } : {}
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isSubmitDisabled = !isValid || !captchaToken || isLoading;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          captcha: captchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          setShowSuccessModal(true);
        }
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

  const onCaptchaChange = (value: string | null) => {
    setCaptchaToken(value);
  };

  // Helper to render error messages
  const ErrorMsg = ({ field }: { field: keyof Inputs }) => (
    errors[field] ? <span style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px', display: 'block' }}>{t('fieldRequired')}</span> : null
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`rv-2-contact__form ${
        innerPage ? "rv-inner-contact__form" : ""
      }`}
    >
      <div className="row">
        <div className={isModal ? "col-12" : "col-sm-6"}>
          <input
            type="text"
            id="rv-2-contact-name"
            placeholder={t('yourName')}
            disabled={isLoading}
            {...register("name", { required: true })}
          />
          <ErrorMsg field="name" />
        </div>
        <div className={isModal ? "col-12 mt-20" : "col-sm-6"}>
          <input
            type="email"
            id="rv-2-contact-email"
            placeholder={t('email')}
            disabled={isLoading}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <ErrorMsg field="email" />
        </div>

        <div className={isModal ? "col-12 mt-20" : "col-sm-6 mt-20 mt-sm-0"}>
          <input
            type="text"
            id="rv-2-contact-business"
            placeholder={t('businessName')}
            disabled={isLoading}
            {...register("businessName", { required: true })}
          />
          <ErrorMsg field="businessName" />
        </div>

        <div className={isModal ? "col-12 mt-20" : "col-sm-6 mt-20 mt-sm-0"}>
          <input
            type="text"
            id="rv-2-contact-website"
            placeholder={t('website')}
            disabled={isLoading}
            {...register("website")}
          />
        </div>

        <div className="col-12 mt-20 mb-10 phone-input-container">
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
                  inputProps={{
                    name: 'phone',
                    required: true,
                  }}
                />
                <ErrorMsg field="phone" />
              </div>
            )}
          />
        </div>

        <div className="col-12">
          <select id="rv-2-contact-subject" disabled={isLoading} {...register("subject", { required: true })}>
            <option value="" hidden>
              {t('selectSubject')}
            </option>
            <option value="General Inquiry">{t('generalInquiry')}</option>
            <option value="Custom Project">{t('customProject')}</option>
            <option value="Partnership Offer">{t('partnershipOffer')}</option>
            <option value="others">{t('others')}</option>
          </select>
          <ErrorMsg field="subject" />
        </div>
        <div className="col-12">
          <textarea
            id="rv-2-contact-message"
            placeholder={t('message')}
            disabled={isLoading}
            {...register("msg", { required: true })}
          ></textarea>
          <ErrorMsg field="msg" />
        </div>
        <div className="col-12 mb-3 mt-10">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={onCaptchaChange}
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
            {isLoading ? t('sending') : t('sendMessage')}
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="rv-contact-modal-overlay">
          <div className="rv-contact-modal">
            <div className="rv-contact-modal__icon">
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <h3 className="rv-contact-modal__title">{stripDot(t('thankYou'), isAr)}</h3>
            <p className="rv-contact-modal__text">{t('receivedMessage')}</p>
            <button
              type="button"
              className="rv-contact-modal__btn"
              onClick={() => setShowSuccessModal(false)}
            >
              {t('okay')}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
