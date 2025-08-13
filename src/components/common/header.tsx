import Image from "next/image";
import Link from "next/link";

import SheetHeaderMobile from "../mobile/sheet-header";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-3">
      <Link href={"/"}>
        <Image src={"/dolar.png"} width={85} height={85} alt="logo dolar" />
      </Link>
      <div className="flex items-center gap-3">
        <SheetHeaderMobile />
      </div>
    </header>
  );
};

export default Header;
