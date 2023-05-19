import { FC } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Store/customHooks';
import { createArticle } from '../../Store/Reducers/CreateSlice';

import style from './CreateArticle.module.scss';

const CreateArticle: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface ISubmitForm {
    title: string;
    description: string;
    text: string;
    tagList: {
      name: string;
    }[];
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<ISubmitForm>({
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  interface Ifields {
    name: string;
  }

  const getTags = (arr: Ifields[]) => {
    const newArr: string[] = [];
    arr.map((t: Ifields) => newArr.push(t.name));
    return newArr;
  };

  const onSubmit: SubmitHandler<ISubmitForm> = (data: ISubmitForm) => {
    const requestData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: getTags(data.tagList),
      },
    };
    reset();

    dispatch(createArticle(requestData));
    navigate('/', { replace: true });
  };

  return (
    <div className={style.CreateArticle}>
      <div className={style.CreateArticle_card}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={style.form_title}>Create new article</h2>
          <label className={style.form_label}>
            Title
            <input
              {...register('title', {
                required: 'Required field',
              })}
              placeholder="Title"
              className={style.form_input}
            />
          </label>
          {errors.title && <p className={style.error}>{errors.title.message}</p>}
          <label className={style.form_label}>
            Short description
            <input
              {...register('description', {
                required: 'Required field',
              })}
              placeholder="Description"
              className={style.form_input}
            />
          </label>
          {errors.description && <p className={style.error}>{errors.description.message}</p>}
          <label className={style.form_label}>
            Text
            <textarea
              {...register('text', {
                required: 'Required field',
              })}
              placeholder="Text"
              className={style.form_textarea}
            />
          </label>
          {errors.text && <p className={style.error}>{errors.text.message}</p>}
          <label className={style.form_label__tags}>
            <div className={style.newTags_form}>
              {fields.length >= 1 && <p>Tags</p>}
              {fields.map((tag, i) => {
                return (
                  <div key={tag.id} className={style.newTags}>
                    <input
                      {...register(`tagList.${i}.name`, {
                        required: 'Required field',
                        minLength: {
                          value: 3,
                          message: 'Your username needs to be at least 3 characters',
                        },
                      })}
                      type="text"
                      placeholder="Tags"
                      className={style.form_input}
                    />
                    <button type="button" className={style.btn_delete} onClick={() => remove(i)}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            <button type="button" className={style.btn_add} onClick={() => append({ name: '' })}>
              Add Tag
            </button>
          </label>
          <button className={style.form_submit}>
            <input type="submit" value="Send" disabled={!isValid} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateArticle;
