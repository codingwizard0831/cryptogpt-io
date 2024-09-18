import { m } from 'framer-motion';
import { useMemo, useState, useEffect, useCallback } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { flags } from 'src/assets/data';
import { getUserProfileInfo } from 'src/auth/context/jwt/utils';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const user_profile = getUserProfileInfo();
  const allLangs = useMemo(() => user_profile?.languages || [], [user_profile?.languages]);
  const popover = usePopover();
  const [currentLang, setCurrentLang] = useState<any>(null);

  useEffect(() => {
    if (allLangs.length > 0 && !currentLang) {
      setCurrentLang(allLangs[0]);
    }
  }, [allLangs, currentLang]);

  const handleChangeLang = useCallback((lang: typeof allLangs[0]) => {
    console.log('lang', lang);
    setCurrentLang(lang);
    popover.onClose();
  }, [popover]);

  return (
    <>
      {currentLang?.code && <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...(popover.open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={flags[currentLang.code].icon} sx={{ borderRadius: 0.65, width: 28 }} />
      </IconButton>}

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {allLangs.length > 0 && allLangs.map((option) => (
          <MenuItem
            key={option.code}
            selected={option.code === currentLang?.code}
            onClick={() => handleChangeLang(option)}
          >
            <Iconify icon={flags[option.code].icon} sx={{ borderRadius: 0.65, width: 28, mr: 1 }} />
            {flags[option.code].name}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
