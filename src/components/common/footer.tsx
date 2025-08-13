import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-accent flex w-full flex-col items-center gap-2 px-8 py-6 text-center">
      <Image
        src="/dolar.png"
        alt="Logo dolar"
        width={100}
        height={26}
        className="mb-3"
        priority
      />
      <p className="text-xs font-medium">© 2025 Copyright DollarKids</p>
      <p className="text-muted-foreground text-xs font-medium">
        Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
