interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLink?: boolean;
}

const bgGradientStyle = {
  backgroundImage: 'linear-gradient(#bdd7fa, #5d66b1 35.71%, #010767 38.24%, #40def7)',
};

const btnStyle =
  'w-fit px-6 py-3 font-bold text-xl md:text-3xl text-white rounded-3xl shadow-md shadow-cyan-700';

export default ({ children, className, isLink = false, ...attributes }: TextButtonProps) =>
  !isLink ? (
    <div className="text-center select-none">
      <button
        className={className ? `${btnStyle} ${className}` : btnStyle}
        style={bgGradientStyle}
        data-testid="TextButton"
        type="button"
        {...attributes}
      >
        {children}
      </button>
    </div>
  ) : (
    <div className="text-center select-none">
      <span
        className={className ? `${btnStyle} ${className}` : btnStyle}
        style={bgGradientStyle}
        data-testid="TextButton"
        {...attributes}
      >
        {children}
      </span>
    </div>
  );
