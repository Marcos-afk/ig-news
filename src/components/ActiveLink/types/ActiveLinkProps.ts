import { LinkProps } from 'next/link';
import React from 'react';

export interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName: string;
}
