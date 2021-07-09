import cx from "classnames";
import { ReactNode } from "react";
import "../styles/question.scss";

type QuestionProps = {
    author: {
        name: string;
        avatar: string
    };
    content: string;
    children?: ReactNode;
    isHighlighted?: boolean,
    isAnswered?: boolean
}

export function Question({
    author,
    content,
    children,
    isAnswered = false,
    isHighlighted = false
}: QuestionProps) {
    return (
        <div
            className={cx(
                "question",
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered }
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="userInfo">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}
