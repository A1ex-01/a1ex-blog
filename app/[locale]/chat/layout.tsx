import SliderLayout from "./_components/SliderLayout";

interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <div className="relative mx-auto -mt-16 h-screen w-full max-w-5xl pt-16">
      <SliderLayout>{children}</SliderLayout>
    </div>
  );
}
