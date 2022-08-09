import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, TextField, IconButton, InputAdornment } from '@mui/material';
//
import Iconify from './Iconify';
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

type Props = {
  value: string;
  label: string;
};

export default function CopyClipboard({ value, label, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    value,
    copied: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ value: event.target.value, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar('Copied!');
    }
  };

  return (
    <TextField
      label={label}
      fullWidth
      value={state.value}
      onChange={handleChange}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={state.value} onCopy={onCopy}>
              <Tooltip title="Copy">
                <IconButton sx={{ width: 40, height: 40, padding: 1 }} size="large">
                  <SvgIconStyle src={`/assets/icons/ic_copy.svg/`} sx={{ width: 1, height: 1 }} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}
