import { X } from "@phosphor-icons/react";
import * as RadixToast from "@radix-ui/react-toast";
import type { ToastItem } from "./type";

type ToastProps = {
  value: ToastItem;
  onClose: (id: string) => void;
};

export const Toast = ({ value, onClose }: ToastProps) => {
  return (
    <RadixToast.Root
      open={value.isOpen}
      onOpenChange={(isOpen) => !isOpen && onClose(value.id)}
      duration={value.duration}
      className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
    >
      <RadixToast.Title>{value.title}</RadixToast.Title>
      {value.description && (
        <RadixToast.Description>{value.description}</RadixToast.Description>
      )}
      <RadixToast.Close>
        <X />
      </RadixToast.Close>
    </RadixToast.Root>
  );
};
