import { RouterProvider } from "react-router-dom";
import { routers } from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID! }}>
      <AuthProvider>
        <RouterProvider router={routers} />
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
