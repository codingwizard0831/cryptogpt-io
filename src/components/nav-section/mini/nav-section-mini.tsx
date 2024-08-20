import { memo } from 'react';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavProps, NavGroupProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionMini({ data, slotProps, sx, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-mini" alignItems="center" spacing={`${slotProps?.gap || 4}px`} sx={{
      p: '2px',
      width: '400px',
      maxHeight: '340px',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      pointerEvents: 'none',
      ...sx,
    }} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

function Group({ items, slotProps }: NavGroupProps) {
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      ))}
    </>
  );
}
