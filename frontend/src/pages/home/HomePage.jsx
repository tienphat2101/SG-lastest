import { useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import SearchBar from "../../components/search/UserSearch"; // Import SearchBar component

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  const activeTabStyle = {
    backgroundColor: "#87df2c",
  };

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen bg-gray-900">
        {/* SEARCH BAR - chỉ hiển thị trên thiết bị di động */}
        <div className="block md:hidden p-3 bg-gray-800">
          <SearchBar />
        </div>

        {/* Header */}
        <div
          className="sticky top-0 w-full border-b border-gray-800 z-10"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Tabs */}
          <div className="flex w-full">
            <div
              className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
              onClick={() => setFeedType("forYou")}
            >
              For you
              {feedType === "forYou" && (
                <div
                  className="absolute bottom-0 w-10 h-1 rounded-full"
                  style={activeTabStyle}
                ></div>
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
              onClick={() => setFeedType("following")}
            >
              Following
              {feedType === "following" && (
                <div
                  className="absolute bottom-0 w-10 h-1 rounded-full"
                  style={activeTabStyle}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>
    </>
  );
};

export default HomePage;
