import React, { useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Editor } from 'slate-react';
import { Value } from 'slate';

interface RichTextEditorProps {
    value: any;
}

interface Props extends RichTextEditorProps { }

export const RichTextEditor: React.FunctionComponent<Props> = ({ value }) => {

    return (
        <div>
            <Editor
                spellCheck
                autoFocus
                placeholder="Enter some rich text..."
                value={value}
            />
        </div>
    );
}