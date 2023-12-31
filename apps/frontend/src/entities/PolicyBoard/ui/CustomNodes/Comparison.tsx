import { PolicyContext } from "contexts/policyContext";
import { FC, useContext } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { DestroyButton } from "./DestroyButton";

const comparisonSymbols = ["=", "<", "<=", ">=", ">"] as const;

type ComparisonNodeData = {
  parameter?: string;
  operation?: (typeof comparisonSymbols)[number];
  value?: string;
};

const ComparisonNode: FC<NodeProps<ComparisonNodeData>> = ({
  isConnectable,
  data,
  id,
}) => {
  const { updateNodeData } = useContext(PolicyContext);

  return (
    <div className="react-flow__node-default w-auto bg-blue-300 overflow-hidden">
      <Handle
        id="target"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <p>COMPARISON</p>
      <div className="flex mt-1 mb-2 gap-1">
        <input
          className="input input-bordered input-xs bg-white w-[76px]"
          placeholder="parameter"
          value={data.parameter}
          onChange={(e) => updateNodeData(id, { parameter: e.target.value })}
        />
        <select
          className="select text-white select-xs no-select-arrow text-center w-6"
          defaultValue={data.operation}
          onChange={(e) => updateNodeData(id, { operation: e.target.value })}
        >
          {comparisonSymbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <input
          className="input input-bordered input-xs bg-white w-[76px]"
          type={data.operation === "=" ? "text" : "number"}
          placeholder="value"
          value={data.value}
          onChange={(e) => {
            const val = e.target.value;
            updateNodeData(id, {
              value: isNaN(Number(val)) ? val : Number(val),
            });
          }}
        />
      </div>
      <div className="w-full h-full absolute overflow-hidden top-0 left-0 pointer-events-none handle-indicators">
        <div className="w-5 h-5 rounded-full border-black border-solid border-1 bg-green-300 absolute left-10 -translate-x-1/3 -bottom-2" />
        <div className="w-5 h-5 rounded-full border-black border-solid border-1 bg-red-300 absolute right-10 translate-x-1/3 -bottom-2" />
      </div>
      <Handle
        id="comparison-left"
        type="source"
        className="right-auto left-10 transform-none"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <Handle
        id="comparison-right"
        type="source"
        className="left-auto right-10 transform-none"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <DestroyButton id={id} />
    </div>
  );
};

export default ComparisonNode;
