import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#D4CCC3] h-screen flex flex-col items-center justify-center relative">
      <button
        onClick={() => navigate('/')}
        className="size-[48px] rounded-lg border border-[#7B6247] flex items-center justify-center active:scale-95 transition-all duration-200 absolute top-[27px] left-[21px]"
      >
        <img src="/arrow.png" alt="" className="size-6" />
      </button>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-[24px] font-extrabold font-jakarta text-[#484848]">
          About Us
        </h1>
        <div className="w-[318px] h-fit bg-white/70 rounded-lg flex flex-col items-center px-4 py-[18px] text-[#484848] gap-[10px]">
          <h1 className="font-bold font-jakarta text-[#484848]">Our App</h1>
          <p className="text-[12px] font-poppins text-justify">
            AR Furniture adalah aplikasi mobile inovatif yang terinspirasi dari
            aplikasi IKEA, dirancang untuk membantu konsumen dalam memilih dan
            memvisualisasikan produk furniture secara realistis di ruang mereka
            sebelum melakukan pembelian.
          </p>
        </div>
        <div className="w-[318px] h-fit bg-white/70 rounded-lg flex flex-col items-center px-4 py-[18px] text-[#484848] gap-[17px]">
          <div className="flex flex-col items-center w-full">
            {' '}
            <h1 className="font-bold font-jakarta text-[#484848]">Our Team</h1>
            <h1 className="font-poppins text-[#484848] text-[12px]">
              Anggota tim kami terdiri dari
            </h1>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  <img src="/aqil.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">Aqil</h1>
              </div>
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/dwi.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">Dwi</h1>
              </div>
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/utiya.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">
                  Utiya
                </h1>
              </div>
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/renald.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">
                  Renald
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/hani.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">Hani</h1>
              </div>
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/salsa.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">
                  Salsa
                </h1>
              </div>
              <div className="flex flex-col items-center gap-1">
                {' '}
                <div className="size-[50px] rounded-[4px] overflow-hidden">
                  {' '}
                  <img src="/rahma.png" alt="" className="size-full" />
                </div>
                <h1 className="text-[12px] font-medium text-[#484848]">
                  Rahma
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
