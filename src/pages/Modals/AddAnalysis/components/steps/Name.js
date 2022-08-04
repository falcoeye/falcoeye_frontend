const Name = ({ onAnalysisNameChange, analysisName }) => {
  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            name="name"
            placeholder="Anaylsis Name *"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            onChange={(e) => onAnalysisNameChange(e.target.value)}
            value={analysisName}
          />
        </div>
      </div>
    </div>
  );
};

export default Name;
