import { ButtonIconSecund } from "./ButtonIconSecond";

export const ButtonPause = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonIconSecund
      onClick={onClick}
      icon={
        <svg
          className="w-3 h-3 text-blue-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 10 16"
        >
          <path
            fill-rule="evenodd"
            d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z"
            clip-rule="evenodd"
          />
        </svg>
      }
    ></ButtonIconSecund>
  );
};
