import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cartStore } from "@/presentation/state/cartStore";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidAdjustAlt } from "react-icons/bi";
import { useTheme } from "@/presentation/theme/themeProvider";

// import { useUser } from "@/presentation/context/UserConext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const router = useRouter();
  const { products } = cartStore();
  // const { user } = useUser();
  const [user, setUser] = useState<string>("Ivan");
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    const userName = localStorage.getItem("username");
    if (storedImage && userName) {
      setImageSrc(storedImage);
      setUser(userName);
    }
  }, []);

  const handleLogout = async () => {
    await localStorage.clear();
    router.replace("/login");
  };

  const onChangeTheme = () => {
    toggleTheme();
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
          <a>{user}</a>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              router.replace("/pagar");
            }}
          >
            {products?.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  padding: 5,
                  backgroundColor: "red",
                  width: 20,
                  height: 20,
                  display: "flex",
                  borderRadius: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  bottom: 40,
                }}
              >
                <p>{products?.length}</p>
              </div>
            )}
            <FaShoppingCart />
          </div>
          <div
            onClick={handleLogout}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <IoLogOut />
          </div>
          <div
            onClick={onChangeTheme}
            style={{
              cursor: "pointer",
            }}
          >
            <BiSolidAdjustAlt />
          </div>
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
