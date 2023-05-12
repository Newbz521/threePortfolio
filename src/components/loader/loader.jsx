import { useProgress } from "@react-three/drei";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  return (
    <div className="loader-container">
      {`${progress}%`}
    </div>
  );
};