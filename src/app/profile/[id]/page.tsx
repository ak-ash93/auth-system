export default function userProfile({ params }: any) {
  return (
    <div className="max-w-screen h-screen ">
      <div className="w-[80vw] h-[8vh] translate-x-40 p-4  border-2 border-amber-50 flex justify-between items-center">
        <div className="w-[30px] h-[30px] border-2 border-amber-50 rounded-full"></div>
        <h2>This is a navbar</h2>
      </div>

      <div className="flex items-center justify-center w-full h-full">
        <h1>
          Profile Page{" "}
          <span className="rounded-lg bg-amber-600 p-2 ml-2">{params.id}</span>
        </h1>
      </div>
    </div>
  );
}
