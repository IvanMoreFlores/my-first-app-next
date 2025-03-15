import { renderHook, act } from "@testing-library/react";
import useLogin from "./useLogin";
import { useRouter } from "next/navigation";
import { AuthCases } from "../../application/useCases/AuthCases";

//Mockeamos la dependencia
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(), //Siluma la navigeación
}));

jest.mock("../../application/useCases/AuthCases");

//First test

describe("useLogin Hook", () => {
  let mockPush: jest.Mock;
  //   let mockSetUser: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    // mockSetUser = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //1. Verifica que el estado inicial sea correcto
  test("Debe inicializarse con valores por defecto", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.userLogin).toEqual({
      username: "ivan",
      password: "admin",
    });
    expect(result.current.error).toBe(false);
    expect(result.current.textInfo).toBe("");
    expect(result.current.colorInfo).toBe("success");
    expect(result.current.buttonDisabled).toBe(false);
  });

  //2. Si no se ingresa usuario y password, debe dar error
  test("Debe dar error si no se ingresa usuario y password", async () => {
    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.handleLogin("", "");
    });
    expect(result.current.error).toBe(true);
    expect(result.current.textInfo).toBe("Ingrese su usuario y contraseña");
    expect(result.current.colorInfo).toBe("warning");
    expect(result.current.buttonDisabled).toBe(false);
  });

  //3. Si la credenciales son correctas
  test("Debe hacer login y redirigir si las credenciales son correcras", async () => {
    const mockResponse = {
      status: 200,
      response: {
        accessToken: "token",
        username: "ivan",
        email: "ivan@example.com",
        firstName: "Ivan",
        lastName: "Martinez",
        image: "https://example.com/image.jpg",
      },
    };

    (AuthCases.prototype.login as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleLogin("ivan", "123456");
    });

    expect(localStorage.setItem("token", "fake-token"));

    expect(mockPush).toHaveBeenCalledWith("/listado");
  });

  //4. Si las credenciales son incorrectas, debe mostrar un error
  test("Debe mostrar un error si las credencailes son incorrectas", async () => {
    const mockResponse = {
      status: 401,
      error: { message: "Credenciales incorrectas" },
    };

    (AuthCases.prototype.login as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleLogin("ivan", "123456");
    });

    expect(result.current.error).toBe(true);
    expect(result.current.textInfo).toBe("Credenciales incorrectas");
    expect(result.current.colorInfo).toBe("error");
    expect(result.current.buttonDisabled).toBe(false);
  });
});
