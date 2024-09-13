import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  knowledge: icon('ic_analytics'),
  agents: icon('ic_job'),
  discover: <Iconify icon='iconamoon:discover-bold' sx={{ width: "24px", height: "24px" }} />,
  tracking: <Iconify icon='material-symbols:eye-tracking-outline-rounded' sx={{ width: "24px", height: "24px" }} />,
  trading: <Iconify icon='icon-park-twotone:chart-stock' sx={{ width: "24px", height: "24px" }} />,
  knowledgebase: <Iconify icon='icon-park-solid:brain' sx={{ width: "24px", height: "24px" }} />,
  wallet: <Iconify icon='lets-icons:wallet-fill' sx={{ width: "24px", height: "24px" }} />,
  reward: <Iconify icon='ri:hand-coin-fill' sx={{ width: "24px", height: "24px" }} />,
  crgpt: <Iconify icon='ri:coin-fill' sx={{ width: "24px", height: "24px" }} />,
  strategy: <Iconify icon='et:strategy' sx={{ width: "24px", height: "24px" }} />,
  profile: <Iconify icon='carbon:user-profile' sx={{ width: "24px", height: "24px" }} />,
  account: <Iconify icon='uil:setting' sx={{ width: "24px", height: "24px" }} />,
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: ' ',
        items: [
          { title: 'DASHBOARD', path: paths.dashboard.root, icon: ICONS.dashboard, tooltip: "" },
          { title: 'AI TRADING', path: paths.dashboard.trading, icon: ICONS.trading, tooltip: "" },
          { title: 'TRACKING', path: paths.dashboard.tracking, icon: ICONS.tracking, tooltip: "" },
          { title: 'STRATEGY', path: paths.dashboard.strategy.root, icon: ICONS.strategy, tooltip: "" },
          { title: 'DISCOVER', path: paths.dashboard.user.root, icon: ICONS.discover, tooltip: "" },
          { title: 'KNOWLEDGE BASE', path: paths.dashboard.user.root, icon: ICONS.knowledgebase, tooltip: '' },
          { title: 'MY WALLET', path: paths.dashboard.user.root, icon: ICONS.wallet, tooltip: "" },
          { title: 'REWARDS', path: paths.dashboard.user.root, icon: ICONS.reward, tooltip: "", },
          { title: 'BUY/SWAP CRGPT', path: paths.dashboard.user.root, icon: ICONS.crgpt, tooltip: "" },
          { title: 'PROFILE', path: paths.dashboard.user.profile, icon: ICONS.profile, tooltip: "" },
          { title: 'SETTING', path: paths.dashboard.user.account, icon: ICONS.account, tooltip: "" },
        ],
      },
    ],
    []
  );

  return data;
}
