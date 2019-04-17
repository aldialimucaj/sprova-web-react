import React from 'react';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorList from '@editorjs/list';
import { Card } from 'antd';
import { Button } from 'antd';

interface Props {
  editable?: boolean;
  onSave?: () => void;
}

const Editor: React.FunctionComponent<Props> = ({ editable, onSave }) => {
  const editor = new EditorJS({
    holderId: 'editorjs',
    tools: {
      header: Header,
      list: EditorList,
    },
  });

  const saveEdit = () => {
    editor
      // @ts-ignore
      .save()
      .then((outputData: any) => {
        console.log('Article data: ', outputData);
      })
      .catch((error: Error) => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <Card>
      <div id="editorjs" />
      <Button type="primary" onClick={saveEdit}>
        Save
      </Button>
    </Card>
  );
};

export default Editor;
