import React, { useCallback, useState } from "react";
import update from "immutability-helper";
import SingleVideo from "./SingleVideo";
import { useEffect } from "react";

const VideoList = ({ data }) => {
  const [videos, setVideos] = useState(data);

  useEffect(() => {
    setVideos(data)
  }, [data])
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setVideos((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderVid = useCallback((vid, index) => {
    return (
      <SingleVideo
        key={vid.id}
        index={index}
        id={vid.id}
        data={vid}
        moveCard={moveCard}
      />
    );
  }, []);
  return (
    <tbody className="flex flex-col gap-4">
      {videos.map((vid, i) => renderVid(vid, i))}
    </tbody>
  );
};

export default VideoList;
