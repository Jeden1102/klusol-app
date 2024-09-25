import { CgSpinnerAlt } from "react-icons/cg";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-fit mt-4 flex gap-2 items-center"
      size="lg"
      type="submit"
    >
      Zgłoś zdarzenie
      {pending && (
        <span className="animate-spin text-xl">
          <CgSpinnerAlt />
        </span>
      )}
    </Button>
  );
}

export default SubmitButton;
