import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NewsEditor.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw, ContentState, EditorState } from 'draft-js';

function NewsEditor({ content, onValueChange }) {
  useEffect(() => {
    if(content === undefined) return
    const html = content;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);
  const [editorState, setEditorState] = useState('');
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        onBlur={() => {
          onValueChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }}
      />
    </div>
  );
}

export default NewsEditor;
