import { FC } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/customHooks';
import { editArticle } from '../../Store/Reducers/SingleArticleSlice';

import style from './EditArticle.module.scss';

const EditArticle: FC = () => {
  const { body, title, description, slug, tagList } = useAppSelector(
    (state) => state.article.article
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  interface IEditForm {
    title: string;
    description: string;
    body: string;
    newTagList: {
      name: string;
    }[];
  }

  const defaultTagListFunc = (arr: string[]) => {
    const newArr: { name: string }[] = [];
    arr.map((el) => newArr.push({ name: el }));
    return newArr;
  };
  const newTagList = defaultTagListFunc(tagList);

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
    control,
  } = useForm<IEditForm>({
    mode: 'onChange',
    defaultValues: { title, body, description, newTagList },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'newTagList',
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

  const onSubmit: SubmitHandler<IEditForm> = (data: IEditForm) => {
    const requestData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: getTags(data.newTagList),
        slug: slug!,
      },
    };
    reset();

    dispatch(editArticle(requestData));
    navigate('/', { replace: true });
  };
  return (
    <div className={style.CreateArticle}>
      <div className={style.CreateArticle_card}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={style.form_title}>Edit article</h2>
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
              {...register('body', {
                required: 'Required field',
              })}
              placeholder="Text"
              className={style.form_textarea}
            />
          </label>
          {errors.body && <p className={style.error}>{errors.body.message}</p>}
          <label className={style.form_label__tags}>
            <div className={style.newTags_form}>
              {fields.length >= 1 && <p>Tags</p>}
              {fields.map((tag, i) => {
                return (
                  <div key={tag.id} className={style.newTags}>
                    <input
                      {...register(`newTagList.${i}.name`, {
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
            <button className={style.btn_add} onClick={() => append({ name: '' })}>
              Add Tag
            </button>
          </label>
          <button className={style.form_submit} disabled={!isValid}>
            <input type="submit" value="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export { EditArticle };
