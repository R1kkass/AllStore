import { useForm } from "react-hook-form"
import "./Login.scss";
import { LoginApi } from "../../shared/api/AuthApi";
import { Link, useNavigate } from "react-router-dom";

interface ILogin{
    email: string,
    name: string,
    password: string,
    registerInput: string
}

const Login = () => {
    document.title = "Авторизация"

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<ILogin>()

    const onSubmit = async (data: ILogin) => {
        LoginApi(data)
            .then(e=>{
                document.cookie = `refresh_token=${e.data.refresh_token}` 
                localStorage.setItem("token", e.data.access_token)
                navigate("/");
            })
            .catch(e=>setError('registerInput', { type: 'custom', message: '⚠ Неправильный логин или пароль' }))
    }

    return(
        <div className="Login ModalAdd__form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Вход</h2>
                </div>
                <div>
                    <label>
                        Почта
                            <input
                                placeholder="✉ Почта"
                                {...register("email", {
                                required: "⚠ Введите почту",
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.email?.message}</p>
                </div>  
                <div>
                    <label>
                        Пароль
                            <input
                                placeholder="⚙ Пароль"
                                type="password"
                                {...register("password", {
                                required: "⚠ Введите пароль",
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.password?.message}</p>
                </div>  
                <div>
                    <input type="submit" value="Войти"/>
                    <p className="Error">{errors?.registerInput?.message}</p>
                    <Link to="/auth/registration" className="Reg">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    )
}

export default Login