import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import BalanceIcon from '@mui/icons-material/Balance';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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
  solar: <Iconify icon='mdi:solar-power' sx={{ width: "24px", height: "24px" }} />,
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
          { title: 'dashboard', path: paths.dashboard.root, icon: ICONS.dashboard, tooltip: "View your personalized dashboard with project updates, contributions, and AI insights." },
          { title: 'AI Chat', path: paths.dashboard.chat, icon: ICONS.chat, tooltip: "Interact with AI agents for real-time collaboration and support on your projects." },
          { title: 'Discover & Innovate', path: paths.dashboard.discover, icon: <LightbulbIcon />, tooltip: "Explore and participate in cutting-edge AI projects and innovations created by the community." },
          { title: 'Solar', path: paths.dashboard.solar, icon: ICONS.solar, tooltip: "" },
          { title: 'Create AI Project', path: paths.dashboard.createproject, icon: <AddIcon />, tooltip: "Launch your AI agent or orchestrate a collective of AI agents, enriching the ecosystem with your unique contributions." },
          {
            title: 'Knowledge Base Marketplace & Partners', path: paths.dashboard.knowledge.private, icon: <LocalGroceryStoreIcon />, tooltip: "Access a curated repository of files, documents, and AI models essential for your projects. Dive into the marketplace for AI tools and solutions, and forge connections with potential partners.", children: [
              { title: 'Private', path: paths.dashboard.knowledge.private, icon: <SecurityIcon />, tooltip: "" },
              { title: 'Public', path: paths.dashboard.knowledge.public, icon: <PublicIcon />, tooltip: "" },
              { title: 'Other', path: paths.dashboard.knowledge.other, icon: <Diversity3Icon />, tooltip: "" },
              { title: 'Knowledgebase Graph', path: paths.dashboard.knowledge.graph, icon: <SsidChartIcon />, tooltip: "" },
              { title: 'Settings', path: paths.dashboard.knowledge.settings, icon: <SettingsIcon />, tooltip: "" },
            ]
          },
          { title: 'Balance', path: paths.dashboard.balance, icon: <BalanceIcon />, tooltip: "" },
          {
            title: 'Travel', path: paths.dashboard.travel.root, icon: <TravelExploreIcon />, tooltip: "", children: [
              { title: 'Buy Airline Tickets', path: paths.dashboard.travel.newOrder, icon: <Iconify icon="material-symbols:airplane-ticket-outline" />, tooltip: "" },
              { title: 'Choose Airlines', path: `${paths.dashboard.travel.root}/airline`, icon: <Iconify icon="fluent-emoji-high-contrast:airplane-departure" />, tooltip: "" },
              { title: 'My Reservations', path: `${paths.dashboard.travel.order}`, icon: <Iconify icon="icon-park-outline:transaction-order" />, tooltip: "" },
            ]
          },
          {
            title: 'Deliver', path: paths.dashboard.deliver.root, icon: <Iconify icon="grommet-icons:deliver" sx={{ width: '22px', height: '22px' }} />, tooltip: "", children: [
              { title: 'Find your Taste', path: paths.dashboard.deliver.root, icon: <Iconify icon="icon-park-solid:baby-taste" />, tooltip: "" },
              { title: 'Restaurants', path: paths.dashboard.deliver.restaurant, icon: <Iconify icon="material-symbols:restaurant" />, tooltip: "" },
              { title: 'Stores', path: paths.dashboard.deliver.store, icon: <Iconify icon="material-symbols:store-outline" />, tooltip: "" },
              { title: 'Orders', path: paths.dashboard.deliver.order, icon: <Iconify icon="fluent-emoji-high-contrast:shopping-cart" />, tooltip: "" },
              {
                title: 'My Slice', path: paths.dashboard.deliver.me.root, icon: <Iconify icon="mdi:account-tag-outline" />, tooltip: "", children: [
                  { title: 'Favorites', path: paths.dashboard.deliver.me.root, icon: <Iconify icon="mdi:heart-outline" />, tooltip: "" },
                  { title: 'Order Again', path: paths.dashboard.deliver.me.orderAgain, icon: <Iconify icon="mdi:reload" />, tooltip: "" },
                  { title: 'Order Hostory', path: paths.dashboard.deliver.me.orderHistory, icon: <Iconify icon="ic:baseline-history" />, tooltip: "" },
                  { title: 'Address', path: paths.dashboard.deliver.me.address, icon: <Iconify icon="ph:address-book" />, tooltip: "" },
                ]
              },
            ]
          },
          { title: 'My AI Wallet', path: paths.dashboard.wallet, icon: <AccountBalanceWalletIcon />, tooltip: "Manage your tokens, track transactions, and finance your AI endeavors seamlessly." },
          { title: 'Community Feed', path: paths.dashboard.community, icon: <PeopleIcon />, tooltip: "Immerse in the latest updates, collaborative discussions, and community-driven insights." },
          { title: 'Settings', path: paths.dashboard.settings, icon: <SettingsIcon />, tooltip: "Tailor your Updated.com experience with customizable account settings and preferences." },
          { title: 'Help & Support', path: paths.dashboard.help, icon: <HelpIcon />, tooltip: "Access comprehensive support and resources to navigate Updated.com effortlessly." },
          { title: 'Logout', path: paths.dashboard.agents, icon: <LogoutIcon />, tooltip: "Securely exit your account with just a click." },
          // { title: 'agents', path: paths.dashboard.agents, icon: ICONS.agents, tooltip: "test" },
        ],
      },

      // // MANAGEMENT
      // // ----------------------------------------------------------------------
      // {
      //   subheader: 'management',
      //   items: [
      //     {
      //       title: 'user',
      //       path: paths.dashboard.group.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: 'four', path: paths.dashboard.group.root },
      //         { title: 'five', path: paths.dashboard.group.five },
      //         { title: 'six', path: paths.dashboard.group.six },
      //       ],
      //     },
      //   ],
      // },
    ],
    []
  );

  return data;
}
