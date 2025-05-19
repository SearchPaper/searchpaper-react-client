import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "wouter";
import { Folder, useFolderStore } from "./foldersStore";
import { useAlertStore } from "../../stores/alertStore";

interface Parameters {
  folder: Folder;
}

export default function FoldersPageButtonDelete({ folder }: Parameters) {
  const [searchParams] = useSearchParams();

  const term = searchParams.get("term") ?? "";
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "7";

  const { list, remove } = useFolderStore();
  const { pushAlert } = useAlertStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    const submitter = e.nativeEvent.submitter as HTMLInputElement;

    if (submitter.value === "delete") {
      const response = await remove(folder);

      pushAlert(response, "folder deleted");

      list({ page, size, term });
    }
  };

  return (
    <>
      <button className="btn btn-xs btn-error btn-circle" onClick={toggle}>
        <i className="fa-solid fa-trash" />
      </button>
      <dialog className="modal xl:modal-middle modal-bottom">
        <div className="hidden xl:flex modal-action"></div>

        <div className="modal-box">
          <p className="font-bold text-error text-center text-lg">
            This will delete all documents within this folder
          </p>
          <form
            action="#"
            method="dialog"
            className="grid gap-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="" className="label">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={folder.name}
              className="input input-error w-full"
              readOnly
            />
            <label htmlFor="" className="label">
              Description
            </label>
            <input
              type="text"
              name="description"
              defaultValue={folder.description}
              className="input input-error w-full"
              readOnly
            />
            <div className="flex justify-end gap-3">
              <input
                type="submit"
                name="dialog-button"
                value="close"
                className="btn btn-primary"
              />
              <input
                type="submit"
                name="dialog-button"
                value="delete"
                className="btn btn-error"
              />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
