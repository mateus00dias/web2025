import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; 
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
						console.log("Sessão expirada. Por favor, faça login novamente.");
					} else {
						setUser({ id: tokenData.id, nomeUsuario: tokenData.nomeUsuario });
						api.defaults.headers.common[
							"Authorization"
						] = `Bearer ${userToken}`;
					}
				} catch (error) {
					console.error("Erro ao decodificar o token:", error);
					signout();
				}
			}
			setAuthChecked(true);
		};

		checkToken();
	}, []);

	const SignIn = async ( nomeUsuario, senha ) => {
		if (!nomeUsuario || !senha) {
			console.log("nomeUsuario e Senha são necessários!");
			return;
		}
		const NomeUsuario = nomeUsuario;
		const Senha = senha;
		try {
			setLoading(true);
			const response = await api.post("/usuarios/login", { NomeUsuario, Senha });
			if (response.status === 200 && response.data.token) {
				const tokenData = jwtDecode(response.data.token);
				setUser({ id: tokenData.id, nomeUsuario: tokenData.nomeUsuario });
				Cookies.set("@Auth:token", response.data.token, {
					expires: 7,
					secure: true,
					sameSite: "Strict",
				});
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${response.data.token}`;
			} else {
				throw new Error(
					response.data.error ||
						"Erro ao fazer login. Por favor, tente novamente."
				);
			}
		} catch (error) {
			console.error("Erro ao fazer login:", error);
		
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
	};

	return (
		<AuthContext.Provider
			value={{ user, signed: !!user, SignIn, signout, loading }}
		>
		 {children}
		</AuthContext.Provider>
	);
};
