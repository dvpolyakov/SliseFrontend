import { useCallback, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem, Box, Select } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';
import { Whitelist } from '../../../models/models';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import axiosInstance from '../../../utils/axios';
import { BACKEND_URL } from '../../../utils/endpoints';
import { sampleWlIds } from '../../../samples/whitelist-mapper';
import { getCookie } from 'cookies-next';
import MyAvatar from '../../../components/MyAvatar';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function WhitelistsPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);
  const [whitelist, setWhitelist] = useState('');
  const isMountedRef = useIsMountedRef();
  const color = '#F3F4EF';

  const getWhitelists  = useCallback(async () => {
    const sampleWls = sampleWlIds;
    const existsWl = getCookie('whitelists');
    let whitelists: Whitelist[]
    if(existsWl)
      whitelists = JSON.parse(existsWl.toString());
    else {
      const jwt = getCookie('jwt-token');
      if(jwt)
        whitelists = await fetchWhitelists(jwt as string);
      else
        whitelists = [];
    }
    sampleWls.push(...whitelists);
    setWhitelists(sampleWls);
    setWhitelist(findWhitelistById(sampleWls, sampleWls[0].id));
    window.localStorage.setItem('whitelistId', sampleWls[0].id);
  }, [isMountedRef]);

  const findWhitelistId = (name: string) => {
    let id;
    whitelists.map((list: any) => {
      if (list.name === name)
        id = list.id;
    });
    return id;
  }

  const findWhitelistById = (data: any, id: any) => {
    let wl;
    data.map((list: any) => {
      if (list.id === id)
        wl = list.name;
    });
    return wl || '';
  }

  const fetchWhitelists = async (jwt: string): Promise<Whitelist[]> => {
    let wls:Whitelist[] = [];
    try{
      const response = await axiosInstance.get(`${BACKEND_URL}analytics/whitelists`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      console.log(1);
      wls =  response.data.data;
    }
    catch {

    }

    return wls;
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (event: any) => {
    const wl: any = findWhitelistId(event.target.value);
    setWhitelist(event.target.value);
    window.localStorage.setItem('whitelistId', wl);
    window.location.reload();
  };


  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <RootStyle

            >
              <MyAvatar/>

              <Box
                sx={{
                  ml: 2,
                  transition: (theme) =>
                    theme.transitions.create('width', {
                      duration: theme.transitions.duration.shorter,
                    }),

                }}
              >
                <Select sx={{ color: color, width: '150px' }}
                        value={whitelist}
                        onChange={handleChange}
                >
                  {whitelists.map((whitelist: any) => {
                    return (
                      <MenuItem color={color} key={whitelist.id} value={whitelist.name}>
                        {whitelist.name}
                      </MenuItem>
                    )
                  })}

                </Select>

              </Box>
            </RootStyle>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
