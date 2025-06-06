import useBoard from "./useBoard.ts";

const Board = () => {
    const { data, state } = useBoard();

    if (state.isError) {
        return <p>Ошибка</p>;
    }

    return (
        <>
            <p>Board {data.id}</p>
            {data.tasks?.map((task) => <p key={task.id}>{task.title}</p>)}
        </>
    );
};

export default Board;
