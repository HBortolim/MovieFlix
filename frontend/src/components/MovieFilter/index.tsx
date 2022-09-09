import Select from "react-select";
import { Genre } from "types/genre";
import { useEffect, useState } from "react";
import "./styles.css";
import { Controller, useForm } from "react-hook-form";
import { requestBackend } from "util/requests";

export type ProductFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue("genre", value);
    const obj: ProductFilterData = {
      genre: getValues("genre"),
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: "/genres", withCredentials: true })
      .then((response) => {
        setSelectGenre(response.data.content);
      })
      .catch((e) => {
        console.log("erro: ", e);
      });
  }, []);

  return (
    <div className="base-card genre-filter-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectGenre}
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
              isClearable
              classNamePrefix="genre-filter-select"
              placeholder="Gênero"
              onChange={(value) => handleChangeGenre(value as Genre)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default MovieFilter;
