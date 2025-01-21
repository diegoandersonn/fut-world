type Props = {
  text: string;
  htmlFor: string;
};

export default function TeamFormLabel(props: Props) {
  return <label htmlFor={props.htmlFor} className="flex items-center font-semibold text-zinc-300">{props.text}</label>;
}
