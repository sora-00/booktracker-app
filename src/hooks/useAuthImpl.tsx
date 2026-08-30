import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onIdTokenChanged,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

const ACCESS_TOKEN_KEY = "@booktracker:accessToken";

type AuthContextValue = {
	accessToken: string | null;
	isLoading: boolean;
	saveToken: (token: string) => Promise<void>;
	clearToken: () => Promise<void>;
	signupWithEmailAndPassword: (email: string, password: string) => Promise<string>;
	loginWithEmailAndPassword: (email: string, password: string) => Promise<string>;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// AsyncStorage を起動時に先読みしない。Firebase の onIdTokenChanged より前に
	// 期限切れトークンで getBooks 等が走ると 401 になるため、トークンは常にここで同期する。
	useEffect(() => {
		const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
			try {
				if (!user) {
					await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
					setAccessToken(null);
					return;
				}

				// 期限切れなら Firebase が裏で更新したうえで返す
				const freshToken = await user.getIdToken();
				await AsyncStorage.setItem(ACCESS_TOKEN_KEY, freshToken);
				setAccessToken(freshToken);
			} catch (error) {
				console.error("Failed to sync Firebase ID token:", error);
			} finally {
				setIsLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	const saveToken = useCallback(async (token: string) => {
		try {
			await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
			setAccessToken(token);
		} catch (error) {
			console.error("Failed to save token:", error);
		}
	}, []);

	const clearToken = useCallback(async () => {
		try {
			try {
				await signOut(firebaseAuth);
			} catch (error) {
				console.error("Failed to sign out from Firebase:", error);
			}
			await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
			setAccessToken(null);
		} catch (error) {
			console.error("Failed to clear token:", error);
		}
	}, []);

	const signupWithEmailAndPassword = useCallback(
		async (email: string, password: string) => {
			const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
			const token = await credential.user.getIdToken();
			await saveToken(token);
			return token;
		},
		[saveToken]
	);

	const loginWithEmailAndPassword = useCallback(
		async (email: string, password: string) => {
			const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
			const token = await credential.user.getIdToken();
			await saveToken(token);
			return token;
		},
		[saveToken]
	);

	const value: AuthContextValue = {
		accessToken,
		isLoading,
		saveToken,
		clearToken,
		signupWithEmailAndPassword,
		loginWithEmailAndPassword,
		isAuthenticated: !!accessToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth は AuthProvider 内で使ってください");
	}
	return ctx;
}

/** AuthProvider 外でも使える。未マウント時は null。 */
export function useOptionalAuth(): AuthContextValue | null {
	return useContext(AuthContext);
}
