import AppRouter from './routes';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
	return (
		<div>
			<GoogleOAuthProvider clientId="1035405520449-737opod5dblop954gvltb6btkaqbut54.apps.googleusercontent.com">
				<AppRouter/>
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
