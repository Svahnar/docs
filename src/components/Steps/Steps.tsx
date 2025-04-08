import React from 'react';
import './Steps.css';

interface StepProps {
  /** The primary text for the step that shows up next to the indicator */
  title: string;
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
}

export const Step: React.FC<StepProps> = ({
  title,
  children,
  icon,
  iconType,
  stepNumber,
  titleSize = "h2",
}) => {
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
        {titleSize === "h2" ? (
          <h2 className="step-title">{title}</h2>
        ) : (
          <h3 className="step-title">{title}</h3>
        )}
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