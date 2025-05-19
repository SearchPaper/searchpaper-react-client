import { SyntheticEvent, useState } from "react";
import { Folder, useFolderStore } from "./foldersStore";
import { useAlertStore } from "../../stores/alertStore";

export default function FoldersPageButtonCreate() {
  const { searchParams } = useFolderStore();

  const { page, size, term } = searchParams;

  const { list, create } = useFolderStore();
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

    if (submitter.value === "create") {
      const form = new FormData(target);
      const data = Object.fromEntries(form);

      const folder = {
        name: data.name,
        description: data.description,
      } as Folder;

      const response = await create(folder);

      pushAlert(response, "folder created");

      list({ page, size, term });
    }

    target.reset();
  };

  return (
    <>
      <button className="btn btn-primary rounded-none" onClick={toggle}>
        New Folder
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
              className="input input-primary w-full"
              required
            />
            <label htmlFor="" className="label">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="input input-primary w-full"
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                name="dialog-button"
                value="close"
                className="btn btn-primary"
                onClick={toggle}
              >
                Close
              </button>
              <input
                type="submit"
                name="dialog-button"
                value="create"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
