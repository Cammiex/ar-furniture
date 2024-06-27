const LoadingScreen = () => {
  return (
    <div className="bg-[#D4CCC3] h-screen flex flex-col items-center justify-center gap-6">
      <span className="loading loading-bars loading-lg w-[140px]"></span>
      <h1 className="font-semibold text-black font-poppins animate-pulse text-[20px]">
        Tunggu sebentar yhh ...
      </h1>
    </div>
  );
};

export default LoadingScreen;
