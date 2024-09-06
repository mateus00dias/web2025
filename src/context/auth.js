import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; 
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [authChecked, setAuthChecked] = useState(false); // Nov

	useEffect(() => {
		const checkToken = () => {
			const userToken = Cookies.get("@Auth:token");
			if (userToken) {
				try {
					const tokenData = jwtDecode(userToken);
					const isTokenExpired = Date.now() >= tokenData.exp * 1000;

					if (isTokenExpired) {
						signout(); 
						toast.error("Sessão expirada. Por favor, faça login novamente.");
					} else {
						setUser({ id: tokenData.id, email: tokenData.email });
						api.defaults.headers.common[
							"Authorization"
						] = `Bearer ${userToken}`;
					}
				} catch (error) {
					console.error("Erro ao decodificar o token:", error);
					toast.error("Erro de autenticação. Por favor, faça login novamente.");
					signout();
				}
			}
			setAuthChecked(true);
		};

		checkToken();
	}, []);

	const SignIn = async ({ email, password }) => {
		if (!email || !password) {
			toast.error("Email e Senha são necessários!");
			return;
		}
		try {
			setLoading(true);
			const response = await api.post("/usuarios/login", { email, password });
			if (response.status === 200 && response.data.token) {
				const tokenData = jwtDecode(response.data.token);
				setUser({ id: tokenData.id, email: tokenData.email });
				Cookies.set("@Auth:token", response.data.token, {
					expires: 7,
					secure: true,
					sameSite: "Strict",
				});
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${response.data.token}`;
				toast.success("Login efetuado com sucesso!");
			} else {
				throw new Error(
					response.data.error ||
						"Erro ao fazer login. Por favor, tente novamente."
				);
			}
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			toast.error(
				error.response?.data?.message ||
					"Erro ao fazer login. Por favor, tente novamente."
			);
		} finally {
			setLoading(false);
		}
	};

	const signout = () => {
		setUser(null);
		Cookies.remove("@Auth:token");
		localStorage.clear();
		sessionStorage.clear();
		delete api.defaults.headers.common["Authorization"];
		window.location.href = "/login";
		toast.success("Logout efetuado com sucesso!");
	};

	return (
		<AuthContext.Provider
			value={{ user, signed: !!user, SignIn, signout, loading }}
		>
			{authChecked ? children : <LoadingComponent />}
		</AuthContext.Provider>
	);
};
