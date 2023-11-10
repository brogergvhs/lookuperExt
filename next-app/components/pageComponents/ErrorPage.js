

export default function WordNotFound ({message}) {
  return (
    <div className="d-flex flex-column justify-congtent-center align-items-center">
      <div className="fs-3 mb-2 mt-3 text-center">
        <span className="acc-color">Oops,</span> it looks like {message}
      </div>
    </div>
  );
};