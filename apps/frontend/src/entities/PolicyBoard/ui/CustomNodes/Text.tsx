import { PolicyContext, ThemeContext } from "contexts";
import { FC, useContext, useEffect, useRef } from "react";
import { NodeProps } from "reactflow";

import { DestroyButton } from "./DestroyButton";

type TextNodeData = {
  text: string;
};

const TextNode: FC<NodeProps<TextNodeData>> = ({ data, id }) => {
  const { updateNodeData } = useContext(PolicyContext);
  const { isDark } = useContext(ThemeContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const expand = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    expand();
  }, [textareaRef]);

  return (
    <div>
      <textarea
        ref={textareaRef}
        className={`textarea text-center bg-transparent ${
          isDark ? "text-white border-gray-700" : "text-black border-gray-100"
        } p-0 whitespace-wrap overflow-hidden `}
        value={data.text}
        placeholder="Insert text"
        onInput={expand}
        onChange={(e) => updateNodeData(id, { text: e.target.value })}
      />
      <DestroyButton id={id} />
    </div>
  );
};

export default TextNode;
