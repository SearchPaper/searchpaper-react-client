import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "wouter";
import { Folder, useFolderStore } from "./foldersStore";
import { useAlertStore } from "../../stores/alertStore";

interface Parameters {
  folder: Folder;
}

export default function FoldersPageButtonUpdate({ folder }: Parameters) {
  const [searchParams] = useSearchParams();

  const term = searchParams.get("term") ?? "";
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "7";

  const { list, update } = useFolderStore();
  const { pushAlert } = useAlertStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    const submitter = e.nativeEvent.submitter as HTMLInputElement;
    const target = e.target as HTMLFormElement;

    if (submitter.value === "update") {
      const form = new FormData(target);
      const data = Object.fromEntries(form);

      const newFolder = {
        ...folder,
        name: data.name,
        description: data.description,
      } as Folder;

      const response = await update(newFolder);

      pushAlert(response, "folder updated");

      list({ page, size, term });
    }

    target.reset();
  };
  return (
    <>
      <button className="btn btn-xs btn-primary btn-circle" onClick={toggle}>
        <i className="fa-solid fa-pen-to-square" />
      </button>
      <dialog className="modal xl:modal-middle modal-bottom" open={isOpen}>
        <div className="hidden xl:flex modal-action"></div>

        <div className="modal-box">
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
              className="input input-primary w-full"
            />
            <label htmlFor="" className="label">
              Description
            </label>
            <input
              type="text"
              name="description"
              defaultValue={folder.description}
              className="input input-primary w-full"
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
                value="update"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
