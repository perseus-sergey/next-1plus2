type Props = { name: string };

const SectionTitle = ({ name }: Props) => {
  return <h1 className="section-title">{name}</h1>;
};

export default SectionTitle;
