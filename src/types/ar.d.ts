import * as React from 'react';

type ModelViewerAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  'shadow-softness'?: string;
  'exposure'?: string;
  'environment-image'?: string;
  loading?: string;
  reveal?: string;
  'ios-src'?: string;
  poster?: string;
  slot?: string;
  style?: React.CSSProperties;
  'ar-placement'?: string;
  'enable-pan'?: boolean;
  ref?: React.Ref<any>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

// React 19 + Next 15/16 specific augmentation
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

export {};
