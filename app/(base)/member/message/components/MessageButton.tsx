"use client";

type MessageButtonProps = {
    type: string;
    id: number;
    content: string;
    handleUpdate: (id: number, content: string) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
};

export default function MessageButton(props: MessageButtonProps) {
    const handleOnClick = async (id: number, content: string) => {
        props.type === "Edit"
            ? props.handleUpdate(id, content)
            : props.handleDelete(id);
    };

    return (
        <button
            onClick={() => handleOnClick(props.id, props.content)}
            style={{ marginTop: "2rem", color: "red" }}
        >
            {props.type === "Edit" ? "수정" : "삭제"}
        </button>
    );
}
