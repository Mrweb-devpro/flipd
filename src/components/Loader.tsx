export default function Loader() {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-10 justify-center">
      <h1 className="text-[var(--main)] text-lg font-bold">
        {"< "}Loading... {">"}
      </h1>
      <span className="text-[var(--main)]">{<Loader.MiniLoader />}</span>
    </div>
  );
}

Loader.MiniLoader = function ({
  color = "",
}: {
  color?: string | "var(--main)" | "white";
}) {
  return (
    <i className="self-center">
      <div className="loading-cont" style={{ color }}>
        <div className="loading"></div>
        <span className="first-ball"></span>
        <span className="second-ball"></span>
        <span className="last-ball"></span>
      </div>
    </i>
  );
};
