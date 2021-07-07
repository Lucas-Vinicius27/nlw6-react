import "../styles/question.scss";

type QuestionProps = {
    author: {
        name: string;
        avatar: string
    };
    content: string;
}

export function Question({ author, content }: QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="userInfo">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    );
}
