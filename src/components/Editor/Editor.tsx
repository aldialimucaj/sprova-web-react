import React from 'react';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorList from '@editorjs/list';
import { Card } from 'antd';

interface Props {
  editable: boolean;
  onSave: () => void;
}

const Editor: React.FunctionComponent = () => {
  const editor = new EditorJS({
    holderId: 'editorjs',
    tools: {
      header: Header,
      list: EditorList,
    },
  });

  return (
    <Card>
      <div id="editorjs" />
    </Card>
  );
};

export default Editor;
