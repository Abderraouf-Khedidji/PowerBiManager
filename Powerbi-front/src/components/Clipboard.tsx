export const Clipboard = ({ command }: { command: string }) => {
  return (
    <div className="grid grid-cols-8 gap-2 w-full max-w-[23rem]">
      <label className="sr-only">Label</label>
      <input
        type="text"
        className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={command}
        disabled
      />
      <button
        data-copy-to-clipboard-target={command}
        className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center"
      >
        <span id="default-message">Copiar</span>
        <span id="success-message" className="hidden">
          <div className="inline-flex items-center">
            <svg
              className="w-3 h-3 text-white me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            Copiado!
          </div>
        </span>
      </button>
    </div>
  );
};
