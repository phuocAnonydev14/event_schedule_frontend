import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

function Editor(props: ReactQuill.ReactQuillProps) {
  return (
    <div>
      <ReactQuill
        // value={editorValue}
        // onChange={(value) => setEditorValue(value)}
        theme="snow"
        {...props}
      />
    </div>
  );
}

export default Editor;
