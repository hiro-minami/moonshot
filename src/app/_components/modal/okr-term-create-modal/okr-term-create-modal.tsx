import { Button, Dialog } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

export const OkrTermCreateModal = () => {
  // TODO: RHFとZodを使ってバリデーションを実装する
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#9f53ec] p-5">
          <span className="font-bold">OKR期間を作成する</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <div className="flex flex-row justify-between">
            <span>OKR期間の作成</span>
            <Dialog.Close>
              <Button className="text-[#d3d3d3] hover:text-black">
                <Cross2Icon />
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Title>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="name">
              期間名
            </label>
            <input
              className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
              id="name"
              placeholder="OKR期間1"
            />
          </div>
          <fieldset className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="start-date">
              期間
            </label>
            <div className="flex flex-row gap-4">
              <input
                type="date"
                className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                id="start-date"
                placeholder="@peduarte"
              />
              <span> ~ </span>
              <input
                type="date"
                className="h-[30px] w-[100%] border-b-2 outline-0 focus-within:border-[#9f53ec]"
                id="start-date"
                placeholder="@peduarte"
              />
            </div>
          </fieldset>
        </div>
        <div className="mt-4 flex flex-row justify-end gap-4">
          <Dialog.Close>
            <Button className="text-[#d3d3d3] hover:text-black">
              キャンセル
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button className="bg-[#9f53ec]">作成</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
