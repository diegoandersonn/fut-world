type CellProps = {
  content: string | number;
};

export function TableCell({ content }: CellProps) {
  return <td className="px-4 py-2 border-t border-gray-700">{content}</td>;
}

type FlagProps = {
  countryName: string;
  countryFlag: string; 
};

export function FlagCell({ countryName, countryFlag }: FlagProps) {
  return (
    <td className="px-4 py-2 border-t border-gray-700">
      <div className="flex items-center gap-1">
        {countryName}
        <img src={countryFlag} className="w-4 h-3" alt="" />
      </div>
    </td>
  );
}

type ImageProps = {
  content: string;
};

export function ImageCell({ content }: ImageProps) {
  return (
    <td className="border-t border-gray-700">
      <img
        src={content}
        className="h-14 w-14 rounded-md border-1 border-gray-700"
      />
    </td>
  );
}
