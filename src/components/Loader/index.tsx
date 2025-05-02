import React from "react";
import { LineWave } from "react-loader-spinner";
import { useLoading } from "../../contexts/hooks/Loanding";

export const GlobalLoader: React.FC = () => {
  const { isLoadingFetch } = useLoading();

  return (
    isLoadingFetch && (
      <div
        className="fixed inset-0 flex justify-center items-center z-[9999]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <LineWave
          visible={true}
          height="200"
          width="200"
          color="#000"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor="#000"
          middleLineColor="#000"
          lastLineColor="#000"
        />
      </div>
    )
  );
};
