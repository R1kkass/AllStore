import { useForm } from "react-hook-form"
import MyInput from "../../shared/UI/Input/MyInput"
import NumberBlock from "../../shared/UI/NumberBlock/NumberBlock"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import MediaQuery from "react-responsive"
import "./FormOrder.scss"

export interface IForm {
    name: string
    number: string
    addres: string
    email: string
    city: string
    comment: string
    status: string
    mainError?: string
}

const FormOrder = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IForm>()

    const onSubmit = async (data: IForm) => {
        console.log(data);
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="FormOrder">
            <div className="FormOrder__first">
                <NumberBlock number="1" text="КОНТАКТНЫЕ ДАННЫЕ"/>
                </div>
                <div className="FormOrder__form">
                    <label>
                        Имя*
                        <MyInput button={true} placeholder = "Введите ваше имя"
                            {...register("name", {
                            required: "⚠ Введите имя",
                        })}
                        />
                        </label>
                        <p className="Error">{errors?.name?.message}</p>
                        <label>
                            Телефон*
                            <MyInput button={true} placeholder = "Введите ваш телефон"
                             {...register("number", {
                                required: "⚠ Введите номер",
                            })}
                            />
                        </label>
                        <p className="Error">{errors?.number?.message}</p>
                        <label>
                            E-Mail*
                            <MyInput button={true} placeholder = "Введите ваш E-Mail"
                            {...register("email", {
                                required: "⚠ Введите почту",
                            })}
                            />
                        </label>
                        <p className="Error">{errors?.email?.message}</p>
                    </div>
                    <div className="FormOrder__form">
                        <NumberBlock number="2" text="АДРЕС ДОСТАВКИ"/>
                        <label>
                            Город
                            <MyInput button={true} placeholder = "Введите ваш город"
                            {...register("city", {
                                required: "⚠ Введите город",
                            })}
                            />
                        </label>
                        <p className="Error">{errors?.city?.message}</p>
                        
                        <label>
                            Адрес
                            <MyInput button={true} placeholder = "Введите ваш адрес"
                            {...register("addres", {
                                required: "⚠ Введите адрес",
                            })}
                            />
                        </label>
                        <p className="Error">{errors?.addres?.message}</p>
                        <MediaQuery minWidth={801}>
                            <MyButton onSubmit={onSubmit}>Подверждение заказа</MyButton>
                            <p className="Error">{errors?.mainError?.message}</p>
                        </MediaQuery>
                    </div>
        </div>
    </form>
    )
}

export default FormOrder