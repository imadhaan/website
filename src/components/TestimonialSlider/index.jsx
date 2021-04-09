import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const testimonialCount = 2;

const TestimonialSlider = ({ intl, className }) => {
  const testimonials = [];

  for (let i = 1; i <= testimonialCount; i++) {
    testimonials.push({
      name: intl.formatMessage({ id: `testimonialName${i}` }),
      text: intl.formatMessage({ id: `testimonialText${i}` }),
    });
  }

  const randomIndex = Math.floor(Math.random() * testimonials.length);

  const quoteMark = (
    <div className="relative">
      <div className="stylistic-quote-mark" aria-hidden="true">
        &ldquo;
      </div>
    </div>
  );

  const renderQuote = testimonial => {
    const { name, text } = testimonial;
    return (
      <blockquote className="pl-14 relative text-xl italic bg-neutral-100 text-neutral-600 border-neutral-500">
        <div className="flex flex-col">
          <cite className="mb-4">{text}</cite>
          <p className="text-sm">{name}</p>
        </div>
      </blockquote>
    );
  };

  const splideModule =
    typeof window !== `undefined` ? require('@splidejs/react-splide') : null;

  if (!splideModule) {
    return renderQuote(testimonials[randomIndex]);
  }

  const { Splide, SplideSlide } = splideModule;

  return (
    <Splide
      className={className}
      options={{
        type: 'loop',
        autoplay: true,
        width: '100%',
        start: randomIndex,
        pagination: false,
      }}
    >
      {testimonials.map(t => (
        <SplideSlide key={t.name}>
          <div className="px-16 flex">
            {quoteMark}
            {renderQuote(t)}
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

TestimonialSlider.propTypes = {
  intl: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default injectIntl(TestimonialSlider);
