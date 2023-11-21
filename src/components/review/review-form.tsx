import { useState, useRef, memo } from 'react';
import { MIN_TEXTAREA_LENGTH, MAX_TEXTAREA_LENGTH } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { reviewsExtraAction } from '../../store/slice/reviews';

function ReviewFormComponent({id}: { id: string }): JSX.Element {
  const initialFormData = {
    rating: '',
    comment: '',
  };
  const offerId = id;
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });
  };

  const hadleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const rating = parseFloat(formData.rating);
    dispatch(reviewsExtraAction.postReview({ offerId, rating, comment: formData.comment })).then(() => {
      dispatch(reviewsExtraAction.fetchReviews(offerId));
      setFormData(initialFormData);
      formRef.current?.reset();
    });
  };

  const isValidate =
    formData.comment.length < MIN_TEXTAREA_LENGTH ||
    formData.comment.length > MAX_TEXTAREA_LENGTH ||
    formData.rating === '';

  return (
    <form
      onSubmit={hadleFormSubmit}
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="comment">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        minLength={50}
        maxLength={300}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isValidate}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
