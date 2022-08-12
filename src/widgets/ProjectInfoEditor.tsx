import { NoSsr } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react';

const Editor = lazy(() => import('src/components/editor'));

type Props = {
  description: string;
  onChange: any;
};

function ProjectInfoEditor(props: Props) {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCanRender(true);
    }, 0);
  }, []);

  return <NoSsr defer>{canRender && <Editor value={props.description} onChange={props.onChange} simple sx={{ mb: 3 }} />}</NoSsr>;
}

export default ProjectInfoEditor;
