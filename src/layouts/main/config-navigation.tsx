import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Components',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.dashboard.root,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: paths.dashboard.root },
          { title: 'Contact us', path: paths.dashboard.root },
          { title: 'FAQs', path: paths.dashboard.root },
          { title: 'Pricing', path: paths.dashboard.root },
          { title: 'Payment', path: paths.dashboard.root },
          { title: 'Maintenance', path: paths.dashboard.root },
          { title: 'Coming Soon', path: paths.dashboard.root },
        ],
      },
      {
        subheader: 'Concepts',
        items: [
          { title: 'Shop', path: paths.dashboard.root },
          { title: 'Product', path: paths.dashboard.root },
          { title: 'Checkout', path: paths.dashboard.root },
          { title: 'Posts', path: paths.dashboard.root },
          { title: 'Post', path: paths.dashboard.root },
        ],
      },
      {
        subheader: 'Auth Demo',
        items: [
          { title: 'Login', path: paths.dashboard.root },
          { title: 'Register', path: paths.dashboard.root },
          {
            title: 'Forgot password',
            path: paths.dashboard.root,
          },
          { title: 'New password', path: paths.dashboard.root },
          { title: 'Verify', path: paths.dashboard.root },
          { title: 'Login (modern)', path: paths.dashboard.root },
          { title: 'Register (modern)', path: paths.dashboard.root },
          {
            title: 'Forgot password (modern)',
            path: paths.dashboard.root,
          },
          {
            title: 'New password (modern)',
            path: paths.dashboard.root,
          },
          { title: 'Verify (modern)', path: paths.dashboard.root },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: paths.dashboard.root },
          { title: 'Page 404', path: paths.dashboard.root },
          { title: 'Page 500', path: paths.dashboard.root },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
  {
    title: 'Docs',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.dashboard.root,
  },
];
