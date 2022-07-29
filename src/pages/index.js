import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from 'src/config';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      replace(PATH_AFTER_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
