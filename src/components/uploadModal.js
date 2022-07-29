import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import axiosInstance from 'src/utils/axios';
// @mui
import {Box, Button, CircularProgress, Grid, TextField, Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import useIsMountedRef from '../hooks/useIsMountedRef';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile(props) {
  let formData = new FormData();
  const [whitelistName, setWhitelistName] = useState('');
  const [errors, setErrors] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const onDropFile = useCallback((acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
    console.log(whitelistName.length);
    // if (whitelistName.length === 0) {
    //   setErrors('Enter collection name!');
    // }
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // if (!formData.get('file')) {
        //   formData.append("file", file, file.name);
        // }
      }
      reader.readAsArrayBuffer(file)
    })
  }, [whitelistName]);

  const isMountedRef = useIsMountedRef();
  const {acceptedFiles, getRootProps, getInputProps, fileRejections} = useDropzone({
    onDrop: onDropFile,
    multiple: false
  });


  const upload = useCallback(async () => {
    console.log(uploadedFile);
    formData.append('file', uploadedFile);
    formData.append('collectionName', whitelistName);
    const response = await axiosInstance.post('https://daoanalytics.herokuapp.com/api/analytics/storeWhitelist', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });
    if (response.data.data) {
      const existStoredWhitelists = JSON.parse(window.localStorage.getItem('storedWhitelists'));
      let storedWhitelists;
      const whitelist = {
        id: response.data.data.id,
        name: whitelistName
      }
      if (existStoredWhitelists) {
        existStoredWhitelists.whitelists.push(whitelist);
        window.localStorage.setItem('storedWhitelists', JSON.stringify(existStoredWhitelists));
      } else {
        storedWhitelists = {
          whitelists: [
            {
              id: response.data.data.id,
              name: whitelistName
            }
          ]
        };
        window.localStorage.setItem('storedWhitelists', JSON.stringify(storedWhitelists));
      }
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        window.location.reload(false);
      }, 10000);

    }
  }, [uploadedFile, whitelistName]);


  const handleChangeData = (props) => {
    setWhitelistName(props.target.value);
  }

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  if(loader){
    return(
      <Box sx={{width: '100%'}}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '50vh' }}
        >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{width: '100%'}}>
      <Typography align='left' variant='h6'>Add Your Collection</Typography>
      <Box
        component="form"
        sx={{
          paddingTop: '40px',
          paddingBottom: '20px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required={true} value={whitelistName} onChange={handleChangeData} fullWidth
                   placeholder="Collection Name" color="grey"
                   variant="outlined"/>

      </Box>
      <Box sx={{
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '15px',
        paddingLeft: '15px',
        paddingBottom: '20px',
        borderRadius: '10px',

        backgroundColor: ' #F4F6F8',
        border: `1px dashed grey`,
        '&:hover': {opacity: 0.72, cursor: 'pointer'},
      }}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <Typography variant="h5" sx={{paddingBottom: '10px'}}>Drop or Select file</Typography>
          <Typography sx={{fontSize: '14px'}}>Drop the file here or click <u>browse</u> through your
            machine</Typography>
        </div>
        <aside>

          <ul>{files}</ul>
          <p style={{color: "red", padding: 5, margin: 0, fontSize: 14}}>
            {errors}
          </p>
        </aside>
      </Box>
      <Typography align='center' sx={{fontSize: '12px', paddingTop: '16px'}}>
        Upload the *.csv file of your whitelist. <br/> Max size of 3.1 MB
      </Typography>
      <Box textAlign='right' sx={{marginTop: '40px'}}>
        <Button variant="outlined" onClick={props.close} sx={{
          backgroundColor: 'white',
          color: 'black',
          marginRight: '15px',
          border: '1px solid rgba(236, 236, 236, .95)',
          ':hover': {opacity: '.6', backgroundColor: 'white', border: '1px solid rgba(236, 236, 236, .9)'}
        }}>
          Cancel
        </Button>

        <Button onClick={upload} type="submit" variant="contained" sx={{backgroundColor: 'grey'}}>
          Add
        </Button>

      </Box>
    </Box>
  );
}
