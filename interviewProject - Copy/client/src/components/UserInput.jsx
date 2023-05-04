function UserInput({ placeholder, id }) {
  return (
    <>
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder={placeholder}
          id={id}
        ></textarea>
        <label htmlFor="floatingTextarea">{placeholder}</label>
      </div>
    </>
  );
}

export default UserInput;
