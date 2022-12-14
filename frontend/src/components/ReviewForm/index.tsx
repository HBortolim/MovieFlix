import { AxiosRequestConfig } from "axios";
import DefaultButton from "components/DefaultButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Review } from "types/review";
import { requestBackend } from "util/requests";

import "./styles.css";

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  text: string;
  movieId: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = movieId;
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/reviews`,
      data: formData,
      withCredentials: true,
    };
    requestBackend(config)
      .then((response) => {
        console.log(response.data);
        onInsertReview(response.data);
        toast.success("Avaliação inserida com sucesso!", {
          autoClose: 2000,
          pauseOnHover: false,
        });
        setValue("text", "");
      })
      .catch(() => {
        toast.error("Não é possível inserir uma avaliação vazia!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container base-card">
        <input
          {...register("text")}
          type="text"
          name="text"
          id="text"
          placeholder="Deixe sua avaliação aqui"
          className="base-input form-control"
          autoComplete="off"
        />
        {errors.text && (
          <span className="alert alert-danger">{errors.text?.message}</span>
        )}
        <DefaultButton text="Salvar Avaliação" />
      </div>
    </form>
  );
};

export default ReviewForm;
