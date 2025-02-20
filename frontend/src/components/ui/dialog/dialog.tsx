import { forwardRef, ReactNode } from "react";
import { X } from "lucide-react";

type DialogContainer = {
  children: ReactNode;
};

export const DialogContainer = forwardRef<HTMLDialogElement, DialogContainer>(
  ({ children }, ref) => {
    return (
      <dialog ref={ref}>
        <div className="bg-neutral-950 text-zinc-300 border border-zinc-400 rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-4">
          {children}
        </div>
      </dialog>
    );
  }
);

type HeaderProps = {
  text: string;
};

export const DialogHeader = forwardRef<HTMLDialogElement, HeaderProps>(
  ({ text }, ref) => {
    function handleClose() {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    }
    return (
      <div className="flex justify-between bg-transparent">
        <h1 className="text-xl font-semibold">{text}</h1>
        <button
          onClick={handleClose}
          className="hover:text-white hover:scale-125"
        >
          <X />
        </button>
      </div>
    );
  }
);

type ContentProps = {
  children: ReactNode;
};

export function DialogContent({ children }: ContentProps) {
  return <div>{children}</div>;
}
