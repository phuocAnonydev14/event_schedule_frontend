import ReactQuill from 'react-quill';

function EditorDisplay(props: ReactQuill.ReactQuillProps) {
  return <ReactQuill readOnly theme="bubble" {...props} />;
}

export default EditorDisplay;
