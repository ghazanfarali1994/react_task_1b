import React from "react";
import { useDrag, useDrop } from "react-dnd";

const SingleVideo = ({ data, id, index, moveCard }) => {
  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "video",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "video",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <tr
      className="container my-grid border rounded-3xl h-32 p-2 border-gray-300 border-opacity-30 place-items-center cursor-move"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <span>{data.id}</span>
      <img
        src={data.photo}
        className="object-cover w-32 h-24 rounded-2xl"
        alt={data.username}
      />
      <p>{data.title}</p>
      <div className="justify-self-start">
        <img
          src={data.photo}
          alt=""
          className="object-cover w-6 h-6 rounded-full inline"
        />
        <span className="ml-3 my-text-secondary">{data.username}</span>
      </div>
      <span>
        {data.like} <span className="my-text-secondary">&uarr;</span>
      </span>
    </tr>
  );
};

export default SingleVideo;
