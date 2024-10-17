import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page =  searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      //iska matlab tag wala page show krna h 
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      //page ki value ko number mein convert karo and then send krdo and tag ki value send krdo
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      //similarly jaisa tags mein kiya tha waise hi krdo
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    //Agar na toh tag ki call gayi hai and na toh category ki call gayi hai so mtlb normal call gayi hai
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element = {<Home/>}   />
      <Route path="/blog/:blogId" element = {<BlogPage/>}   />
      <Route path="/tags/:tag" element = {<TagPage/>}   />
      <Route path="/categories/:category" element = {<CategoryPage/>}   />
    </Routes>
  );
}
