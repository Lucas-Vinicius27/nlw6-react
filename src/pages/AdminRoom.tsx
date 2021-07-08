import { useParams } from "react-router-dom";
import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParams = {
    id: string;
};

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="pageRoom">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
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
                <div className="questionList">
                    {questions.map(question => (
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    ))}
                </div>
            </section>
        </div>
    );
}
