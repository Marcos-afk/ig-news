import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ActiveLinkProps } from './types/ActiveLinkProps';

export const ActiveLink = ({ activeClassName, children, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  return <Link {...rest}>{React.cloneElement(children, { className })}</Link>;
};
