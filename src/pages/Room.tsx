import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParams = {
    id: string;
};

export function Room() {
    const { user, signInWithGoogle } = useAuth();
    const [newQuestion, setNewQuestion] = useState("");
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (!user) {
            throw new Error("You must be logged in!");
        }

        if (newQuestion.trim() === "") {
            return;
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion("");
    }

    return (
        <div id="pageRoom">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <section>
                <div className="roomTitle">
                    <h1>Sala {title}</h1>
                    {
                        questions.length > 0 && <span>
                            {questions.length} pergunta(s)
                        </span>
                    }
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="formFooter">
                        { user ? (
                            <div className="userInfo">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta,&nbsp;
                                <button type="button" onClick={signInWithGoogle}>
                                    faça seu login
                                </button>
                                .
                            </span>
                        ) }
                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
                <div className="questionList">
                    {questions.map(question => (
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
