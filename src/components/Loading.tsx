import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={"/loading.svg"} width={50} height={50} alt="loading" />;
    </div>
  );
}
