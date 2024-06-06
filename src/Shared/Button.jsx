const Button = ({title, onClick}) => {
  return (
    <div>
      <button className="btn rounded-3xl p-2 border-none border-b-2 border-b-blue-700 hover:border-b-blue-400" onClick={onClick}> {title}</button>
    </div>
  );
};

export default Button;
