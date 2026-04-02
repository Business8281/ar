import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
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
    }
  }
}

export {};
