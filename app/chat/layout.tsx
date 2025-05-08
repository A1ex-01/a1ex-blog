import SliderLayout from "./_components/SliderLayout";

interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <div className="relative">
      <SliderLayout>{children}</SliderLayout>
    </div>
  );
}
