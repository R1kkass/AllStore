import { useForm } from "react-hook-form"
import "./Login.scss";
import { LoginApi, RegistrationApi } from "../../shared/api/AuthApi";
import { redirect, useNavigate } from "react-router-dom";

interface ILogin{
    email: string,
    name: string,
    password: string,
    registerInput: string,
    lastName: string,
    secondName: string,
    submitPassword: string
}

const Registration = () => {
    document.title = "Регистрация"

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<ILogin>()
    const onSubmit = async (data: ILogin) => {
        if(data.password === data.submitPassword){

            RegistrationApi(data)
            .then(e=>{
                localStorage.setItem("token", e.data.access_token)
                navigate("/auth/login");
            })
            .catch(e=>setError('registerInput', { type: 'custom', message: '⚠ Неправильный логин или пароль' }))
        }else{
            setError('registerInput', { type: 'custom', message: '⚠ Пароли не совпадают' })
        }
    }

    return(
        <div className="Login ModalAdd__form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Регистрация</h2>
                </div>
                <div>
                    <label>
                        Имя
                            <input
                                placeholder="🏷 Имя"
                                {...register("name", {
                                required: "⚠ Введите имя",
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.name?.message}</p>
                </div>
                <div>
                    <label>
                        Фамилия
                            <input
                                placeholder="🏷 Фамилия"
                                {...register("secondName", {
                                required: "⚠ Введите фамилию",
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.secondName?.message}</p>
                </div>
                <div>
                    <label>
                        Отчество
                            <input
                                placeholder="🏷 Отчество"
                                {...register("lastName", {
                                required: "⚠ Введите отчество",
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.lastName?.message}</p>
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
                                minLength: 6
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.password?.message}</p>
                </div>
                <div>
                    <label>
                        Повторите пароль
                            <input
                                placeholder="⚙ Повторите пароль"
                                type="password"
                                {...register("submitPassword", {
                                required: "⚠ Введите повторно пароль",
                                minLength: 6
                            })}
                    />
                    </label>
                    <p className="Error">{errors?.password?.message}</p>
                </div>  
                <div>
                    <input type="submit" value="Зарегистрироваться"/>
                    <p className="Error Message">{errors?.registerInput?.message}</p>
                </div>
            </form>
        </div>
    )
}

export default Registration