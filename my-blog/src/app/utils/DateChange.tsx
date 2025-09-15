type DateChangeProps = {
  date: string;
};

export const DateChange = ({ date }: DateChangeProps) => {
  if (!date) return null;
  const dateObj = new Date(date);
  const formatedDate = `${dateObj.getFullYear()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}`;
  return <p className="text-xs">{formatedDate}</p>;
};
