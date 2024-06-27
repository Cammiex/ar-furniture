import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#D4CCC3] h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div>
          <div className="flex flex-col text-center">
            <h1 className="font-jakarta text-[32px] font-extrabold text-[#67492A]">
              AR Furniture
            </h1>
            <h1 className="font-poppins text-[12px] text-[#67492A]">
              Tata Rumah Instan dengan AR!
            </h1>
          </div>
          <div className="w-[276px] h-[224px] flex flex-items justify-center">
            <img src="/asset-3d.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/apps')}
            className="active:scale-95 transition-all duration-200 w-[276px] h-[40px] rounded-lg bg-[#67492A] font-sans text-[#F5F5F5]"
          >
            Start
          </button>
          <button
            onClick={() => navigate('/about')}
            className="active:scale-95 transition-all duration-200 w-[276px] h-[40px] rounded-lg border border-[#67492A] font-sans text-[#67492A]"
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
