import { useState } from "react";
import { useFileTransferStore } from "../stores/fileTransferStore";

export default function DrawerButtonUpload() {
  const { transferQueue, cleanTransferQueue } = useFileTransferStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCleanTransferQueue = () => {
    cleanTransferQueue();
    toggle();
  };

  const everyFileIsDoneLoading = [...transferQueue].every(
    (file) => file.success !== undefined
  );

  const everyFileIsNotFailed = [...transferQueue].every(
    (file) => file.success !== false
  );

  const transferQueueRow = transferQueue.map((file) => (
    <div className="flex gap-3 text-xs" key={file._id}>
      {file.success && (
        <button className="btn btn-success btn-xs btn-circle">
          <i className="fa-solid fa-cloud"></i>
        </button>
      )}

      {file.success === false && (
        <button className="btn btn-error btn-xs btn-circle">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </button>
      )}

      {file.success === undefined && (
        <button className="btn btn-primary btn-xs btn-circle">
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      )}
      <p className="font-normal grow">{file.name}</p>
    </div>
  ));

  return (
    <div>
      {!everyFileIsDoneLoading && (
        <button className="btn btn-ghost btn-circle btn-sm" onClick={toggle}>
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      )}
      {!everyFileIsNotFailed && everyFileIsDoneLoading && (
        <button className="btn btn-error btn-circle btn-sm" onClick={toggle}>
          <i className="fa-solid fa-cloud"></i>
        </button>
      )}
      {transferQueue.length === 0 && (
        <button className="btn btn-ghost btn-circle btn-sm" onClick={toggle}>
          <i className="fa-solid fa-cloud"></i>
        </button>
      )}

      {everyFileIsNotFailed &&
        transferQueue.length >= 1 &&
        everyFileIsDoneLoading && (
          <button
            className="btn btn-success btn-circle btn-sm"
            onClick={toggle}
          >
            <i className="fa-solid fa-cloud"></i>
          </button>
        )}
      <div className="drawer drawer-end ">
        <input
          id="upload-drawer"
          type="checkbox"
          className="drawer-toggle"
          readOnly
          checked={isOpen}
        />
        <div className="drawer-side ">
          <label
            htmlFor="upload-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={toggle}
          ></label>
          <section
            id="queued-files"
            className="bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-3 rounded-s-4xl"
          >
            <button
              className="btn btn-xs btn-ghost btn-circle self-end"
              onClick={handleCleanTransferQueue}
            >
              <i className="fa-solid fa-trash" />
            </button>
            {transferQueue.length === 0 && (
              <p className="font-bold text-center">0 files queued</p>
            )}
            {transferQueueRow}
          </section>
        </div>
      </div>
    </div>
  );
}
