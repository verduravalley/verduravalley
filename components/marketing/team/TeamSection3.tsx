'use client';

import React, { useEffect } from "react";
import CustomImageAnimate from "../utils/CustomImageAnimate";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboardLeadership } from "@/store/features/leadershipSlice";

import { useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";

const TeamSection3 = () => {
  const dispatch = useAppDispatch();
  const { teamData, status } = useAppSelector((state) => state.leadership);
  const locale = useLocale();
  const isRtl = locale === "ar";

  useEffect(() => {
    dispatch(fetchDashboardLeadership());
  }, [dispatch]);

  return (
    <section className="rv-inner-team rv-section-spacing rv-team-members-section" style={{ paddingTop: 10 }}>
      <div className="container">
        <div className="rv-inner-team-row" suppressHydrationWarning>
          {teamData.length === 0 && status !== 'loading' && status !== 'idle' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center', width: '100%' }}>
              <i className="fa-light fa-users" style={{ fontSize: 48, color: '#d1d5db', display: 'block', marginBottom: 16 }}></i>
              <h5 style={{ color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>No team members yet</h5>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>Team members will appear here once added.</p>
            </div>
          ) : (
          <div className="row row-cols-lg-3 row-cols-2 row-cols-xxs-1 g-30">
            {status === 'loading' || status === 'idle' ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div className="col" key={i}>
                  <div className="rv-9-member rv-inner-member">
                    <div style={{ height: '320px', background: '#e5e7eb', borderRadius: 8 }} className="animate-pulse" />
                    <div className="rv-9-member__txt">
                      <div style={{ height: 12, background: '#e5e7eb', borderRadius: 4, width: '50%', marginBottom: 8 }} className="animate-pulse" />
                      <div style={{ height: 16, background: '#e5e7eb', borderRadius: 4, width: '75%' }} className="animate-pulse" />
                    </div>
                  </div>
                </div>
              ))
            ) : teamData.map((item) => (
              <div className="col" key={item.id}>
                <div className="rv-9-member rv-inner-member">
                  <div className="rv-9-member__img" style={{ height: '320px', overflow: 'hidden' }}>
                    <CustomImageAnimate src={item.img} alt={isRtl && item.title_ar ? item.title_ar : item.title} />
                  </div>

                  <div className="rv-9-member__txt">
                    {/* <div className="rv-9-member-socials rv-inner-member-socials">
                      <div className="rv-1-speaker__socials">
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </div>
                      <div className="rv-9-member-socials__icon">
                        <i className="fa-regular fa-circle-nodes"></i>
                      </div>
                    </div> */}
                    <div>
                      <span className="rv-3-project__sub-title">
                        {isRtl && item.subTitle_ar ? item.subTitle_ar : item.subTitle}
                      </span>
                    </div>
                    <div>
                      <h5 className="rv-3-project__title">
                        <a href="/leadership" aria-label={stripDot(isRtl && item.title_ar ? item.title_ar : item.title, isRtl)}>
                          {stripDot(isRtl && item.title_ar ? item.title_ar : item.title, isRtl)}
                        </a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection3;
