import { FormComponentProps } from 'antd/lib/form';
import Plain from 'slate-plain-serializer'
import React, { useEffect, useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { any } from 'prop-types';

interface RichTextEditorProps {
    value: any;
}

export const RichTextEditor: React.FunctionComponent<RichTextEditorProps> = ({ value }) => {
    const [jsonValue, setJsonValue] = useState(Value.isValue(value.value) ? Value.fromJSON(value.value) : Plain.deserialize(
        '#Add description'
    ));

    editor: any;
    let ref = (editor: any) => {
        editor = editor
    }

    let renderNode = (props: any, editor: any, next: any) => {
        const { attributes, children, node } = props

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            default:
                return next()
        }
    }

    let onKeyDown = (event: any, editor: any, next: any) => {
        let mark

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return next()
        }

        event.preventDefault()
        editor.toggleMark(mark)
    }

    let onChange = (v: any) => {
        value.value = v.value;
        setJsonValue(v.value);
    }

    const isBoldHotkey = isKeyHotkey('mod+b')
    const isItalicHotkey = isKeyHotkey('mod+i')
    const isUnderlinedHotkey = isKeyHotkey('mod+u')
    const isCodeHotkey = isKeyHotkey('mod+`')

    return (
        <div>
            <Editor
                readOnly={false}
                value={jsonValue}
                onKeyDown={onKeyDown}
                onChange={onChange}
            />
        </div>
    );
}
