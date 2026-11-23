'use client';
import { useRouter } from 'next/navigation';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';

// Ersatz für next/link: vinext 1.0.0-beta.3 verliert im Node-Build `navigateClientSide`,
// dadurch funktionieren Klicks auf <Link> nicht. useRouter().push ist davon nicht betroffen.
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; replace?: boolean; scroll?: boolean; prefetch?: boolean };

export default function Link({ href, replace = false, scroll = true, prefetch: _prefetch, onClick, target, ...rest }: Props) {
  const router = useRouter();
  void _prefetch;
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== '_self') return;
    if (href.startsWith('#') || /^(mailto:|tel:|https?:)/.test(href)) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    // Anker auf derselben Seite: Browser scrollen lassen.
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
    event.preventDefault();
    if (replace) router.replace(href, { scroll }); else router.push(href, { scroll });
  }
  return <a href={href} target={target} onClick={handleClick} {...rest}/>;
}
