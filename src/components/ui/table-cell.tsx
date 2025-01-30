type Props = {
  content: string | number;
};

export default function TableCell(props: Props) {
  return (
    <td className="px-4 py-2 border-t border-gray-700">{props.content}</td>
  );
}
