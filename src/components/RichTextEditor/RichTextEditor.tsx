import { Button, Icon, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { isKeyHotkey } from 'is-hotkey';
import { any } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import "./styles.scss";

interface RichTextEditorProps {
    content: any;
    toolbar?: boolean;
}
interface TextEditorProps {
    value: Value;
}

interface ToolbarButtonProps {
    icon: string;
    type: string;
    active: boolean;
    onClick: any;
}

export const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = ({ icon, type, active, onClick }) => {
    const white = { color: '#aaa' };
    const shouldStyle = active ? undefined : white;

    return (
        <Icon type={icon}
            style={shouldStyle}
            onClick={(event: any) => onClick(event, type)}
        />
    );
};

export const Toolbar: React.FunctionComponent = ({ children }) => {

    return (
        <div className="toolbar">
            {children}
        </div>
    );
};

export const RichTextEditor: React.FunctionComponent<RichTextEditorProps> = ({ content, toolbar = true }) => {
    const [jsonValue, setJsonValue] = useState(content && content.value ?
        Value.fromJSON(content.value) :
        Plain.deserialize(''));

    let editorRef: any;
    const ref = (editor: any) => {
        editorRef = editor;
    };

    const renderNode = (props: any, editor: any, next: any) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>;
            default:
                return next();
        }
    };

    const renderMark = (props: any, editor: any, next: any) => {
        const { children, mark, attributes } = props;

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>;
            case 'code':
                return <code {...attributes}>{children}</code>;
            case 'italic':
                return <em {...attributes}>{children}</em>;
            case 'underlined':
                return <u {...attributes}>{children}</u>;
            default:
                return next();
        }
    };

    const onKeyDown = (event: any, editor: any, next: any) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = 'bold';
        } else if (isItalicHotkey(event)) {
            mark = 'italic';
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined';
        } else if (isCodeHotkey(event)) {
            mark = 'code';
        } else {
            return next();
        }

        event.preventDefault();
        editor.toggleMark(mark);
    };

    const hasMark = (type: any) => {
        return jsonValue.activeMarks.some((mark: any) => mark.type === type);
    };

    const onClickMark = (event: any, type: any) => {
        event.preventDefault();
        editorRef.toggleMark(type);
    };

    const onChange = (v: any) => {
        content.value = v.value;
        setJsonValue(v.value);
    };

    const isBoldHotkey = isKeyHotkey('mod+b');
    const isItalicHotkey = isKeyHotkey('mod+i');
    const isUnderlinedHotkey = isKeyHotkey('mod+u');
    const isCodeHotkey = isKeyHotkey('mod+`');

    return (
        <div>
            {toolbar &&
                <Toolbar>
                    <ToolbarButton type="bold" active={hasMark('bold')} icon="bold" onClick={onClickMark} />
                    <ToolbarButton type="italic" active={hasMark('italic')} icon="italic" onClick={onClickMark} />
                    <ToolbarButton type="underlined" active={hasMark('underlined')} icon="underline" onClick={onClickMark} />
                </Toolbar>}
            <Editor
                readOnly={!toolbar}
                placeholder="Rich text editor"
                ref={ref}
                value={jsonValue}
                onKeyDown={onKeyDown}
                onChange={onChange}
                renderNode={renderNode}
                renderMark={renderMark}
            />
        </div>
    );
};
