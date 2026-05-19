import Image from "next/image";
import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlinePayments, MdOutlineSupportAgent, MdOutlineTouchApp } from "react-icons/md";

const ChoosePlayzone = () => {
  return (
    <div>
      <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-6">
              Why Players Choose PlayZone?
            </h2>
            <p className="text-body-lg text-secondary mb-8">
              We provide a seamless experience for sports enthusiasts to
              discover and access the best facilities without the hassle of
              traditional booking methods.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="touch_app"
                  >
                    <MdOutlineTouchApp />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Easy Booking</h4>
                  <p className="text-sm text-secondary">
                    Book your spot in under 60 seconds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="bolt"
                  >
                    <AiOutlineThunderbolt />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Instant Confirmation</h4>
                  <p className="text-sm text-secondary">
                    Real-time calendar updates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="payments"
                  >
                    <MdOutlinePayments />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Best Price</h4>
                  <p className="text-sm text-secondary">
                    Exclusive deals and no hidden fees.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="support_agent"
                  >
                    <MdOutlineSupportAgent />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">24/7 Support</h4>
                  <p className="text-sm text-secondary">
                    Dedicated team at your service.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              alt="Sports Action"
              className="rounded-3xl shadow-2xl"
              src="/assets/playground.png"
              width={500}
              height={300}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-outline-variant">
              <p className="text-primary font-bold text-4xl">99%</p>
              <p className="text-secondary font-label-md">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChoosePlayzone;
