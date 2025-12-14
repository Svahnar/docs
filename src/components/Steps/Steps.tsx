import React from 'react';
import './Steps.css';

interface StepProps {
  /** The primary text for the step that shows up next to the indicator */
  title?: string;
  /** The content of a step either as plain text or components */
  children: React.ReactNode;
  /** A Font Awesome icon, Lucide icon, or SVG code */
  icon?: string | React.ReactNode;
  /** One of "regular", "solid", "light", "thin", "sharp-solid", "duotone", "brands" */
  iconType?: "regular" | "solid" | "light" | "thin" | "sharp-solid" | "duotone" | "brands";
  /** Optional step number (if you need to override the CSS counter) */
  stepNumber?: number;
  /** The size of the step title: "h2" (default), or "h3". This determines the actual HTML element rendered. */
  titleSize?: "h2" | "h3";
  /** Optional ID for deep linking. If not provided, one will be generated from the title. */
  id?: string;
}

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -

export const Step: React.FC<StepProps> = ({
  title,
  children,
  icon,
  iconType,
  stepNumber,
  titleSize = "h2",
  id,
}) => {
  const stepId = id || (title ? slugify(title) : undefined);
  const TitleTag = titleSize;

  return (
    <div className="step">
      <div className="step-header">
        {icon && (
          <div className="step-icon">
            {typeof icon === "string" ? (
              <i className={`${iconType} ${icon}`}></i>
            ) : (
              icon
            )}
          </div>
        )}
        {title ? (
          <TitleTag className="step-title" id={stepId}>
            {title}
            <a href={`#${stepId}`} className="step-anchor-link" aria-label={`Link to ${title}`}>
              #
            </a>
          </TitleTag>
        ) : null}
      </div>
      <div className="step-content">{children}</div>
    </div>
  );
};

interface StepsProps {
  /** An array of Step components */
  children: React.ReactNode;
  /** The size of the step titles: "h2" (default), or "h3" */
  titleSize?: "h2" | "h3";
}

export const Steps: React.FC<StepsProps> = ({ children, titleSize = "h2" }) => {
  const stepsWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<StepProps>, { titleSize });
    }
    return child;
  });

  return <div className="steps">{stepsWithProps}</div>;
};