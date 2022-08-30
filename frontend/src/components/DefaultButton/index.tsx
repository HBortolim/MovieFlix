import "./styles.css";

type Props = {
  text: string;
};

const DefaultButton = ({ text }: Props) => {
  return (
    <div className="btn-container">
      <button type="submit" className="btn-primary btn">
        <p>{text}</p>
      </button>
    </div>
  );
};

export default DefaultButton;
