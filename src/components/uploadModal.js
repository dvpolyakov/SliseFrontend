import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button } from '@mui/material';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Box sx={{ width: '100%' }}>
      <Typography align='left' variant='h6'>Add Your Collection</Typography>
      <Box
      component="form"
      sx={{
        paddingTop:'40px',
        paddingBottom:'20px'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField fullWidth placeholder="Title" color="grey" variant="outlined" />
  
    </Box>
    <Box sx={{
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '17px',
        paddingLeft:'15px',
        paddingBottom:'20px',
        borderRadius: '10px',
        
        backgroundColor: ' #F4F6F8',
        border: `1px dashed grey`,
        '&:hover': { opacity: 0.72, cursor: 'pointer' },
    }}>
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="h5" sx={{paddingBottom:'10px'}}>Drop or Select file</Typography>
        <Typography sx={{fontSize:'14px'}}>Drop the file here or click <u>browse</u> through your machine</Typography>
      </div>
      <aside>
     
        <ul>{files}</ul>
      </aside>
      </Box>
      <Typography align='center' sx={{fontSize:'12px', paddingTop:'26px'}}>
      Upload the *.csv file of your whitelist. <br/> Max size of 3.1 MB
      </Typography>
      <Box textAlign='right' sx={{marginTop:'40px'}}>
      <Button variant="outlined"onClick={props.close} sx={{backgroundColor:'white', color:'black', marginRight:'15px',border: '1px solid rgba(236, 236, 236, .95)',':hover':{opacity: '.6', backgroundColor:'white',border: '1px solid rgba(236, 236, 236, .9)'}}}>
  Cancel
</Button>
<Button variant="contained" sx={{backgroundColor:'grey'}} disabled>
  Add
</Button>
</Box>
    </Box>
  );
}
