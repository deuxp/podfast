import DashCastItem from "../DashCastItem";
const dashList = [1, 2, 3, 4, 5];
const renderItem = dashList.map((cast, index) => (
  <DashCastItem key={index} cast={cast} />
));

function DashCastList() {
  return <>{renderItem}</>;
}

export default DashCastList;
