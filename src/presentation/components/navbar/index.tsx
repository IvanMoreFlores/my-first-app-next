import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cartStore } from "@/presentation/state/cartStore";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const router = useRouter();
  const {products} = cartStore()

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("image");
    router.replace("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyStore
        </Link>
        <div className="flex flex-row items-center gap-4">
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/listado">Productos</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
          {/* <a onClick={handleLogout} className="underline">
            Cerrar session
          </a> */}
          <p>{products?.length}</p>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 flex flex-col space-y-4">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/productos">Productos</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
