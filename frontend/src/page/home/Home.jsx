import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const token = useSelector(state => state.user.currentUser?.accessToken);
  useEffect(()=>{
    const getRandomLists = async () =>{
      try {
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${
                   genre ? "&genre=" + genre : ""
                   }`, {
          headers: {
            token:"Bearer " + token,
          },
        });
        // console.log(res)
        setLists(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists()
  },[type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
        {lists.map((list, index) => (
          <List key={index} list={list} />
        ))}
    </div>
)
};

export default Home;