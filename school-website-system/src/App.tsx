import "./components/stylesheet/home.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreateBlogs from "./components/CreateBlogs";
import About from "./components/About";
import Users from "./components/Users";
import BlogPosts from "./components/BlogPosts";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/blogpost" element={<BlogPosts/>} />
          <Route path="/createblog" element={<CreateBlogs/>} />
        </Routes>
          
       </Router>
      
    </>
  )
}
export default App
