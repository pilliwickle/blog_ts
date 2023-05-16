import { FC } from 'react';

import style from './EditArticle.module.scss';

const EditArticle: FC = () => {
  return (
    <div className={style.CreateArticle}>
      <div className={style.CreateArticle_card}>
        <form className={style.form}>
          <h2 className={style.form_title}>Edit article</h2>
          <label className={style.form_label}>
            Title
            <input placeholder="Title" className={style.form_input} />
          </label>
          <label className={style.form_label}>
            Short description
            <input placeholder="Description" className={style.form_input} />
          </label>
          <label className={style.form_label}>
            Text
            <textarea placeholder="Text" className={style.form_textarea} />
          </label>
          <label className={style.form_label__tags}>
            Tags
            <label className={style.tags_form}>
              <input placeholder="Tag" className={style.form_input__tags} />
              <button className={style.btn_delete}>Delete</button>
              <button className={style.btn_add}>Add Tag</button>
            </label>
          </label>
          <button className={style.form_submit}>
            <input type="submit" value="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export { EditArticle };
