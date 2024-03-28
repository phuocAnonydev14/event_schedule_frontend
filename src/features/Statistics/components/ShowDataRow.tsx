interface IDataRow {
  title: string;
  data: string | number;
}

function ShowDataRow({ title, data }: IDataRow) {
  return (
    <div className="mb-2 flex">
      <div className="w-[10rem] font-semibold">{title} </div>
      <span>{data}</span>
    </div>
  );
}

export default ShowDataRow;
