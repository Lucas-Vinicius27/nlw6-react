import { Link } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
// import { useAuth } from "../hooks/useAuth";
import "../styles/auth.scss";

export function NewRoom() {
    // const { user } = useAuth();

    return (
        <div id="pageAuth">
            <aside>
                <img
                    src={illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas"
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <section>
                <div className="mainContent">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?&nbsp;
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
