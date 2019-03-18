import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

interface RichTextEditorProps {
  value: any;
}

export const RichTextEditor: React.FunctionComponent<RichTextEditorProps> = ({
  value,
}) => {
  return (
    <div>
      <Editor
        autoFocus={true}
        spellCheck={true}
        placeholder="Enter some rich text..."
        value={value}
      />
    </div>
  );
};
