import useBoardList from "./useBoardList.ts";

const BoardList = () => {
    const { data } = useBoardList();

    return (
        <>{data.boards?.map((board) => <p key={board.id}>{board.name}</p>)}</>
    );
};

export default BoardList;
