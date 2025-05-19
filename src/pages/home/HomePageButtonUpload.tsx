import { SyntheticEvent, useEffect, useState } from "react";
import {
  FileWithId,
  useFileTransferStore,
} from "../../stores/fileTransferStore";
import { v4 as uuidv4 } from "uuid";

export default function HomePageButtonUpload() {
  const { files, setFiles, removeFile, startTransfer } = useFileTransferStore();
  const [isOpen, setIsOpen] = useState(false);

  const [homeFolderSelect, setHomeFolderSelect] = useState<HTMLSelectElement>();

  useEffect(() => {
    const element = document.getElementById(
      "home-folder-select"
    ) as HTMLSelectElement;
    setHomeFolderSelect(element);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (files.length > 0 && isOpen === false) {
      toggle();
    }
    if (files.length === 0 && isOpen === true) {
      toggle();
    }
  }, [files]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      return;
    }

    const files = Array.from(fileList);

    const filesWithId = files.map((file) => {
      Object.assign(file, { _id: uuidv4() });
      return file as FileWithId;
    });

    setFiles(filesWithId);
  };

  const length = files.length;

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (length > 0) {
      e.preventDefault();
      toggle();
      return;
    }
  };

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter as HTMLInputElement;

    const form = e.target as HTMLFormElement;

    if (submitter.value === "Upload") {
      if (!homeFolderSelect) {
        throw new Error("Something is wrong with the folder select");
      }

      const folder = homeFolderSelect.value;

      startTransfer(files, folder);
      setFiles([]);
    }
    form.reset();
    toggle();
  };

  const filesRow = files.map((file) => (
    <div className="flex justify-between place-items-center" key={file._id}>
      <button className="btn btn-primary btn-circle">
        <i className="fa-solid fa-file-lines"></i>
      </button>
      <p className="font-normal text-sm">{file.name}</p>
      <button
        className="btn btn-ghost btn-circle"
        onClick={removeFile.bind(removeFile, file._id)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  ));

  return (
    <>
      <label
        className="btn btn-xl btn-primary btn-circle"
        htmlFor="file-input"
        onClick={handleClick}
      >
        <i className="fa-solid fa-cloud-arrow-up" />
      </label>

      {length === 0 && <p>Drop your files here</p>}
      {length > 0 && <p>{length} file(s) selected</p>}

      <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
        <div className="modal-box gap-3">
          <section className="grid gap-3" id="files-row">
            {filesRow}
          </section>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex gap-3"
              onSubmit={handleSubmit}
            >
              <input className="btn btn-primary" type="submit" value="Close" />

              <input className="btn btn-success" type="submit" value="Upload" />

              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={handleInputChange}
                multiple
                accept=".pdf,.txt,.csv"
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
