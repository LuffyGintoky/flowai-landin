import type React from "react";

declare module "react-calendly" {
  export interface PageSettings {
    backgroundColor?: string;
    hideEventTypeDetails?: boolean;
    hideGdprBanner?: boolean;
    primaryColor?: string;
    textColor?: string;
  }

  export interface InlineWidgetProps {
    url: string;
    prefill?: Record<string, unknown>;
    utm?: Record<string, unknown>;
    styles?: React.CSSProperties;
    pageSettings?: PageSettings;
    className?: string;
  }

  export const InlineWidget: React.FC<InlineWidgetProps>;
}



