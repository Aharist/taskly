import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@chakra-ui/react/preset';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';


export default function App(){
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}