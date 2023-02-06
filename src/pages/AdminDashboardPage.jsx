import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../authContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import VideoList from "../components/VideoList";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(0);
  const [videos, setVideos] = useState([]);
  const sdk = new MkdSDK();
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      sdk.setTable("video");
      try {
        const data = await sdk.callRestAPI({ page, limit }, "PAGINATE");
        setVideos(data.list);
      } catch (error) {}
    };
    fetchData();
  }, [page, limit]);

  return (
    <>
      <div className="w-full bg-black my-text h-full min-h-screen py-10 px-32">
        <header className="flex justify-between mb-32">
          <span className="text-5xl font-bold text-white">APP</span>
          <button className="btn py-3 px-5  rounded-3xl" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section>
          <header className="flex justify-between mb-16">
            <h1 className="text-4xl font-thin">Today’s leaderboard</h1>
            <div className="rounded-2xl my-secondary-clr px-5 py-3">
              30 May 2022 &bull;{" "}
              <span className="my-primary-clr rounded-lg p-1 tracking-wide text-xs font-thin">
                SUBMISSIONS OPEN
              </span>{" "}
              &bull; 11:30
            </div>
          </header>
          <table className="container">
            <thead className="container">
              <tr className=" flex justify-between">
              <th>
                <span className="mr-8">#</span>Title
              </th>
              <th>Author</th>
              <th>Most Liked</th>
              </tr>
            </thead>
            {
              videos.length > 0 && (
              <DndProvider backend={HTML5Backend}>
                <VideoList data={videos} />
              </DndProvider>
              )
            }
            
          </table>
          <div className="text-center my-16 text-black">
            <button
              className="btn rounded-l-full p-2 mr-4"
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <button
              className="btn rounded-r-full p-2 mr-4"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;
