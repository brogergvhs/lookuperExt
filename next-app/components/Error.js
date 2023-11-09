
export default function WordNotFound (message) {
  return (
    <div className="d-flex flex-column justify-congtent-center align-items-center">
        <img className="errorNumbs" src="@/public/next-assets/404.svg" />
        <div className="fs-3 mb-2 mt-3 text-center"><span className="acc-color">Oops,</span> it looks like {message}</div>
    </div>
  );
};