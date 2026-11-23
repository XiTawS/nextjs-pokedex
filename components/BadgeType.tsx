type Props = {
  type: string;
};

export default function BadgeType({ type }: Props) {
  return <span className="badge">{type}</span>;
}
