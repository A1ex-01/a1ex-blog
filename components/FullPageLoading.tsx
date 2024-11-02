interface FullPageLoadingProps {}

export default function FullPageLoading(props: FullPageLoadingProps) {
  return (
    <div className="fixed bg-white fullPageLoading inset-0 h-screen w-screen z-50">
      <div className="center_div w-full h-full">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}
