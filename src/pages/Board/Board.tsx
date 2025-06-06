import { useParams } from "react-router-dom";

const Board = () => {
    const { id } = useParams<{ id: string }>();
    return <div>Board {id}</div>;
};

export default Board;
