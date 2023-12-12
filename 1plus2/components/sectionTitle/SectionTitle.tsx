type Props = { name: string };

const SectionTitle = ({ name }: Props) => {
  return <span className="section-title">{name}</span>;
};

export default SectionTitle;
