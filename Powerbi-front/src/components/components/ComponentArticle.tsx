import { useEffect, useState } from "react";
import { usePutComponents } from "../../hooks/usePutComponent";
import { ButtonPause } from "../ButtonPause";
import { ButtonStart } from "../ButtonStart";

export const ComponentArticle = ({
  name,
  changueCurrentComponent,
  currentComponent,
}: {
  name: string;
  changueCurrentComponent: (name: string) => void;
  currentComponent: string | null;
}) => {
  const { loading, activeComponent } = usePutComponents(name);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    changueCurrentComponent(name);
    activeComponent();
    setIsActive(true);
  };

  useEffect(() => {
    if (currentComponent === name) {
      setIsActive(true);
    }
    if (currentComponent !== name) {
      setIsActive(false);
    }
  }, [currentComponent]);

  return (
    <article className="flex items-center justify-between w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h2>
      {isActive ? (
        <ButtonPause onClick={handleClick} />
      ) : (
        <ButtonStart onClick={handleClick} loading={loading} />
      )}
    </article>
  );
};
