import { SyntheticEvent, useState } from "react";
import { Document, useDocumentStore } from "./documentsStore";
import { useAlertStore } from "../../stores/alertStore";

interface Props {
  document: Document;
}

export default function DocumentsPageButtonDelete({ document }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { list, remove, searchParams, documents } = useDocumentStore();
  const { page, size, term } = searchParams;

  const { pushAlert } = useAlertStore();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter as HTMLInputElement;

    toggle();

    if (submitter.value === "delete") {
      setIsLoading(true);

      const response = await remove(document);

      setIsLoading(false);

      pushAlert(response, "document deleted");

      list({ page, size, term });

      if (documents.length <= Number(size)) {
        list({ page: "0", size, term });
      }
    }
  };

  return (
    <>
      <button className="btn btn-xs btn-error btn-circle" onClick={toggle}>
        {!isLoading && <i className="fa-solid fa-trash" />}
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </button>
      <dialog className="modal xl:modal-middle modal-bottom" open={isOpen}>
        <div className="hidden xl:flex modal-action"></div>

        <div className="modal-box">
          <p className="font-bold text-error text-center text-lg">
            This action is not reversible
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
              defaultValue={document.fileName}
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
