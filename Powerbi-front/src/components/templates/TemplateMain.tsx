import { Navbar } from "../navbar/Navbar";

interface TemplateMainProps {
  children: React.ReactNode;
}

export const TemplateMain: React.FC<TemplateMainProps> = ({ children }) => {
  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-100">
      <Navbar />
      {children}
    </section>
  );
};
