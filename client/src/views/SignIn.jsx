import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

export default function SignIn() {

    return (
        <>
            <div className="bg-black h-screen text-white text-center flex justify-center items-center">
                <div className="w-[70%] block">

                    <h1 className="italic font-bold text-5xl">VUT</h1>
                    <p className="my-6 font-mono">Valorant Ultimate Team</p>

                    <form action="" className="block ">
                        <input className="uk-input w-80 my-2 text-white" type="email" placeholder="Email de usuário" />
                        <br />
                        <input className="uk-input w-80 my-2 text-white" type="password" placeholder="Senha" />
                        <br />
                        <button className="uk-button uk-button-default w-80 my-4">Entrar</button>
                        <br />
                        <button
                            className="uk-button uk-button-default w-80"
                        >
                            <NavLink to="/sign-up">
                                Criar Novo Time
                            </NavLink>
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}