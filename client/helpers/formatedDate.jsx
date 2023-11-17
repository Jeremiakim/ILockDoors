import { Card } from "../src/components/Card";

export const DateComponent = () => {
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  return (
    <>
      <Card formatDate={formatDate} />
    </>
  );
};
