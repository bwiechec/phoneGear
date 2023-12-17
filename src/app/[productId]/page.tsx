import React from "react";

interface IPage {
  productId: string;
}

export default async function Page({ params }: { params: IPage }) {
  return <div>pid {params.productId}</div>;
}
