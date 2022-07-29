import Lottie from "lottie-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noDataAnimation from "../../../../assets/animations/no-data.json";
import Loader from "../../../../Components/UI/Loader/Loader";
import { fetchWorkflowsData } from "../../../../store/workflows";

const WorkflowsStep = () => {
  const dispatch = useDispatch();
  const workflowsData = useSelector((state) => state.workflows.data);
  const isLoading = useSelector((state) => state.workflows.isLoading);

  useEffect(() => {
    if (!workflowsData) {
      dispatch(fetchWorkflowsData());
    }
  }, [dispatch, workflowsData]);

  let content;

  if (isLoading) {
    content = <Loader height="56" />;
  }
  if (!workflowsData && !isLoading) {
    content = (
      <div className="h-56">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
  if (workflowsData && !isLoading) {
    content = <div>Mustafa</div>;
  }

  return <div className="">{content}</div>;
};

export default WorkflowsStep;
