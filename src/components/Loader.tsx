export default function Loader() {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-10 justify-center">
      <h1>Loading...</h1>
      {<Loader.MiniLoader />}
    </div>
  );
}

Loader.MiniLoader = function () {
  // return <h1 className="custom_mini_loader">{"</>"}</h1>;
  return (
    <i className="self-center">
      <div className="loading-cont">
        <div className="loading"></div>
        <span className="first-ball"></span>
        <span className="second-ball"></span>
        <span className="last-ball"></span>
      </div>
    </i>
  );
};
