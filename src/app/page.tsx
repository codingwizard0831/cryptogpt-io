'use client';

import { useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.home);
  }, [router]);

  return null;
}
