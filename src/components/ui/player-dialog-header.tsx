import { forwardRef } from "react";
import { X } from "lucide-react";

const DialogHeader = forwardRef<HTMLDialogElement>((_, ref) => {
  function handleClose() {
    if (ref && typeof ref !== "function" && ref.current) {
      ref.current.close();
    }
  }
  return (
    <div className="flex justify-between bg-transparent">
      <h1 className="text-xl font-semibold">Criar Jogador</h1>
      <button
        onClick={handleClose}
        className="hover:text-white hover:scale-125"
      >
        <X />
      </button>
    </div>
  );
});
export default DialogHeader;
