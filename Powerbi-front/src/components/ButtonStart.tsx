import { ButtonIcon } from "./ButtonIcon";
import { Spinner } from "./spinner";

export const ButtonStart = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => {
  return (
    <ButtonIcon
      onClick={onClick}
      icon={
        !loading ? (
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
            />
          </svg>
        ) : (
          <Spinner size="4" />
        )
      }
    ></ButtonIcon>
  );
};
