interface ButtonIconProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  onClick: () => void;
}

export const ButtonIcon = ({ icon, onClick }: ButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {icon}
    </button>
  );
};
