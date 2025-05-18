import React from "react";
import { ThreeCircles } from "react-loader-spinner";
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
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color="#000"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  );
};
