import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux'; 
import { store } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='246581476132-qpdm7qnf02c4kphf6jbr354jfb54719e.apps.googleusercontent.com'>
        
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
)
