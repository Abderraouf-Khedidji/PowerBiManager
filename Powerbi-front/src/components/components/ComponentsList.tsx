import { useState } from "react";
import { useGetComponents } from "../../hooks/useGetComponents";
import { Spinner } from "../spinner";
import { ComponentArticle } from "./ComponentArticle";
import { ButtonPause } from "../ButtonPause";
import { usePutComponents } from "../../hooks/usePutComponent";

export const ComponentList: React.FC = () => {
  const { components, loading } = useGetComponents();
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);
  const { activeComponent } = usePutComponents(currentComponent || "");

  const handleClickPause = () => {
    activeComponent();
  };
  return loading ? (
    <div className="w-full h-full flex justify-center items-center min-h-96">
      <Spinner size="10" />
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {currentComponent && (
        <div className="flex w-full items-center justify-between max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h1 className="text-xl w-full font-semibold text-gray-900 dark:text-white">
              {currentComponent}
            </h1>
            <p className="text-sm  w-full text-gray-500 dark:text-gray-400">
              El componente {currentComponent} está activo.
            </p>
          </div>
          <div className="w-20">
            <ButtonPause onClick={handleClickPause} />
          </div>
        </div>
      )}

      <div className="flex flex-col w-full items-center justify-center max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl w-full font-semibold text-gray-900 dark:text-white">
          Lista de componentes
        </h1>
        <div className="flex flex-col w-full gap-2 py-4">
          {components.map((component, index) => (
            <ComponentArticle
              key={index}
              name={component.name}
              changueCurrentComponent={setCurrentComponent}
              currentComponent={currentComponent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
